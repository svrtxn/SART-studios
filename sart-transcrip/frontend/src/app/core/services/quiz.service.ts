import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = `${environment.apiUrl}/quizzes`;

  constructor(private http: HttpClient) {}

  generateQuiz(title: string, contentSource: string) {
    return this.http.post<any>(`${this.apiUrl}/generate`, { title, contentSource });
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOne(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  submitAnswers(id: string, answers: Record<string, string>) {
    return this.http.post<any>(`${this.apiUrl}/${id}/submit`, { answers });
  }
}
