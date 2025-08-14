import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movieDetail/movie-detail.component';
import { PersonDetailComponent } from './components/personDetail/person-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'person/:id', component: PersonDetailComponent },
  { path: '**', redirectTo: '' }
];
