import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:3000/api/goals';

  constructor(private http: HttpClient) {}

  getGoals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createGoal(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateGoal(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteGoal(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
