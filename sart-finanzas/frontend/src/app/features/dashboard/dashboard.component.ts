import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getCategoryIcon as getIcon } from '../../core/constants/categories';
import { TransactionService } from '../../core/services/transaction.service';
import { AccountService } from '../../core/services/account.service';
import { BudgetService, BudgetSummary } from '../../core/services/budget.service';
import { FixedTransactionService, UpcomingPayment, MonthlyCommitments } from '../../core/services/fixed-transaction.service';
import { CategoryService, Category } from '../../core/services/category.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalBalance = 0;
  incomes = 0;
  expenses = 0;
  recentTransactions: any[] = [];
  months: any[] = [];
  hasAccounts = false;
  transactions: any[] = [];
  alerts: any[] = [];
  categories: Category[] = [];

  // New modules data
  budgets: BudgetSummary[] = [];
  upcomingPayments: UpcomingPayment[] = [];
  commitments: MonthlyCommitments = { items: [], total: 0 };
  availableEstimate = 0; // Incomes - Commitments

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private budgetService: BudgetService,
    private fixedTxService: FixedTransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.transactionService.getSummary().subscribe({
      next: (summary) => {
        this.totalBalance = summary.totalBalance;
        this.incomes = summary.incomes;
        this.expenses = summary.expenses;
        this.months = summary.months;
        this.calculateAvailableEstimate();
      },
      error: (err) => console.error('Error fetching summary', err)
    });

    this.transactionService.getTransactions().subscribe({
      next: (txs) => {
        this.transactions = txs;
        this.recentTransactions = txs.slice(0, 5);
      },
      error: (err) => console.error('Error fetching transactions', err)
    });

    this.categoryService.getCategories().subscribe(res => this.categories = res);

    this.accountService.getAccounts().subscribe({
      next: (accs) => {
        this.hasAccounts = accs.length > 0;
      },
      error: (err) => console.error('Error fetching accounts', err)
    });

    this.loadModules();
  }

  loadModules() {
    // 1. Budgets
    this.budgetService.getSummary().subscribe({
      next: (res) => {
        this.budgets = res;
        this.generateAlertsFromBudgets(res);
      },
      error: (err) => console.error('Error fetching budgets summary', err)
    });

    // 2. Upcoming Payments
    this.fixedTxService.getUpcoming(15).subscribe({
      next: (res) => {
        this.upcomingPayments = res.slice(0, 5); // Take top 5 closest
        this.generateAlertsFromPayments(res);
      },
      error: (err) => console.error('Error fetching upcoming payments', err)
    });

    // 3. Monthly Commitments
    this.fixedTxService.getMonthlyCommitments().subscribe({
      next: (res) => {
        this.commitments = res;
        this.calculateAvailableEstimate();
      },
      error: (err) => console.error('Error fetching commitments', err)
    });
  }

  calculateAvailableEstimate() {
    this.availableEstimate = this.incomes - this.commitments.total;
  }

  generateAlertsFromBudgets(budgets: BudgetSummary[]) {
    budgets.forEach(b => {
      if (b.status === 'exceeded') {
        this.addAlert('danger', `¡Superaste tu límite en ${b.name}! ($${b.spent} de $${b.amount})`);
      } else if (b.status === 'limit') {
        this.addAlert('warning', `Alcanzaste el 100% de tu límite en ${b.name}.`);
      } else if (b.status === 'warning') {
        this.addAlert('warning', `Llegaste al ${Math.round(b.percentage)}% de tu límite en ${b.name}.`);
      }
    });
  }

  generateAlertsFromPayments(payments: UpcomingPayment[]) {
    payments.forEach(p => {
      if (p.status === 'PENDING') {
        if (p.daysUntilDue === 0) {
          this.addAlert('danger', `¡Hoy vence el pago de ${p.name}! ($${p.amount})`);
        } else if (p.daysUntilDue < 0) {
          this.addAlert('danger', `El pago de ${p.name} está atrasado por ${Math.abs(p.daysUntilDue)} días.`);
        } else if (p.daysUntilDue <= 3) {
          this.addAlert('warning', `Próximo pago en ${p.daysUntilDue} días: ${p.name} ($${p.amount})`);
        }
      }
    });
  }

  addAlert(type: 'danger' | 'warning', message: string) {
    if (!this.alerts.some(a => a.message === message)) {
      this.alerts.push({ type, message });
    }
  }

  getCategoryIcon(category: string): string {
    return getIcon(category);
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'PENDING': return 'var(--color-warning)';
      case 'PAID': return 'var(--color-success)';
      case 'OVERDUE': return 'var(--color-danger)';
      case 'SKIPPED': return 'var(--color-text-secondary)';
      default: return 'var(--color-text-secondary)';
    }
  }
}
