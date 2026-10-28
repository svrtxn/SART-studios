import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../core/services/quiz.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-quizzes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CardComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './quizzes-list.component.html',
  styleUrl: './quizzes-list.component.scss'
})
export class QuizzesListComponent implements OnInit {
  quizzes: any[] = [];
  loading = true;
  loadError = '';

  title = '';
  contentSource = '';
  status: 'idle' | 'generating' | 'error' = 'idle';
  generateError = '';

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;
    this.quizService.getAll().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.loading = false;
      },
      error: (err) => {
        this.loadError = 'No se pudieron cargar los cuestionarios.';
        this.loading = false;
      }
    });
  }

  generateQuiz() {
    if (!this.title.trim() || !this.contentSource.trim()) return;

    this.status = 'generating';
    this.generateError = '';

    this.quizService.generateQuiz(this.title, this.contentSource).subscribe({
      next: (quiz) => {
        this.status = 'idle';
        this.router.navigate(['/quizzes', quiz.id]);
      },
      error: (err) => {
        this.generateError = 'Falló la generación del cuestionario.';
        this.status = 'error';
      }
    });
  }

  cancel() {
    this.title = '';
    this.contentSource = '';
    this.status = 'idle';
    this.generateError = '';
  }

  takeQuiz(id: string): void {
    this.router.navigate(['/quizzes', id]);
  }
}
