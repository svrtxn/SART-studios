import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, LayoutDashboard, UploadCloud, Plus, Play, FileText, AlertCircle, CheckCircle, Mic, Type } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ LayoutDashboard, UploadCloud, Plus, Play, FileText, AlertCircle, CheckCircle, Mic, Type }))
  ]
};
