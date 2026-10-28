import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FixedTransaction } from './entities/fixed-transaction.entity';
import { RecurringPayment, PaymentStatus } from './entities/recurring-payment.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class FixedTransactionsService {
  constructor(
    @InjectRepository(FixedTransaction)
    private repo: Repository<FixedTransaction>,
    @InjectRepository(RecurringPayment)
    private paymentsRepo: Repository<RecurringPayment>,
    @InjectRepository(Transaction)
    private transactionsRepo: Repository<Transaction>,
  ) {}

  findAll() {
    return this.repo.find({ relations: { category: true, account: true } });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: { category: true, account: true } });
  }

  create(data: Partial<FixedTransaction>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<FixedTransaction>) {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new NotFoundException(`Fixed transaction #${id} not found`);
    }
    return updated;
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fixed transaction #${id} not found`);
    }
    return true;
  }

  /**
   * Get the current period key (YYYY-MM).
   */
  getCurrentPeriodKey(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  /**
   * Get upcoming payments for the next N days (Sección 10).
   */
  async getUpcoming(days: number = 30): Promise<any[]> {
    const fixedTxs = await this.repo.find({ where: { isActive: true }, relations: { category: true, account: true } });
    const now = new Date();
    const periodKey = this.getCurrentPeriodKey();
    const upcoming: any[] = [];

    for (const ft of fixedTxs) {
      if (ft.type !== 'EXPENSE' || !ft.paymentDay) continue;

      const dueDate = new Date(now.getFullYear(), now.getMonth(), ft.paymentDay);
      // If due date already passed this month, look at next month
      if (dueDate < now) {
        dueDate.setMonth(dueDate.getMonth() + 1);
      }

      const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays <= days) {
        // Check payment status
        let payment = await this.paymentsRepo.findOne({
          where: { fixedTransactionId: ft.id, periodKey },
        });

        const status = payment?.status || PaymentStatus.PENDING;

        upcoming.push({
          id: ft.id,
          name: ft.name,
          amount: ft.amount,
          isVariableAmount: ft.isVariableAmount,
          paymentDay: ft.paymentDay,
          dueDate: dueDate.toISOString().split('T')[0],
          daysUntilDue: diffDays,
          categoryName: ft.category?.name || 'General',
          categoryIcon: ft.category?.icon,
          accountName: ft.account?.name || 'Sin cuenta',
          status,
          paymentId: payment?.id,
        });
      }
    }

    // Sort by days until due
    upcoming.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
    return upcoming;
  }

  /**
   * Get all fixed expenses with their current period status (Sección 11).
   */
  async getWithStatus(): Promise<any[]> {
    const fixedTxs = await this.repo.find({ where: { isActive: true }, relations: { category: true, account: true } });
    const periodKey = this.getCurrentPeriodKey();
    const now = new Date();
    const result: any[] = [];

    for (const ft of fixedTxs) {
      let payment = await this.paymentsRepo.findOne({
        where: { fixedTransactionId: ft.id, periodKey },
      });

      let status = PaymentStatus.PENDING;
      if (payment) {
        status = payment.status;
      } else if (ft.paymentDay && ft.paymentDay < now.getDate()) {
        status = PaymentStatus.OVERDUE;
      }

      result.push({
        ...ft,
        currentStatus: status,
        paymentId: payment?.id,
        paidAmount: payment?.paidAmount,
        paidDate: payment?.paidDate,
      });
    }

    return result;
  }

  /**
   * Mark a fixed transaction as paid (Sección 12).
   * Creates or associates a real transaction.
   */
  async markAsPaid(fixedTransactionId: number, paidAmount?: number): Promise<RecurringPayment> {
    const ft = await this.findOne(fixedTransactionId);
    if (!ft) throw new NotFoundException(`Fixed transaction #${fixedTransactionId} not found`);

    const periodKey = this.getCurrentPeriodKey();
    const amount = paidAmount || ft.amount;

    // Check if already paid
    let payment = await this.paymentsRepo.findOne({
      where: { fixedTransactionId, periodKey },
    });

    if (payment?.status === PaymentStatus.PAID) {
      return payment; // Already paid, don't duplicate
    }

    // Create the real transaction
    const transaction = this.transactionsRepo.create({
      date: new Date(),
      description: `Pago: ${ft.name}`,
      amount: ft.type === 'EXPENSE' ? -Math.abs(amount) : Math.abs(amount),
      type: ft.type === 'EXPENSE' ? 'EXPENSE' : 'INCOME',
      accountId: ft.accountId,
      categoryId: ft.categoryId,
      status: 'CLASSIFIED',
    });
    const savedTx = await this.transactionsRepo.save(transaction);

    // Create or update the recurring payment record
    if (payment) {
      payment.status = PaymentStatus.PAID;
      payment.paidAmount = amount;
      payment.paidDate = new Date();
      payment.transactionId = savedTx.id;
      return this.paymentsRepo.save(payment);
    } else {
      return this.paymentsRepo.save({
        fixedTransactionId,
        periodKey,
        status: PaymentStatus.PAID,
        paidAmount: amount,
        paidDate: new Date(),
        transactionId: savedTx.id,
      });
    }
  }

  /**
   * Skip a payment for the current period.
   */
  async skipPayment(fixedTransactionId: number): Promise<RecurringPayment> {
    const periodKey = this.getCurrentPeriodKey();

    let payment = await this.paymentsRepo.findOne({
      where: { fixedTransactionId, periodKey },
    });

    if (payment) {
      payment.status = PaymentStatus.SKIPPED;
      return this.paymentsRepo.save(payment);
    }

    return this.paymentsRepo.save({
      fixedTransactionId,
      periodKey,
      status: PaymentStatus.SKIPPED,
    });
  }

  /**
   * Get monthly commitment total (Sección 16).
   */
  async getMonthlyCommitments(): Promise<{ items: any[]; total: number }> {
    const fixedTxs = await this.repo.find({ where: { isActive: true, type: 'EXPENSE' } });
    let total = 0;
    const items = fixedTxs.map(ft => {
      total += ft.amount;
      return { name: ft.name, amount: ft.amount, paymentDay: ft.paymentDay };
    });

    items.sort((a, b) => (a.paymentDay || 0) - (b.paymentDay || 0));
    return { items, total };
  }
}
