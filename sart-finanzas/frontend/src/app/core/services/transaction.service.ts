import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransactionPayload {
  date: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  accountId: string;
  categoryId?: number;
  tag?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  createTransaction(data: TransactionPayload): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  createBulk(transactions: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk`, transactions);
  }

  updateTransaction(id: number | string, data: Partial<TransactionPayload>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  getTransactions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary`);
  }

  uploadCartola(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bankId', '1');
    return this.http.post('http://localhost:3000/upload/cartola', formData);
  }
}
