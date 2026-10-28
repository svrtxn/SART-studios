import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:3000/api/accounts';
  private currentAccountId: string | null = null;

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateAccount(id: string, data: Partial<any>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  deleteAccount(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createAccount(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  setCurrentAccountId(id: string) {
    this.currentAccountId = id;
  }

  getCurrentAccountId(): string | null {
    return this.currentAccountId;
  }

  initializeDefaultAccount(): Observable<any> {
    return new Observable(observer => {
      this.getAccounts().subscribe({
        next: (accounts) => {
          if (accounts.length > 0) {
            this.setCurrentAccountId(accounts[0].id);
            observer.next(accounts[0]);
            observer.complete();
          } else {
            this.createAccount({
              name: 'Cuenta Corriente Scotiabank',
              type: 'CHECKING',
              currency: 'CLP',
              balance: 0
            }).subscribe({
              next: (newAccount) => {
                this.setCurrentAccountId(newAccount.id);
                observer.next(newAccount);
                observer.complete();
              },
              error: (err) => observer.error(err)
            });
          }
        },
        error: (err) => {
          // Si el endpoint de cuentas no está listo o falla
          observer.error(err);
        }
      });
    });
  }
}
