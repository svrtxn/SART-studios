import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Budget, BudgetPeriod } from './entities/budget.entity';
import { SpendingLimitAlert } from './entities/spending-limit-alert.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private budgetsRepository: Repository<Budget>,
    @InjectRepository(SpendingLimitAlert)
    private alertsRepository: Repository<SpendingLimitAlert>,
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Budget[]> {
    return this.budgetsRepository.find({ relations: { category: true, account: true } });
  }

  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgetsRepository.findOne({ where: { id }, relations: { category: true, account: true } });
    if (!budget) {
      throw new NotFoundException(`Budget #${id} not found`);
    }
    return budget;
  }

  async create(data: Partial<Budget>): Promise<Budget> {
    const newBudget = this.budgetsRepository.create(data);
    return this.budgetsRepository.save(newBudget);
  }

  async update(id: string, data: Partial<Budget>): Promise<Budget> {
    const budget = await this.findOne(id);
    Object.assign(budget, data);
    return this.budgetsRepository.save(budget);
  }

  async remove(id: string): Promise<void> {
    const budget = await this.findOne(id);
    await this.budgetsRepository.remove(budget);
  }

  /**
   * Get the current period key for a budget based on its period type.
   */
  getPeriodKey(period: BudgetPeriod, date: Date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    switch (period) {
      case BudgetPeriod.WEEKLY: {
        // ISO week number
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        return `${year}-W${String(weekNo).padStart(2, '0')}`;
      }
      case BudgetPeriod.MONTHLY:
        return `${year}-${month}`;
      case BudgetPeriod.ANNUAL:
        return `${year}`;
      default:
        return `${year}-${month}`;
    }
  }

  /**
   * Get the date range for a given period.
   */
  getPeriodDates(period: BudgetPeriod, date: Date = new Date()): { start: Date; end: Date } {
    const now = date;

    switch (period) {
      case BudgetPeriod.WEEKLY: {
        const day = now.getDay() || 7; // Monday = 1
        const start = new Date(now);
        start.setDate(now.getDate() - day + 1);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        return { start, end };
      }
      case BudgetPeriod.MONTHLY: {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        return { start, end };
      }
      case BudgetPeriod.ANNUAL: {
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        return { start, end };
      }
      default:
        return {
          start: new Date(now.getFullYear(), now.getMonth(), 1),
          end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
        };
    }
  }

  /**
   * Calculate spent amount for a budget in the current period.
   * Uses real transactions (Sección 4).
   */
  async getSpentForBudget(budget: Budget): Promise<number> {
    const { start, end } = this.getPeriodDates(budget.period as BudgetPeriod);

    const queryBuilder = this.transactionsRepository
      .createQueryBuilder('tx')
      .where('tx.date >= :start AND tx.date <= :end', { start: start.toISOString(), end: end.toISOString() })
      .andWhere('tx.amount < 0') // Only expenses
      .andWhere('tx.deletedAt IS NULL');

    // Filter by category
    if (budget.categoryId) {
      const category = await this.categoriesRepository.findOne({ where: { id: budget.categoryId } });
      if (category) {
        queryBuilder.andWhere('tx.categoryId = :catId', { catId: budget.categoryId });
      }
    }

    // Filter by account (null = global)
    if (budget.accountId) {
      queryBuilder.andWhere('tx.accountId = :accId', { accId: budget.accountId });
    }

    const result = await queryBuilder
      .select('SUM(ABS(tx.amount))', 'total')
      .getRawOne();

    return result?.total || 0;
  }

  /**
   * Get days remaining in the current period.
   */
  getDaysRemaining(period: BudgetPeriod): number {
    const { end } = this.getPeriodDates(period);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  /**
   * Calculate projected spending at end of period (Sección 7).
   */
  getProjection(spent: number, period: BudgetPeriod): number {
    const { start, end } = this.getPeriodDates(period);
    const now = new Date();
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const elapsedDays = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (elapsedDays <= 0) return spent;
    return Math.round((spent / elapsedDays) * totalDays);
  }

  /**
   * Get full summary for all active budgets (used by dashboard and planning).
   */
  async getSummary(): Promise<any[]> {
    const budgets = await this.budgetsRepository.find({
      where: { isActive: true },
      relations: { category: true, account: true },
    });

    const summaries = [];

    for (const budget of budgets) {
      const spent = await this.getSpentForBudget(budget);
      const percentage = budget.amount > 0 ? Math.round((spent / budget.amount) * 100) : 0;
      const daysRemaining = this.getDaysRemaining(budget.period as BudgetPeriod);
      const projection = this.getProjection(spent, budget.period as BudgetPeriod);
      const remaining = Math.max(0, budget.amount - spent);

      let status: 'normal' | 'warning' | 'limit' | 'exceeded' = 'normal';
      if (percentage >= budget.limitThreshold && percentage > 100) status = 'exceeded';
      else if (percentage >= budget.limitThreshold) status = 'limit';
      else if (percentage >= budget.warningThreshold) status = 'warning';

      // Check and create alerts if needed
      const periodKey = this.getPeriodKey(budget.period as BudgetPeriod);
      await this.checkAndCreateAlert(budget, periodKey, percentage);

      summaries.push({
        id: budget.id,
        name: budget.name || budget.category?.name || 'Sin nombre',
        categoryName: budget.category?.name || 'General',
        categoryIcon: budget.category?.icon,
        accountName: budget.account?.name || 'Todas las cuentas',
        amount: budget.amount,
        spent,
        remaining,
        percentage,
        status,
        daysRemaining,
        projection,
        period: budget.period,
        warningThreshold: budget.warningThreshold,
        limitThreshold: budget.limitThreshold,
      });
    }

    return summaries;
  }

  /**
   * Check if an alert should be created for a budget threshold (Sección 2, Regla 8).
   */
  private async checkAndCreateAlert(budget: Budget, periodKey: string, percentage: number): Promise<void> {
    const thresholds = [budget.warningThreshold, budget.limitThreshold];
    // Also check for exceeded (any 10% increment above limit)
    if (percentage > budget.limitThreshold) {
      const exceededLevel = Math.floor(percentage / 10) * 10;
      thresholds.push(exceededLevel);
    }

    for (const threshold of thresholds) {
      if (percentage >= threshold) {
        const existing = await this.alertsRepository.findOne({
          where: { budgetId: budget.id, periodKey, thresholdReached: threshold },
        });

        if (!existing) {
          await this.alertsRepository.save({
            budgetId: budget.id,
            periodKey,
            thresholdReached: threshold,
          });
        }
      }
    }
  }
}
