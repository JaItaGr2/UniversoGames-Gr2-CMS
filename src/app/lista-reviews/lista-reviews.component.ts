import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review';
import { ReviewsService } from '../service/reviews.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-reviews',
  templateUrl: './lista-reviews.component.html',
  styleUrls: ['./lista-reviews.component.css']
})
export class ListaReviewsComponent implements OnInit {
  listaReview$!: Observable<Review[]>;
  ordinamentoControl = new FormControl('');
  keyRicerca = '';
  titolo = new FormControl('');

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listaReview$ = this.reviewsService.getReviews();
  }

  onDelete(id: string) {
    console.log('Elimina elemento');
    this.reviewsService.deleteReview(id).subscribe(() => {
      this.listaReview$ = this.reviewsService.getReviews();
    });
    console.log('Done Component');
  }

  //ricerca(keyword: string) {
  //  this.listaReview$ = this.reviewsService.ricercaKey(keyword);
  //  if (this.titolo.value) {
  //    this.listaReview$ = this.reviewsService.filtraTitolo(
  //      this.titolo.value,
  //     this.listaReview$
  //    );
  //  }
  //  this.ordinaPer();
  //}

  ordinaPer() {
    const ord = this.ordinamentoControl.value?.split('-');
    if (ord) {
      this.listaReview$ = this.listaReview$.pipe(
        map((data) => {
          let sortedData = data.sort((p1, p2) => {
            if (ord[0] == 'data') {
              return p1.score > p2.score
                ? 1
                : p1.score < p2.score
                ? -1
                : 0;
            } else {
              //if (key == 'title') {
              return p1.title > p2.title ? 1 : p1.title < p2.title ? -1 : 0;
            }
          });

          if (ord[1] != 'crescente') {
            sortedData = sortedData.reverse();
          }
          return sortedData;
        })
      );
    }
  }

}
