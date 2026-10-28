import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  findAll() {
    return this.transactionsRepository.find({ order: { date: 'DESC' } });
  }

  create(transactionData: Partial<Transaction>) {
    const transaction = this.transactionsRepository.create(transactionData);
    return this.transactionsRepository.save(transaction);
  }

  async createBulk(transactionsData: Partial<Transaction>[]) {
    transactionsData.forEach(t => {
      if (!t.hash) {
        t.hash = `${t.date}-${t.description}-${t.amount}-${Math.random()}`;
      }
    });

    try {
      const saved = await this.transactionsRepository.save(transactionsData);
      return { success: true, count: saved.length };
    } catch (e) {
      // Fallback for duplicates
      let count = 0;
      for (const t of transactionsData) {
        try {
          await this.transactionsRepository.save(t);
          count++;
        } catch (err) {}
      }
      return { success: true, count, notes: 'Some duplicates were ignored' };
    }
  }

  async getSummary() {
    const transactions = await this.findAll();
    
    let totalBalance = 0;
    let incomes = 0;
    let expenses = 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthlyExpenses = new Map<string, number>();
    
    // Initialize last 6 months with 0
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthlyExpenses.set(`${d.getFullYear()}-${d.getMonth()}`, 0);
    }

    transactions.forEach(t => {
      totalBalance += t.amount;
      
      const tDate = new Date(t.date);
      // Calculate current month incomes/expenses
      if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
        if (t.amount > 0) incomes += t.amount;
        else expenses += Math.abs(t.amount);
      }
      
      // Calculate monthly expenses for chart
      const key = `${tDate.getFullYear()}-${tDate.getMonth()}`;
      if (monthlyExpenses.has(key)) {
         if (t.amount < 0) {
           monthlyExpenses.set(key, monthlyExpenses.get(key)! + Math.abs(t.amount));
         }
      }
    });

    const monthsData = Array.from(monthlyExpenses.entries()).map(([key, val]) => {
       const [year, month] = key.split('-');
       return {
         name: monthNames[parseInt(month)],
         val
       };
    });

    const maxExpense = Math.max(...monthsData.map(m => m.val), 1);
    
    const months = monthsData.map(m => ({
       name: m.name,
       height: Math.round((m.val / maxExpense) * 100)
    }));

    return {
      totalBalance,
      incomes,
      expenses,
      months
    };
  }

  async createTransfer(fromAccountId: string, toAccountId: string, amount: number, date: Date, description: string) {
    const transferId = require('crypto').randomUUID();
    
    const transferOut = this.transactionsRepository.create({
      accountId: fromAccountId,
      amount: -Math.abs(amount),
      type: 'TRANSFER_OUT',
      date,
      description,
      transferId,
    });
    
    const transferIn = this.transactionsRepository.create({
      accountId: toAccountId,
      amount: Math.abs(amount),
      type: 'TRANSFER_IN',
      date,
      description,
      transferId,
    });

    await this.transactionsRepository.save([transferOut, transferIn]);
    return { transferId };
  }

  async remove(id: number) {
    await this.transactionsRepository.delete(id);
    return { success: true };
  }
}
