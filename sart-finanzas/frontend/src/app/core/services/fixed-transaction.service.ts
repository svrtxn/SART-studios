import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FixedTransaction {
  id?: number;
  name: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  periodicity: string;
  paymentDay?: number;
  categoryId?: number;
  category?: any;
  accountId?: string;
  account?: any;
  description?: string;
  startDate?: string;
  endDate?: string;
  isVariableAmount?: boolean;
  reminderDays?: string;
  isActive?: boolean;
  currencyCode?: string;
  // Runtime fields from /status endpoint
  currentStatus?: string;
  paymentId?: number;
  paidAmount?: number;
  paidDate?: string;
}

export interface UpcomingPayment {
  id: number;
  name: string;
  amount: number;
  isVariableAmount: boolean;
  paymentDay: number;
  dueDate: string;
  daysUntilDue: number;
  categoryName: string;
  categoryIcon?: string;
  accountName: string;
  status: string;
  paymentId?: number;
}

export interface MonthlyCommitments {
  items: { name: string; amount: number; paymentDay: number }[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class FixedTransactionService {
  private apiUrl = `http://localhost:3000/fixed-transactions`;

  constructor(private http: HttpClient) {}

  getFixedTransactions(): Observable<FixedTransaction[]> {
    return this.http.get<FixedTransaction[]>(this.apiUrl);
  }

  getUpcoming(days: number = 30): Observable<UpcomingPayment[]> {
    return this.http.get<UpcomingPayment[]>(`${this.apiUrl}/upcoming?days=${days}`);
  }

  getWithStatus(): Observable<FixedTransaction[]> {
    return this.http.get<FixedTransaction[]>(`${this.apiUrl}/status`);
  }

  getMonthlyCommitments(): Observable<MonthlyCommitments> {
    return this.http.get<MonthlyCommitments>(`${this.apiUrl}/commitments`);
  }

  createFixedTransaction(tx: Partial<FixedTransaction>): Observable<FixedTransaction> {
    return this.http.post<FixedTransaction>(this.apiUrl, tx);
  }

  updateFixedTransaction(id: number, tx: Partial<FixedTransaction>): Observable<FixedTransaction> {
    return this.http.put<FixedTransaction>(`${this.apiUrl}/${id}`, tx);
  }

  markAsPaid(id: number, paidAmount?: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/pay`, { paidAmount });
  }

  skipPayment(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/skip`, {});
  }

  deleteFixedTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
