import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService, Budget, BudgetSummary } from '../../core/services/budget.service';
import { FixedTransactionService, FixedTransaction, MonthlyCommitments } from '../../core/services/fixed-transaction.service';
import { CategoryService, Category } from '../../core/services/category.service';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent implements OnInit {
  activeTab: 'budgets' | 'fixed' | 'calendar' | 'commitments' = 'budgets';
  
  categories: Category[] = [];
  accounts: any[] = [];
  
  // Data
  budgets: BudgetSummary[] = [];
  fixedTransactions: FixedTransaction[] = [];
  commitments: MonthlyCommitments = { items: [], total: 0 };
  
  // Calendar data
  calendarDays: any[] = [];
  selectedDate: Date = new Date();
  selectedDayEvents: any[] = [];

  // Forms
  showBudgetForm = false;
  currentBudget: Partial<Budget> = { 
    amount: 0, 
    isActive: true, 
    period: 'MONTHLY', 
    warningThreshold: 80, 
    limitThreshold: 100 
  };

  showFixedForm = false;
  currentFixed: Partial<FixedTransaction> = { 
    name: '', 
    amount: 0, 
    type: 'EXPENSE', 
    periodicity: 'MONTHLY', 
    paymentDay: 1,
    isVariableAmount: false,
    isActive: true
  };

  constructor(
    private budgetService: BudgetService,
    private fixedTxService: FixedTransactionService,
    private categoryService: CategoryService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
    this.accountService.getAccounts().subscribe(res => this.accounts = res);
    
    this.loadBudgets();
    this.loadFixed();
    this.loadCommitments();
    this.generateCalendar();
  }

  loadBudgets() {
    this.budgetService.getSummary().subscribe(res => this.budgets = res);
  }

  loadFixed() {
    this.fixedTxService.getWithStatus().subscribe(res => {
      this.fixedTransactions = res;
      this.generateCalendar(); // Re-generate calendar when fixed txs load
    });
  }

  loadCommitments() {
    this.fixedTxService.getMonthlyCommitments().subscribe(res => this.commitments = res);
  }

  // --- Budgets ---

  saveBudget() {
    if (!this.currentBudget.categoryId || !this.currentBudget.amount) return;
    this.currentBudget.categoryId = +this.currentBudget.categoryId;
    
    if (this.currentBudget.accountId === 'null' || !this.currentBudget.accountId) {
      this.currentBudget.accountId = undefined;
    }

    if (this.currentBudget.id) {
      this.budgetService.updateBudget(this.currentBudget.id, this.currentBudget).subscribe(() => {
        this.loadBudgets();
        this.showBudgetForm = false;
      });
    } else {
      this.budgetService.createBudget(this.currentBudget).subscribe(() => {
        this.loadBudgets();
        this.showBudgetForm = false;
      });
    }
  }

  deleteBudget(id: string) {
    if (confirm('¿Eliminar este presupuesto?')) {
      this.budgetService.deleteBudget(id).subscribe(() => this.loadBudgets());
    }
  }

  resetBudgetForm() {
    this.currentBudget = { 
      amount: 0, 
      isActive: true, 
      period: 'MONTHLY', 
      warningThreshold: 80, 
      limitThreshold: 100 
    };
    this.showBudgetForm = !this.showBudgetForm;
  }

  // --- Fixed Transactions ---

  saveFixed() {
    if (!this.currentFixed.name || !this.currentFixed.amount) return;
    
    if (this.currentFixed.accountId === 'null' || !this.currentFixed.accountId) {
      this.currentFixed.accountId = undefined;
    }
    
    if ((this.currentFixed.categoryId as any) === 'null' || !this.currentFixed.categoryId) {
      this.currentFixed.categoryId = undefined;
    } else {
      this.currentFixed.categoryId = +this.currentFixed.categoryId;
    }

    if (this.currentFixed.id) {
      this.fixedTxService.updateFixedTransaction(this.currentFixed.id, this.currentFixed).subscribe(() => {
        this.loadFixed();
        this.loadCommitments();
        this.showFixedForm = false;
      });
    } else {
      this.fixedTxService.createFixedTransaction(this.currentFixed).subscribe(() => {
        this.loadFixed();
        this.loadCommitments();
        this.showFixedForm = false;
      });
    }
  }

  deleteFixed(id: number) {
    if (confirm('¿Eliminar este gasto fijo?')) {
      this.fixedTxService.deleteFixedTransaction(id).subscribe(() => {
        this.loadFixed();
        this.loadCommitments();
      });
    }
  }

  resetFixedForm() {
    this.currentFixed = { 
      name: '', 
      amount: 0, 
      type: 'EXPENSE', 
      periodicity: 'MONTHLY', 
      paymentDay: 1,
      isVariableAmount: false,
      isActive: true
    };
    this.showFixedForm = !this.showFixedForm;
  }
  
  markAsPaid(ft: any) {
    let amountToPay = ft.amount;
    if (ft.isVariableAmount) {
      const input = prompt(`Monto a pagar para ${ft.name}:`, ft.amount.toString());
      if (input === null) return;
      amountToPay = parseFloat(input);
      if (isNaN(amountToPay)) return;
    }
    
    this.fixedTxService.markAsPaid(ft.id, amountToPay).subscribe(() => {
      this.loadFixed();
    });
  }

  // --- Calendar ---
  
  generateCalendar() {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // 0 is Monday
    
    this.calendarDays = [];
    
    // Previous month filler
    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push({ date: null, events: [] });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const events = this.getEventsForDate(date);
      this.calendarDays.push({ date, events, isToday: this.isToday(date) });
    }
    
    this.selectDate(this.calendarDays.find(d => d.isToday)?.date || new Date(year, month, 1));
  }
  
  getEventsForDate(date: Date): any[] {
    const events = [];
    
    // Add fixed transactions that land on this day
    for (const ft of this.fixedTransactions) {
      if (ft.periodicity === 'MONTHLY' && ft.paymentDay === date.getDate()) {
        events.push({
          type: 'fixed',
          title: ft.name,
          amount: ft.amount,
          status: ft.currentStatus,
          icon: ft.category?.icon || '💳'
        });
      }
    }
    
    return events;
  }
  
  selectDate(date: Date) {
    if (!date) return;
    this.selectedDate = date;
    const dayInfo = this.calendarDays.find(d => d.date && d.date.getDate() === date.getDate());
    this.selectedDayEvents = dayInfo ? dayInfo.events : [];
  }
  
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }
  
  prevMonth() {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1, 1);
    this.generateCalendar();
  }
  
  nextMonth() {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 1);
    this.generateCalendar();
  }
  
  getMonthName(): string {
    return this.selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }

  // --- Utils ---

  getStatusColor(status: string): string {
    switch(status) {
      case 'PENDING': return 'var(--color-warning)';
      case 'PAID': return 'var(--color-success)';
      case 'OVERDUE': return 'var(--color-danger)';
      case 'SKIPPED': return 'var(--color-text-secondary)';
      default: return 'var(--color-text-secondary)';
    }
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'PENDING': return 'Pendiente';
      case 'PAID': return 'Pagado';
      case 'OVERDUE': return 'Vencido';
      case 'SKIPPED': return 'Omitido';
      default: return 'Desconocido';
    }
  }
}
