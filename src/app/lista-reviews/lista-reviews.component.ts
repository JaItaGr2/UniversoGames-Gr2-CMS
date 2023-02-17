import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review';
import { ReviewsService } from '../service/reviews.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

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
  idDaEliminare = '';

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.listaReview$ = this.reviewsService.getReviews();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.onDelete();
      }
      this.idDaEliminare = '';
    }); 
  }

  updateReviews() {
    this.listaReview$ = this.reviewsService.getReviews();
    this.ricerca();
  }

  onDelete() {
    this.reviewsService.deleteReview(this.idDaEliminare).subscribe(() => {
      this.listaReview$ = this.reviewsService.getReviews();
    });
  }

  ricerca() {
    this.listaReview$ = this.reviewsService.ricercaKey(this.keyRicerca);
    if (this.titolo.value) {
      this.listaReview$ = this.reviewsService.filtraTitolo(
        this.titolo.value,
       this.listaReview$
      );
    }
   this.ordinaPer();
  }

  ordinaPer() {
    const ord = this.ordinamentoControl.value?.split('-');
    if (ord) {
      this.listaReview$ = this.listaReview$.pipe(
        map((data) => {
          let sortedData = data.sort((p1, p2) => {
            if (ord[0] == 'voto') {
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
