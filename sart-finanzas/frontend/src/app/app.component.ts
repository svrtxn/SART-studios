// Force rebuild
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TransactionModalComponent } from './shared/components/transaction-modal/transaction-modal.component';
import { OnboardingModalComponent } from './shared/components/onboarding-modal/onboarding-modal.component';
import { AccountService } from './core/services/account.service';
import { TourService } from './core/services/tour.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TransactionModalComponent, OnboardingModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isModalOpen = false;
  modalType: 'INCOME' | 'EXPENSE' = 'INCOME';

  constructor(private accountService: AccountService, public tourService: TourService) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe({
      next: (accs) => {
        if (accs.length === 0) {
          this.tourService.startTour();
        }
      },
      error: (err) => console.error('Failed to get accounts', err)
    });
  }

  openTransactionModal(type: 'INCOME' | 'EXPENSE') {
    this.modalType = type;
    this.isModalOpen = true;
  }

  closeTransactionModal() {
    this.isModalOpen = false;
  }

  onTransactionSaved() {
    console.log('Transaction saved successfully!');
  }
}
