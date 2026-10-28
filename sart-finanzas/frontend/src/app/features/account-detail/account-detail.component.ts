import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import { BANKS, getBankInfo } from '../../core/constants/banks';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.css'
})
export class AccountDetailComponent implements OnInit {
  BANKS = BANKS;
  account: any = null;
  activeTab: 'config' | 'wallet' = 'config';
  
  // Wallet states
  showSensitive = false;
  copiedField: string | null = null;

  // Save alert
  saveAlert: { type: 'success' | 'error'; message: string } | null = null;

  // Expiration helpers
  months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  years: string[] = [];
  expMonth = '';
  expYear = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 12; i++) {
      this.years.push(String(currentYear + i).slice(-2));
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadAccount(id);
      }
    });
  }

  loadAccount(id: string) {
    this.accountService.getAccounts().subscribe(accs => {
      this.account = accs.find((a: any) => a.id === id);
      if (this.account?.cardExpiration) {
        const parts = this.account.cardExpiration.split('/');
        if (parts.length === 2) {
          this.expMonth = parts[0];
          this.expYear = parts[1];
        }
      }
    });
  }

  getBankInfo(name: string) {
    return getBankInfo(name);
  }

  // Format card number input with spaces every 4 digits
  onCardNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let raw = input.value.replace(/\D/g, '').substring(0, 16);
    let formatted = raw.replace(/(.{4})/g, '$1 ').trim();
    this.account.cardNumber = raw;
    input.value = formatted;
  }

  // Get display version of card number
  getCardNumberDisplay(): string {
    if (!this.account?.cardNumber) return '';
    const raw = this.account.cardNumber.replace(/\D/g, '');
    return raw.replace(/(.{4})/g, '$1 ').trim();
  }

  // Update expiration when month/year change
  updateExpiration() {
    if (this.expMonth && this.expYear) {
      this.account.cardExpiration = `${this.expMonth}/${this.expYear}`;
    }
  }

  saveConfig() {
    if (this.account) {
      this.accountService.updateAccount(this.account.id, this.account).subscribe({
        next: () => this.showAlert('success', 'Configuración guardada exitosamente.'),
        error: () => this.showAlert('error', 'Error al guardar la configuración. Intenta nuevamente.')
      });
    }
  }

  saveWallet() {
    if (this.account) {
      this.accountService.updateAccount(this.account.id, {
        accountNumber: this.account.accountNumber,
        ownerName: this.account.ownerName,
        ownerRut: this.account.ownerRut,
        ownerEmail: this.account.ownerEmail,
        cardNumber: this.account.cardNumber,
        cardExpiration: this.account.cardExpiration,
        cvv: this.account.cvv
      }).subscribe({
        next: () => this.showAlert('success', 'Datos de billetera guardados exitosamente.'),
        error: () => this.showAlert('error', 'Error al guardar los datos. Intenta nuevamente.')
      });
    }
  }

  // Copy all account data in formatted block
  copyAllAccountData() {
    const typeLbl = this.getAccountTypeLabel(this.account.type);
    const lines = [
      this.account.ownerName || '',
      this.account.ownerRut || '',
      this.account.ownerEmail || '',
      typeLbl,
      this.account.accountNumber || '',
      this.account.bankName || ''
    ].filter(l => l).join('\n');

    navigator.clipboard.writeText(lines).then(() => {
      this.copiedField = 'all-account';
      setTimeout(() => this.copiedField = null, 2500);
    });
  }

  getAccountTypeLabel(type: string): string {
    switch (type) {
      case 'CHECKING': return 'Cuenta Corriente';
      case 'CREDIT': return 'Tarjeta de Crédito';
      case 'SAVINGS': return 'Cuenta de Ahorro';
      default: return type;
    }
  }

  showAlert(type: 'success' | 'error', message: string) {
    this.saveAlert = { type, message };
    setTimeout(() => this.saveAlert = null, 4000);
  }

  copyToClipboard(text: string, field: string) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      this.copiedField = field;
      setTimeout(() => this.copiedField = null, 2000);
    });
  }

  deleteAccount() {
    if (confirm('¿Estás seguro de eliminar esta cuenta? Todo el historial asociado se perderá.')) {
      this.accountService.deleteAccount(this.account.id).subscribe(() => {
        this.router.navigate(['/accounts']);
      });
    }
  }
}
