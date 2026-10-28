import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranscriptionService } from '../../core/services/transcription.service';
import { UploadService } from '../../core/services/upload.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-transcriptions',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, FormsModule, LucideAngularModule],
  templateUrl: './transcriptions.component.html',
  styleUrl: './transcriptions.component.scss'
})
export class TranscriptionsComponent implements OnInit {
  transcriptions: any[] = [];
  loading = true;
  loadError = '';

  selectedFile: File | null = null;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error' = 'idle';
  uploadError = '';

  // Hardcoded for testing since auth is not fully hooked up in frontend yet
  private testUserId = 'test-user-id';

  constructor(
    private transcriptionService: TranscriptionService,
    private uploadService: UploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTranscriptions();
  }

  loadTranscriptions(): void {
    this.loading = true;
    this.transcriptionService.getAll(this.testUserId).subscribe({
      next: (data) => {
        this.transcriptions = data;
        this.loading = false;
      },
      error: (err) => {
        this.loadError = 'No se pudieron cargar las transcripciones';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async onUpload(): Promise<void> {
    if (!this.selectedFile) return;

    this.uploadStatus = 'uploading';
    this.uploadError = '';

    try {
      this.transcriptionService.create({ 
        filename: this.selectedFile.name,
        provider: 'whisper', // default
        userId: this.testUserId
      }).subscribe({
        next: (transcription) => {
          this.uploadService.uploadFile(this.selectedFile!, transcription.id).subscribe({
            next: () => {
              this.uploadStatus = 'success';
              this.loadTranscriptions(); // Reload list
            },
            error: (err) => {
              this.uploadError = 'Falló la subida del archivo';
              this.uploadStatus = 'error';
            }
          });
        },
        error: (err) => {
          this.uploadError = 'No se pudo crear el registro de transcripción';
          this.uploadStatus = 'error';
        }
      });
    } catch (err) {
      this.uploadError = 'Ocurrió un error inesperado';
      this.uploadStatus = 'error';
    }
  }

  resetUpload(): void {
    this.selectedFile = null;
    this.uploadStatus = 'idle';
    this.uploadError = '';
  }
}
