import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = `${environment.apiUrl}/settings`;

  constructor(private http: HttpClient) {}

  getSettings(userId: string) {
    return this.http.get<any>(this.apiUrl, { params: { userId } });
  }

  updateSettings(data: any) {
    return this.http.put<any>(this.apiUrl, data);
  }
}
