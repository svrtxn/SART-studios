// Force rebuild
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService, TourStep } from '../../../core/services/tour.service';

@Component({
  selector: 'app-onboarding-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-modal.component.html',
  styleUrl: './onboarding-modal.component.css'
})
export class OnboardingModalComponent implements OnInit {
  currentStep: TourStep | undefined;
  tooltipStyle: any = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  constructor(public tourService: TourService) {}

  ngOnInit() {
    this.tourService.currentStep$.subscribe((stepIndex: number) => {
      this.currentStep = this.tourService.getCurrentStepData();
      this.updateHighlights();
    });
  }

  next() {
    this.tourService.nextStep();
  }

  skip() {
    this.tourService.endTour();
    this.removeHighlights();
  }

  private updateHighlights() {
    this.removeHighlights();
    if (this.currentStep && this.currentStep.targetId) {
      // Use setTimeout to ensure DOM is updated and elements exist
      setTimeout(() => {
        const el = document.getElementById(this.currentStep!.targetId);
        if (el) {
          el.classList.add('tour-highlight');
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          setTimeout(() => {
            const rect = el.getBoundingClientRect();
            this.calculateTooltipPosition(rect, this.currentStep!.alignment);
          }, 400); // Wait for scroll animation to finish
        } else {
          this.tooltipStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        }
      }, 50);
    } else {
      this.tooltipStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  }

  private calculateTooltipPosition(rect: DOMRect, alignment: string) {
    if (alignment === 'center') {
      this.tooltipStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' };
      return;
    }
    
    let top = rect.bottom + 24;
    let left = rect.left + (rect.width / 2) - 200; // center by default
    
    if (alignment === 'top-left') left = rect.left;
    if (alignment === 'top-right') left = rect.right - 400;
    
    // viewport boundaries
    if (left < 16) left = 16;
    if (left + 400 > window.innerWidth - 16) left = window.innerWidth - 416;
    
    // if it goes off the bottom, place it above
    if (top + 250 > window.innerHeight) {
      top = rect.top - 280;
    }
    
    this.tooltipStyle = {
      top: top + 'px',
      left: left + 'px',
      transform: 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  }

  private removeHighlights() {
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });
  }
}
