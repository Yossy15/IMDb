import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Person } from '../../services/movie.service';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-person-detail',
  standalone: true,
  providers: [MovieService],
  imports: [CommonModule, HttpClientModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit {
  person?: Person;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const personId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.movieService.getPerson(personId).subscribe(person => {
      if (person) {
        this.person = person;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}