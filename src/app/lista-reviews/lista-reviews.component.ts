import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review';
import { ReviewsService } from '../service/reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-reviews',
  templateUrl: './lista-reviews.component.html',
  styleUrls: ['./lista-reviews.component.css']
})
export class ListaReviewsComponent implements OnInit {
  listaReview$!: Observable<Review[]>;

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.listaReview$ = this.reviewsService.getReviews();
  }

  onDelete(id: string) {
    console.log('Elimina elemento');
  }
}
