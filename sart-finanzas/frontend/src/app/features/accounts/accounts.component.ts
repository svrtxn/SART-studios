import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { BANKS, getBankInfo } from '../../core/constants/banks';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="header mb-8 flex justify-between items-center">
      <h1>Cuentas</h1>
      <button id="tour-btn-new-account" class="btn btn-secondary" *ngIf="showNewAccountForm" (click)="toggleForm()">
        Cancelar
      </button>
    </div>

    <div *ngIf="showNewAccountForm" class="card mb-8" style="padding: 24px; margin-bottom: 32px;">
      <h3 style="margin-top: 0; margin-bottom: 16px;">Crear Nueva Cuenta</h3>
      
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <label style="font-size: var(--text-sm); color: var(--color-text-secondary);">Selecciona tu Institución Financiera (Opcional)</label>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button *ngFor="let bank of BANKS" (click)="selectBank(bank)" [title]="bank.name"
                  style="background: var(--color-surface); border: 1.5px solid; border-radius: 8px; padding: 8px 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; height: 48px; transition: all 0.2s; flex: 0 0 auto;"
                  [style.border-color]="currentAccount.bankName === bank.name ? 'var(--color-primary)' : 'var(--color-border)'">
            <img [src]="bank.logo" [alt]="bank.name" style="max-width: 80px; max-height: 24px; object-fit: contain;">
          </button>
        </div>
      </div>

      <div style="display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap;">
        <div class="form-group" style="flex: 1; min-width: 200px; display: flex; flex-direction: column;">
          <label style="margin-bottom: 8px; font-size: var(--text-sm); color: var(--color-text-secondary);">Nombre de la Tarjeta/Cuenta (ej. Tarjeta Personal)</label>
          <input type="text" [(ngModel)]="currentAccount.name" style="padding: 12px; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg); color: white;">
        </div>
        <div class="form-group" style="flex: 1; min-width: 200px; display: flex; flex-direction: column;">
          <label style="margin-bottom: 8px; font-size: var(--text-sm); color: var(--color-text-secondary);">Tipo</label>
          <select [(ngModel)]="currentAccount.type" style="padding: 12px; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg); color: white;">
            <option value="CHECKING">Corriente</option>
            <option value="CREDIT">Crédito</option>
            <option value="SAVINGS">Ahorro</option>
          </select>
        </div>
        <div class="form-group" style="flex: 1; min-width: 200px; display: flex; flex-direction: column;">
          <label style="margin-bottom: 8px; font-size: var(--text-sm); color: var(--color-text-secondary);">Saldo Inicial</label>
          <input type="number" [(ngModel)]="currentAccount.initialBalance" style="padding: 12px; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg); color: white;">
        </div>
        <button class="btn btn-primary" style="height: 48px;" [disabled]="!currentAccount.name" (click)="saveAccount()">
          Guardar Cuenta
        </button>
      </div>
    </div>

    <div *ngIf="accounts.length === 0 && !showNewAccountForm" class="card" style="text-align: center; padding: 64px 24px; margin-bottom: 32px;">
      <div class="icon text-primary" style="display: flex; justify-content: center; margin-bottom: 24px; opacity: 0.8;">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      </div>
      <h2 style="font-size: 24px; margin-bottom: 12px;">No tienes cuentas registradas</h2>
      <p class="text-secondary" style="max-width: 400px; margin: 0 auto 24px auto;">
        Crea tu primera cuenta bancaria para poder registrar movimientos y asociar tus cartolas.
      </p>
      <button class="btn btn-primary" (click)="toggleForm()" style="padding: 12px 24px;">+ Nueva Cuenta</button>
    </div>

    <div class="accounts-grid" *ngIf="accounts.length > 0">
      <a class="account-card" *ngFor="let acc of accounts" 
           [routerLink]="['/accounts', acc.id]"
           [style.--card-color]="getBankInfo(acc.bankName).color"
           [style.background]="'linear-gradient(135deg, var(--card-color) 0%, color-mix(in srgb, var(--card-color) 40%, black) 100%)'"
           style="text-decoration: none; cursor: pointer; display: block;">
           
        <div class="flex justify-between items-start" style="min-height: 32px;">
          <ng-container *ngIf="getBankInfo(acc.bankName).logo">
            <div style="background: rgba(255,255,255,0.95); padding: 6px 10px; border-radius: 6px; display: inline-flex; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <img [src]="getBankInfo(acc.bankName).logo" alt="Bank logo" style="height: 20px; object-fit: contain; object-position: left;">
            </div>
          </ng-container>
          <ng-container *ngIf="!getBankInfo(acc.bankName).logo">
            <div style="font-weight: bold; font-size: 16px; color: white; text-shadow: 0 1px 3px rgba(0,0,0,0.5); letter-spacing: 1px; padding-top: 4px;">
              {{ (acc.bankName || acc.name).toUpperCase() }}
            </div>
          </ng-container>
        </div>

        <div style="margin-top: auto; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; opacity: 0.9;">
          <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="32" rx="4" fill="#D4AF37"/>
            <path d="M12 0V32M30 0V32M0 10H42M0 22H42" stroke="#B8860B" stroke-width="1.5"/>
            <rect x="8" y="6" width="26" height="20" rx="3" stroke="#B8860B" stroke-width="1.5" fill="none"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.7;"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
        </div>

        <div style="color: white; font-family: monospace; font-size: 18px; letter-spacing: 2px; margin-bottom: 12px; text-shadow: 0 1px 2px rgba(0,0,0,0.5); opacity: 0.9;">
          **** **** **** {{ acc.cardNumber ? (acc.cardNumber.slice(-4) || '****') : '****' }}
        </div>
        
        <div class="text-h2-size font-bold font-primary" style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.4); letter-spacing: 2px;">
          \${{ acc.currentBalance | number }}
        </div>

        <div class="flex justify-between items-end mt-4" style="color: rgba(255,255,255,0.9); text-shadow: 0 1px 3px rgba(0,0,0,0.5);">
          <div>
            <h3 style="margin: 0; font-size: 15px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.9;">{{ acc.name }}</h3>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">
              {{ acc.type === 'CREDIT' ? 'Crédito' : acc.type === 'SAVINGS' ? 'Ahorro' : 'Débito' }}
            </span>
          </div>
        </div>
      </a>
      
      <!-- Add New Account Card -->
      <div class="account-card" (click)="toggleForm()" *ngIf="!showNewAccountForm" style="border: 2px dashed rgba(255,255,255,0.2); background: rgba(255,255,255,0.02); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--color-text-secondary); box-shadow: none;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span style="font-weight: 500; font-size: 16px;">Agregar Cuenta</span>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .mb-8 { margin-bottom: var(--spacing-32); }
    .mb-4 { margin-bottom: var(--spacing-16); }
    .mt-4 { margin-top: var(--spacing-16); }
    .text-xl { font-size: var(--text-h5-size); }
    .text-h2-size { font-size: var(--text-h2-size); line-height: var(--text-h2-line); }
    .font-primary { font-family: var(--font-primary); }
    .accounts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--spacing-24); }
    
    .account-card { 
      padding: 24px; 
      border-radius: 16px; 
      border: 1px solid rgba(255,255,255,0.1); 
      box-shadow: 0 10px 20px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.2); 
      transition: all 250ms ease-out; 
      aspect-ratio: 1.586;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    .account-card::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(115deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%, rgba(0,0,0,0.1) 100%);
      pointer-events: none;
    }
    .account-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 14px 24px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2); }
    
    .card { background: var(--color-surface); border-radius: var(--radius-xl); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); }
    .icon-btn { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; transition: all 0.2s; color: var(--color-text-secondary); }
    .icon-btn:hover { background: rgba(255,255,255,0.1); color: white; }
    .card-menu-btn { color: rgba(255,255,255,0.7); }
    .dropdown-menu button:hover { background: var(--color-bg); }
  `]
})
export class AccountsComponent implements OnInit {
  BANKS = BANKS;
  accounts: any[] = [];
  showNewAccountForm = false;
  currentAccount = { name: '', bankName: '', type: 'CHECKING', currency: 'CLP', initialBalance: 0 };

  constructor(private accountService: AccountService) {}

  getBankInfo(name: string) {
    return getBankInfo(name);
  }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accs) => this.accounts = accs.map(a => ({ ...a, _showMenu: false })),
      error: (err) => console.error(err)
    });
  }

  toggleForm() {
    this.showNewAccountForm = !this.showNewAccountForm;
    if (!this.showNewAccountForm) {
      this.resetForm();
    }
  }

  selectBank(bank: any) {
    this.currentAccount.bankName = bank.name;
    // Si no tiene nombre la tarjeta, le ponemos el del banco por defecto
    if (!this.currentAccount.name) {
      this.currentAccount.name = bank.name;
    }
  }

  saveAccount() {
    if (!this.currentAccount.name) return;

    this.accountService.createAccount(this.currentAccount).subscribe({
      next: () => {
        this.loadAccounts();
        this.toggleForm();
      },
      error: (err) => console.error(err)
    });
  }

  resetForm() {
    this.currentAccount = { name: '', bankName: '', type: 'CHECKING', currency: 'CLP', initialBalance: 0 };
  }
}
