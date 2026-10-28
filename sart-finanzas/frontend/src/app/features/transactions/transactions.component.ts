import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { getCategoryIcon as getIcon } from '../../core/constants/categories';
import { TransactionService } from '../../core/services/transaction.service';
import { CategoryService, Category } from '../../core/services/category.service';
import { getBankInfo } from '../../core/constants/banks';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="header mb-8 flex justify-between items-center">
      <h1>Movimientos</h1>
      <div class="filters flex" *ngIf="transactions.length > 0">
        <input type="text" placeholder="Buscar... (ej. supermercado)" class="filter-input mr-4" [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()">
        <select class="filter-select" [(ngModel)]="selectedCategory" (ngModelChange)="applyFilters()">
          <option value="">Todas las categorías</option>
          <option *ngFor="let c of categories" [value]="c.name">{{c.icon || '📌'}} {{c.name}}</option>
          <option value="Ingresos">Ingresos</option>
          <option value="Transporte">Transporte</option>
          <option value="Alimentación">Alimentación</option>
          <option value="Otros">Otros</option>
        </select>
      </div>
    </div>

    <div *ngIf="transactions.length === 0" class="card" style="text-align: center; padding: 64px 24px; background: var(--color-surface); border-radius: var(--radius-xl); border: 1px solid var(--color-border);">
      <div class="icon text-primary" style="display: flex; justify-content: center; margin-bottom: 24px; opacity: 0.8;">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      </div>
      <h2 style="font-size: 24px; margin-bottom: 12px;">No tienes movimientos aún</h2>
      <p class="text-secondary" style="max-width: 400px; margin: 0 auto 24px auto;">
        Mantén un registro de tus gastos e ingresos importando tu cartola bancaria o agregándolos manualmente.
      </p>
      <a routerLink="/import" class="btn btn-primary" style="display: inline-flex; text-decoration: none;">Importar Cartola</a>
    </div>

    <div class="table-container" *ngIf="transactions.length > 0">
      <table class="w-full text-left" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th class="text-right">Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of filteredTransactions" class="hover:bg-n-50">
            <td class="py-3 text-secondary" style="font-size: 13px;">{{ t.date | slice:0:10 }}</td>
            <td class="py-3">
              <div style="font-weight: 500; display: flex; align-items: center; gap: 8px;">
                <img *ngIf="isAllView && t.account && getBankInfo(t.account.bankName).logo" [src]="getBankInfo(t.account.bankName).logo" alt="Bank" style="height: 16px; object-fit: contain;">
                <span *ngIf="isAllView && t.account && !getBankInfo(t.account.bankName).logo" style="font-size: 12px; font-weight: bold; padding: 2px 6px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 4px;">
                  {{ (t.account.bankName || t.account.name).substring(0, 8) }}
                </span>
                {{ t.description }}
              </div>
              <div style="margin-top: 4px; display: flex; align-items: center;">
                <input type="text" [(ngModel)]="t.tag" placeholder="Añadir etiqueta..." class="text-xs" 
                       style="background: transparent; border: 1px dashed var(--color-border); border-radius: 4px; padding: 2px 6px; color: var(--color-text-secondary); width: 140px; outline: none; transition: border-color 0.2s;"
                       (blur)="saveTag(t)">
              </div>
            </td>
            <td class="py-3">
              <span class="tag">
                <span class="mr-2">{{ getCategoryIcon(t.category) }}</span>{{ t.category || 'Otros' }}
              </span>
            </td>
            <td class="py-3 text-right font-bold" [ngClass]="t.amount > 0 ? 'text-success' : ''">
              {{ t.amount > 0 ? '+' : '' }}\${{ t.amount | number }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  categories: Category[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';
  isAllView: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => this.categories = res);

    this.route.queryParams.subscribe(params => {
      const accountId = params['account'];
      this.isAllView = !accountId;
      this.transactionService.getTransactions().subscribe({
        next: (txs) => {
          if (accountId) {
            this.transactions = txs.filter((t: any) => t.account?.id === accountId);
          } else {
            this.transactions = txs;
          }
          this.applyFilters();
        },
        error: (err) => console.error('Error fetching transactions', err)
      });
    });
  }

  getCategoryIcon(category: string): string {
    const custom = this.categories.find(c => c.name === category);
    if (custom && custom.icon) return custom.icon;
    return getIcon(category);
  }

  getBankInfo(name: string) {
    if (!name) return { logo: null, color: '#ccc' };
    return getBankInfo(name);
  }

  applyFilters() {
    let temp = this.transactions;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter(t => 
        (t.description && t.description.toLowerCase().includes(term)) ||
        (t.tag && t.tag.toLowerCase().includes(term))
      );
    }

    if (this.selectedCategory) {
      temp = temp.filter(t => t.category === this.selectedCategory);
    }

    this.filteredTransactions = temp;
  }

  saveTag(tx: any) {
    // We only update the tag to backend
    this.transactionService.updateTransaction(tx.id, { tag: tx.tag }).subscribe();
  }
}
