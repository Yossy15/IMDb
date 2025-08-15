import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService, Movie, Person } from '../../services/movie.service';
import { Location, CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [MovieService]
})
export class MovieDetailComponent implements OnInit {
  movie?: Movie;
  castData: { type: string; people: Person[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(movieId).subscribe(movie => {
      if (movie) {
        this.movie = movie;
        this.loadCastData();
      } else {
        this.location.back();
      }
    });
  }

  private loadCastData(): void {
    if (!this.movie) return;
    this.movie.cast.forEach(castGroup => {
      this.movieService.getPeopleByIds(castGroup.personIds).subscribe(people => {
        this.castData.push({ type: castGroup.type, people });
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
