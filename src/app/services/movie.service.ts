// src/app/services/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  trailer: string;
  genres: string[];
  description: string;
  cast: {
    type: string;
    personIds: number[];
  }[];
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  video: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesUrl = 'assets/data/movies.json';
  private peopleUrl = 'assets/data/people.json';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<{movies: Movie[]}>(this.moviesUrl)
      .pipe(map(response => response.movies));
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return this.getMovies().pipe(
      map(movies => movies.find(movie => movie.id === id))
    );
  }

  getPeople(): Observable<Person[]> {
    return this.http.get<{people: Person[]}>(this.peopleUrl)
      .pipe(map(response => response.people));
  }

  getPerson(id: number): Observable<Person | undefined> {
    return this.getPeople().pipe(
      map(people => people.find(person => person.id === id))
    );
  }

  getPeopleByIds(ids: number[]): Observable<Person[]> {
    return this.getPeople().pipe(
      map(people => people.filter(person => ids.includes(person.id)))
    );
  }
}