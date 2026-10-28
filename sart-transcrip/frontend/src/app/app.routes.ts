import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
  { 
    path: 'transcriptions', 
    loadComponent: () => import('./pages/transcriptions/transcriptions.component').then(m => m.TranscriptionsComponent) 
  },
  { 
    path: 'quizzes', 
    loadComponent: () => import('./pages/quizzes-list/quizzes-list.component').then(m => m.QuizzesListComponent) 
  },
  { 
    path: 'quizzes/:id', 
    loadComponent: () => import('./pages/quiz-take/quiz-take.component').then(m => m.QuizTakeComponent) 
  }
];
