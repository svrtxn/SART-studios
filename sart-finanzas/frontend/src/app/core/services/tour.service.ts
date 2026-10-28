import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface TourStep {
  stepIndex: number;
  title: string;
  text: string;
  route: string;
  targetId: string;
  alignment: 'center' | 'top-right' | 'bottom-left' | 'top-left';
}

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private steps: TourStep[] = [
    {
      stepIndex: 1,
      title: '¡Bienvenido a SART Eco!',
      text: 'Este es tu panel principal. Por ahora está vacío porque necesitamos configurar tu entorno financiero.',
      route: '/dashboard',
      targetId: 'tour-dashboard-center',
      alignment: 'center'
    },
    {
      stepIndex: 2,
      title: 'Menú de Cuentas',
      text: 'Para empezar, debes registrar dónde tienes tu dinero guardado. Haz clic aquí para ir a Cuentas.',
      route: '/dashboard',
      targetId: 'tour-nav-accounts',
      alignment: 'top-left'
    },
    {
      stepIndex: 3,
      title: 'Crear tu primera Cuenta',
      text: '¡Aquí administrarás tus finanzas! Presiona el botón "Nueva Cuenta" para registrar tu banco y saldo real.',
      route: '/accounts',
      targetId: 'tour-btn-new-account',
      alignment: 'top-right'
    }
  ];

  private currentStepSubject = new BehaviorSubject<number>(0); // 0 means not active
  currentStep$ = this.currentStepSubject.asObservable();
  
  public isActive = false;

  constructor(private router: Router) {}

  startTour() {
    this.isActive = true;
    this.goToStep(1);
  }

  nextStep() {
    const current = this.currentStepSubject.value;
    if (current < this.steps.length) {
      this.goToStep(current + 1);
    } else {
      this.endTour();
    }
  }

  goToStep(stepIndex: number) {
    const step = this.steps.find(s => s.stepIndex === stepIndex);
    if (step) {
      this.router.navigate([step.route]).then(() => {
        setTimeout(() => {
          this.currentStepSubject.next(stepIndex);
        }, 100); // small delay to let the route render
      });
    }
  }

  endTour() {
    this.isActive = false;
    this.currentStepSubject.next(0);
    localStorage.setItem('tutorialCompleted', 'true');
  }

  getCurrentStepData(): TourStep | undefined {
    return this.steps.find(s => s.stepIndex === this.currentStepSubject.value);
  }
}
