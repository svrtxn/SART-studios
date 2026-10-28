import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  constructor(private router: Router) {}

  goToTranscriptions() {
    this.router.navigate(['/transcriptions']);
  }

  goToQuizzes() {
    this.router.navigate(['/quizzes']);
  }
}
