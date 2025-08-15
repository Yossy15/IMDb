import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ถ้ามี routing
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),       // ✅ สำคัญมาก
    provideRouter(routes),      // ถ้ามี routing
    importProvidersFrom(HttpClientModule) // ✅ ใช้ใน Standalone App
  ]
});
