import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ถ้ามี routing
import { HomeComponent } from './app/components/home/home.component';
import { MovieDetailComponent } from './app/components/movieDetail/movie-detail.component';
import { PersonDetailComponent } from './app/components/personDetail/person-detail.component';
import { MovieService } from './app/services/movie.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),       // ✅ สำคัญมาก
    provideRouter(routes)      // ถ้ามี routing
  ]
});
