import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService, Movie, Person } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [MovieService],
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('moviesGrid') moviesGrid!: ElementRef;
  @ViewChild('peopleGrid') peopleGrid!: ElementRef;
  movies: Movie[] = [];
  people: Person[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });

    this.movieService.getPeople().subscribe(people => {
      this.people = people.slice(0, 12);
    });
  }

  scrollLeft() {
    if (this.moviesGrid) {
      this.moviesGrid.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.moviesGrid) {
      this.moviesGrid.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  scrollLeft1() {
    if (this.peopleGrid) {
      this.peopleGrid.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight1() {
    if (this.peopleGrid) {
      this.peopleGrid.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}
