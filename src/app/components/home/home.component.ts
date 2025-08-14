import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService, Movie, Person } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // ✅ ไม่ต้องใช้ HttpClientModule แล้ว
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // ✅ ต้องใช้ styleUrls (ไม่ใช่ styleUrl)
})
export class HomeComponent implements OnInit {
  @ViewChild('moviesGrid') moviesGrid!: ElementRef;
  @ViewChild('peopleGrid') peopleGrid!: ElementRef;
  movies: Movie[] = [];
  people: Person[] = [];

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });

    this.movieService.getPeople().subscribe(people => {
      this.people = people.slice(0, 12);
    });
  }

  navigateToMovie(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  navigateToPerson(personId: number): void {
    this.router.navigate(['/person', personId]);
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
