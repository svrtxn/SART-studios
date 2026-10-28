import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService {
  private apiUrl = `${environment.apiUrl}/transcriptions`;

  constructor(private http: HttpClient) {}

  getAll(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  getOne(id: string, userId: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}?userId=${userId}`);
  }

  create(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: string, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string, userId: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, { body: { userId } });
  }
}
