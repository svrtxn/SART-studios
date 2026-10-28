import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AccountsComponent } from './features/accounts/accounts.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { ImportComponent } from './features/import/import.component';
import { GoalsComponent } from './features/goals/goals.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/:id', loadComponent: () => import('./features/account-detail/account-detail.component').then(m => m.AccountDetailComponent) },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'import', component: ImportComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'planning', loadComponent: () => import('./features/planning/planning.component').then(m => m.PlanningComponent) }
];
