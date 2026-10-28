import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoalService } from '../../core/services/goal.service';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="header mb-8 flex justify-between items-center">
      <h1>Metas de Ahorro</h1>
      <button class="btn btn-primary" (click)="toggleForm()">
        {{ showForm ? 'Cancelar' : '+ Nueva Meta' }}
      </button>
    </div>

    <!-- Empty State -->
    <div *ngIf="goals.length === 0 && !showForm" class="card empty-state text-center" style="padding: 64px 24px; margin-bottom: 32px;">
      <div class="icon text-primary mx-auto mb-6" style="display: flex; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      </div>
      <h2 class="mb-4">No tienes metas registradas</h2>
      <p class="text-secondary mb-6" style="max-width: 400px; margin: 0 auto 24px;">
        Ahorrar con propósito es clave. Crea tu primera meta y asóciala a una de tus cuentas para empezar.
      </p>
      <button class="btn btn-primary" (click)="toggleForm()">Crear mi Primera Meta</button>
    </div>

    <!-- Formulario Crear/Editar -->
    <div *ngIf="showForm" class="card mb-8" style="padding: 24px; margin-bottom: 32px;">
      <h3 style="margin-top: 0; margin-bottom: 16px;">{{ editingGoal ? 'Editar Meta' : 'Crear Meta' }}</h3>
      <div style="display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap;">
        <div class="form-group" style="flex: 1; min-width: 200px;">
          <label>Nombre de la Meta</label>
          <input type="text" [(ngModel)]="currentGoal.name" class="text-input" placeholder="Ej. Auto Nuevo">
        </div>
        <div class="form-group" style="flex: 1; min-width: 200px;">
          <label>Monto Objetivo</label>
          <input type="text" [ngModel]="formatCurrency(currentGoal.targetAmount)" (ngModelChange)="currentGoal.targetAmount = parseCurrency($event)" class="text-input" placeholder="$ 0">
        </div>
        <div class="form-group" style="flex: 1; min-width: 200px;">
          <label>Monto Actual (Ahorrado)</label>
          <input type="text" [ngModel]="formatCurrency(currentGoal.currentAmount)" (ngModelChange)="currentGoal.currentAmount = parseCurrency($event)" class="text-input" placeholder="$ 0">
        </div>
        <div class="form-group" style="flex: 1; min-width: 200px;">
          <label>Cuenta Asociada</label>
          <select [(ngModel)]="currentGoal.accountId" class="text-input">
            <option value="">Sin cuenta asociada</option>
            <option *ngFor="let acc of accounts" [value]="acc.id">{{ acc.name }}</option>
          </select>
        </div>
        <button class="btn btn-primary" style="height: 48px;" [disabled]="!currentGoal.name || !currentGoal.targetAmount" (click)="saveGoal()">
          {{ editingGoal ? 'Actualizar' : 'Guardar' }}
        </button>

        <div class="helper-section" style="width: 100%; margin-top: 16px;">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--color-text-secondary); font-size: var(--text-sm);">
            <input type="checkbox" [(ngModel)]="showHelper">
            Activar ayuda para calcular mi ahorro mensual
          </label>
          
          <div *ngIf="showHelper" style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.05); border: 1px solid var(--color-border); border-radius: 8px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 200px;">
              <label style="display: block; margin-bottom: 8px; color: var(--color-text-secondary); font-size: var(--text-sm);">¿En cuántos meses deseas lograr esta meta?</label>
              <input type="number" [(ngModel)]="monthsTarget" class="text-input" min="1" placeholder="Ej. 12">
            </div>
            <div style="flex: 1; min-width: 200px; padding: 16px; background: rgba(25, 118, 255, 0.1); border: 1px solid var(--color-primary); border-radius: 8px; text-align: center;">
              <div style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 4px;">Debes ahorrar mensualmente:</div>
              <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">
                $ {{ getMonthlySaving() | number:'1.0-0' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Metas -->
    <div class="grid" *ngIf="goals.length > 0">
      <div class="card" *ngFor="let g of goals">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3>{{ g.name }}</h3>
            <span class="text-secondary text-sm" *ngIf="g.accountId">
              Guardado en: {{ getAccountName(g.accountId) }}
            </span>
            <span class="text-secondary text-sm" *ngIf="!g.accountId">
              Sin cuenta asociada
            </span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span class="percentage font-bold">{{ getPercentage(g.currentAmount, g.targetAmount) | number:'1.0-0' }}%</span>
            <div class="dropdown-actions" style="position: relative;">
              <button class="icon-btn" (click)="g._showMenu = !g._showMenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
              <div *ngIf="g._showMenu" class="dropdown-menu" style="position: absolute; right: 0; top: 100%; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); box-shadow: var(--shadow-md); z-index: 10; padding: 4px 0; min-width: 120px;">
                <button (click)="editGoal(g); g._showMenu = false" style="width: 100%; text-align: left; background: none; border: none; padding: 8px 16px; color: var(--color-text-primary); cursor: pointer;">Editar</button>
                <button (click)="deleteGoal(g.id); g._showMenu = false" style="width: 100%; text-align: left; background: none; border: none; padding: 8px 16px; color: var(--color-danger); cursor: pointer;">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="progress-bar-container my-4">
          <div class="progress-bar" [style.width]="getPercentage(g.currentAmount, g.targetAmount) + '%'"></div>
        </div>
        <div class="flex justify-between text-sm">
          <span class="font-bold">\${{ g.currentAmount | number }}</span>
          <span class="text-secondary">Objetivo: \${{ g.targetAmount | number }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mb-4 { margin-bottom: var(--spacing-16); }
    .mb-6 { margin-bottom: var(--spacing-24); }
    .mb-8 { margin-bottom: var(--spacing-32); }
    .my-4 { margin: var(--spacing-16) 0; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .text-center { text-align: center; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--spacing-24); }
    .card { background: var(--color-surface); padding: var(--spacing-32); border-radius: var(--radius-xl); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); }
    .card h3 { margin-top: 0; margin-bottom: 4px; }
    .percentage { color: var(--color-primary); font-size: var(--text-h5-size); font-family: var(--font-primary); }
    .progress-bar-container { background: var(--color-n-100); height: 12px; border-radius: 6px; overflow: hidden; }
    .progress-bar { background: var(--color-primary); height: 100%; transition: width 0.3s ease; border-radius: 6px; }
    .icon-btn { background: transparent; border: none; cursor: pointer; color: var(--color-text-secondary); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .icon-btn:hover { background: var(--color-bg); color: var(--color-text-primary); }
    .dropdown-menu button:hover { background: var(--color-bg); }
    
    .form-group label { display: block; margin-bottom: 8px; color: var(--color-text-secondary); font-size: var(--text-sm); }
    .text-input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg); color: var(--color-text-primary); font-family: var(--font-primary); }
    .text-input:focus { outline: none; border-color: var(--color-primary); }
  `]
})
export class GoalsComponent implements OnInit {
  goals: any[] = [];
  accounts: any[] = [];
  
  showForm = false;
  editingGoal: any = null;
  currentGoal: any = { name: '', targetAmount: 0, currentAmount: 0, accountId: '' };

  showHelper = false;
  monthsTarget = 12;

  constructor(
    private goalService: GoalService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loadGoals();
    this.loadAccounts();
  }

  loadGoals() {
    this.goalService.getGoals().subscribe({
      next: (res) => this.goals = res.map(g => ({ ...g, _showMenu: false })),
      error: (err) => console.error(err)
    });
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (res) => this.accounts = res,
      error: (err) => console.error(err)
    });
  }

  getAccountName(id: string): string {
    const acc = this.accounts.find(a => a.id === id);
    return acc ? acc.name : 'Desconocida';
  }

  getPercentage(current: number, target: number): number {
    if (!target) return 0;
    const perc = (current / target) * 100;
    return perc > 100 ? 100 : perc;
  }

  formatCurrency(value: number): string {
    if (!value && value !== 0) return '';
    return '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  parseCurrency(value: string): number {
    if (!value) return 0;
    return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  }

  getMonthlySaving(): number {
    const remaining = Math.max(0, this.currentGoal.targetAmount - this.currentGoal.currentAmount);
    return remaining / (this.monthsTarget || 1);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  editGoal(goal: any) {
    this.editingGoal = goal;
    this.currentGoal = { ...goal };
    this.showForm = true;
  }

  saveGoal() {
    if (this.editingGoal) {
      this.goalService.updateGoal(this.editingGoal.id, this.currentGoal).subscribe({
        next: () => {
          this.loadGoals();
          this.toggleForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.goalService.createGoal(this.currentGoal).subscribe({
        next: () => {
          this.loadGoals();
          this.toggleForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  deleteGoal(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta meta?')) {
      this.goalService.deleteGoal(id).subscribe({
        next: () => this.loadGoals(),
        error: (err) => console.error(err)
      });
    }
  }

  resetForm() {
    this.editingGoal = null;
    this.currentGoal = { name: '', targetAmount: 0, currentAmount: 0, accountId: '' };
  }
}
