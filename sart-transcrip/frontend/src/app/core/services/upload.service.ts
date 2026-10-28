import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = `${environment.apiUrl}/uploads`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File, transcriptionId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('transcriptionId', transcriptionId);

    return this.http.post<any>(this.apiUrl, formData);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
