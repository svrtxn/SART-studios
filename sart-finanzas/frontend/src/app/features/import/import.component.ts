import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CATEGORIES, getCategoryIcon } from '../../core/constants/categories';
import { TransactionService } from '../../core/services/transaction.service';
import { AccountService } from '../../core/services/account.service';
import { RouterModule } from '@angular/router';
import { getBankInfo } from '../../core/constants/banks';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent implements OnInit {
  getBankInfo(name: string) {
    return getBankInfo(name);
  }
  getCategoryIcon(cat: string) {
    return getCategoryIcon(cat);
  }
  toggleCategoryDropdown(event: Event, t: any) {
    event.stopPropagation();
    this.previewData.forEach(item => {
      if (item !== t) item._showCategories = false;
    });
    t._showCategories = !t._showCategories;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.previewData.forEach(item => item._showCategories = false);
  }
  step = 1;
  selectedFile: File | null = null;
  categories = CATEGORIES;
  previewData: any[] = [];
  isUploading = false;
  accounts: any[] = [];
  selectedIndex = 0;

  get selectedAccountId(): string {
    return this.accounts[this.selectedIndex]?.id || '';
  }

  constructor(private transactionService: TransactionService, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe({
      next: (accs) => {
        this.accounts = accs;
        if (accs.length > 0) {
          this.selectedIndex = 0;
        }
      }
    });
  }

  nextCard() {
    if (this.selectedIndex < this.accounts.length - 1) {
      this.selectedIndex++;
    }
  }

  prevCard() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  selectCard(index: number) {
    this.selectedIndex = index;
  }

  getCardStyle(index: number) {
    const diff = index - this.selectedIndex;
    const isCenter = diff === 0;
    const translateX = diff * 115; // 115% spacing
    const scale = isCenter ? 1 : 0.85;
    const zIndex = 100 - Math.abs(diff);
    const opacity = Math.abs(diff) > 2 ? 0 : isCenter ? 1 : 0.6;
    
    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity
    };
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.isUploading = true;
      this.transactionService.uploadCartola(this.selectedFile).subscribe({
        next: (res) => {
          this.previewData = res.data;
          this.step = 2;
          this.isUploading = false;
        },
        error: (err) => {
          console.error('Error al subir cartola', err);
          alert('Hubo un error al procesar la cartola.');
          this.isUploading = false;
        }
      });
    }
  }

  confirmImport() {
    if (!this.selectedAccountId) {
      alert('Por favor selecciona una cuenta destino.');
      return;
    }
    
    const payload = this.previewData.map(t => ({ ...t, accountId: this.selectedAccountId }));

    this.transactionService.createBulk(payload).subscribe({
      next: (res) => {
        this.step = 3;
      },
      error: (err) => {
        console.error('Error guardando en bulk', err);
        alert('Hubo un error al guardar los movimientos.');
      }
    });
  }
}
