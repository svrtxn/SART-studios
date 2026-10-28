import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="h-[72px] bg-white/80 backdrop-blur-md border-b border-border-light sticky top-0 z-50 flex items-center justify-between px-8">
      <div class="flex items-center gap-4">
        <!-- Replaced standard image tag with specific S.png referencing SART logo -->
        <img src="/assets/S.png" alt="SART Logo" class="h-8 w-8 object-contain" />
        <span class="font-sans font-bold text-[20px] tracking-tight">SART FOOD</span>
      </div>
      
      <div class="flex items-center gap-4">
        <button class="btn btn-ghost px-4">Planificador</button>
        <button class="btn btn-ghost px-4">Recetas IA</button>
        <div class="w-px h-6 bg-border-light mx-2"></div>
        <button class="btn btn-primary">Nueva Lista</button>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
