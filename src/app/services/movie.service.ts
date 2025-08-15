// src/app/services/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

// ---------- Interfaces ----------
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

interface MovieResponse {
  movies: Movie[];
}

interface PeopleResponse {
  people: Person[];
}

// ---------- Service ----------
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesUrl = 'assets/data/movies.json';
  private peopleUrl = 'assets/data/people.json';

  // Cache observables
  private moviesCache$?: Observable<Movie[]>;
  private peopleCache$?: Observable<Person[]>;

  constructor(private http: HttpClient) {}

  // Generic fetch method with error handling
  private fetchData<T>(url: string, selector: (data: any) => T): Observable<T> {
    return this.http.get<any>(url).pipe(
      map(selector),
      catchError((err) => {
        console.error(`Error loading ${url}`, err);
        return of([] as unknown as T); // Return empty array if error
      })
    );
  }

  // ----------- Movies -----------
  getMovies(): Observable<Movie[]> {
    if (!this.moviesCache$) {
      this.moviesCache$ = this.fetchData<Movie[]>(this.moviesUrl, (data: MovieResponse) => data.movies)
        .pipe(shareReplay(1)); // Cache result
    }
    return this.moviesCache$;
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return this.getMovies().pipe(
      map(movies => movies.find(movie => movie.id === id))
    );
  }

  // ----------- People -----------
  getPeople(): Observable<Person[]> {
    if (!this.peopleCache$) {
      this.peopleCache$ = this.fetchData<Person[]>(this.peopleUrl, (data: PeopleResponse) => data.people)
        .pipe(shareReplay(1));
    }
    return this.peopleCache$;
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
