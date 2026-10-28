import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Budget {
  id?: string;
  name?: string;
  categoryId?: number;
  category?: any;
  amount: number;
  currencyCode?: string;
  period?: string;
  warningThreshold?: number;
  limitThreshold?: number;
  accountId?: string;
  account?: any;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}

export interface BudgetSummary {
  id: string;
  name: string;
  categoryName: string;
  categoryIcon?: string;
  accountName: string;
  amount: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: 'normal' | 'warning' | 'limit' | 'exceeded';
  daysRemaining: number;
  projection: number;
  period: string;
  warningThreshold: number;
  limitThreshold: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = `http://localhost:3000/api/budgets`;

  constructor(private http: HttpClient) {}

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl);
  }

  getSummary(): Observable<BudgetSummary[]> {
    return this.http.get<BudgetSummary[]>(`${this.apiUrl}/summary`);
  }

  createBudget(budget: Partial<Budget>): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, budget);
  }

  updateBudget(id: string, budget: Partial<Budget>): Observable<Budget> {
    return this.http.patch<Budget>(`${this.apiUrl}/${id}`, budget);
  }

  deleteBudget(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
