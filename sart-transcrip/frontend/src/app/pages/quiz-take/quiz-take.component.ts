import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../core/services/quiz.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-quiz-take',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './quiz-take.component.html',
  styleUrl: './quiz-take.component.scss'
})
export class QuizTakeComponent implements OnInit {
  quiz: any = null;
  loading = true;
  error = '';
  
  answers: Record<string, string> = {};
  isSubmitted = false;
  results: any = null;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadQuiz(id);
    }
  }

  loadQuiz(id: string): void {
    this.quizService.getOne(id).subscribe({
      next: (data) => {
        this.quiz = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el cuestionario.';
        this.loading = false;
      }
    });
  }

  selectAnswer(questionId: string, option: string): void {
    if (this.isSubmitted) return;
    this.answers[questionId] = option;
  }

  submitQuiz(): void {
    if (Object.keys(this.answers).length < this.quiz.questions.length) {
      alert('Por favor, responde a todas las preguntas antes de enviar.');
      return;
    }

    this.isSubmitted = true;
    this.quizService.submitAnswers(this.quiz.id, this.answers).subscribe({
      next: (res) => {
        this.results = res;
      },
      error: (err) => {
        alert('Hubo un error al enviar las respuestas.');
        this.isSubmitted = false;
      }
    });
  }

  getQuestionResult(questionId: string) {
    if (!this.results) return null;
    return this.results.results.find((r: any) => r.questionId === questionId);
  }

  goBack(): void {
    this.router.navigate(['/quizzes']);
  }
}
