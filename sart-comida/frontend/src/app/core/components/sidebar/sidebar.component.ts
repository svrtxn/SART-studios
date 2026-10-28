import { Component } from '@angular/core';
import { LucideAngularModule, Home, List, Calendar, Sparkles, Settings } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <aside class="w-[280px] h-[calc(100vh-72px)] bg-surface-light border-r border-border-light flex flex-col p-4">
      <nav class="flex-1 space-y-2 mt-4">
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-white shadow-sm border border-border-light text-primary font-medium text-[14px]">
          <lucide-icon name="home" [size]="20"></lucide-icon>
          Dashboard
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-neutral-100 hover:text-text-primary font-medium text-[14px] transition-colors">
          <lucide-icon name="list" [size]="20"></lucide-icon>
          Inventario
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-neutral-100 hover:text-text-primary font-medium text-[14px] transition-colors">
          <lucide-icon name="calendar" [size]="20"></lucide-icon>
          Plan Semanal
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-neutral-100 hover:text-text-primary font-medium text-[14px] transition-colors">
          <lucide-icon name="sparkles" [size]="20"></lucide-icon>
          Asistente IA
        </a>
      </nav>

      <div class="mt-auto">
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-neutral-100 hover:text-text-primary font-medium text-[14px] transition-colors">
          <lucide-icon name="settings" [size]="20"></lucide-icon>
          Configuración
        </a>
      </div>
    </aside>
  `
})
export class SidebarComponent {}
