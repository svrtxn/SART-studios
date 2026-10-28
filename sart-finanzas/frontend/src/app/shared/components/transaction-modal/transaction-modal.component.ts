import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { AccountService } from '../../../core/services/account.service';
import { CATEGORIES, getCategoryIcon } from '../../../core/constants/categories';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent implements OnInit {
  @Input() type: 'INCOME' | 'EXPENSE' = 'INCOME';
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  categories = [...CATEGORIES];
  accounts: any[] = [];
  transactionForm: FormGroup;
  isSubmitting = false;
  showCustomInput = false;
  isCustomCategoryActive = false;

  constructor(private fb: FormBuilder, private transactionService: TransactionService, private accountService: AccountService) {
    const defaultAcc = this.accountService.getCurrentAccountId() || '';
    this.transactionForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      category: ['', Validators.required],
      accountId: [defaultAcc, Validators.required]
    });
  }

  ngOnInit() {
    this.accountService.getAccounts().subscribe({
      next: (accs) => {
        this.accounts = accs;
        if (!this.transactionForm.get('accountId')?.value && accs.length > 0) {
          this.transactionForm.patchValue({ accountId: accs[0].id });
        }
      },
      error: (err) => console.error('Error fetching accounts', err)
    });
  }

  getIcon(cat: string) {
    return getCategoryIcon(cat);
  }

  selectCategory(cat: string) {
    this.transactionForm.patchValue({ category: cat });
    this.showCustomInput = false;
    this.isCustomCategoryActive = false;
  }

  enableCustomCategory() {
    this.showCustomInput = true;
    this.transactionForm.patchValue({ category: '' });
  }

  addCustomCategory(value: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    const val = value.trim();
    if (val) {
      if (!this.categories.includes(val)) {
        this.categories.push(val);
      }
      this.transactionForm.patchValue({ category: val });
      this.isCustomCategoryActive = true;
    }
    this.showCustomInput = false;
  }

  onSubmit() {
    if (this.transactionForm.invalid) return;

    this.isSubmitting = true;
    const formValue = this.transactionForm.value;
    
    // Amount must be negative for expenses
    const finalAmount = this.type === 'EXPENSE' ? -Math.abs(formValue.amount) : Math.abs(formValue.amount);

    const payload = {
      date: new Date(formValue.date).toISOString(),
      description: formValue.description + ' | ' + formValue.category, // Storing in description temporarily since backend might not have category table ready
      amount: finalAmount,
      type: this.type,
      accountId: formValue.accountId
    };

    this.transactionService.createTransaction(payload as any).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.saved.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('Error creating transaction', err);
        this.isSubmitting = false;
      }
    });
  }
}
