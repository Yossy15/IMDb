import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Movie, Person } from '../../services/movie.service';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  movie?: Movie;
  castData: { type: string, people: Person[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovie(movieId).subscribe(movie => {
      if (movie) {
        this.movie = movie;
        this.loadCastData();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadCastData(): void {
    if (!this.movie) return;

    this.movie.cast.forEach(castGroup => {
      this.movieService.getPeopleByIds(castGroup.personIds).subscribe(people => {
        this.castData.push({
          type: castGroup.type,
          people: people
        });
      });
    });
  }

  navigateToPerson(personId: number): void {
    this.router.navigate(['/person', personId]);
  }

  goBack(): void {
    this.location.back();
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}