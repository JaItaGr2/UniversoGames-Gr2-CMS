import { Injectable } from '@angular/core';
import { NewReview, Review } from '../model/review';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl = 'https://project-works-rest-api.onrender.com/api/v1/GROUP-II/review';

  reviews$!: Observable<Review[]>;

  constructor(private http: HttpClient) {}

  getReviews() {
    this.reviews$ = this.http.get<Review[]>(this.apiUrl);
    return this.reviews$;
  }

  getReview(id: string) {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  addReview(newReview: NewReview) {
    return this.http.post(this.apiUrl, newReview);
  }

  updateReview(review: Review) {
    return this.http.put(`${this.apiUrl}/${review._id}`, review);
  }

  deleteReview(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  ricercaKey(keyword: string) {
    keyword = keyword.toLowerCase().trim();
    const newsTrovate = this.reviews$.pipe(
      map((data) => {
        return data.filter((v: Review) => {
          return (
            v.title.toLowerCase().includes(keyword) ||
            v.publicationDate.toLowerCase().includes(keyword) ||
            v.content.toLowerCase().includes(keyword) ||
            v.reviewerName.toLowerCase().includes(keyword) ||
            v.reviewedGame.name.toLowerCase().includes(keyword)
          );
        });
      })
    );
    return newsTrovate;
  }

  filtraTitolo(
    categorieSelezionate: string[] | string,
    rev$: Observable<Review[]>
  ) {
    const reviewTrovate = rev$.pipe(
      map((data) => {
        return data.filter((r: Review) => {
          let trovato = false;
          if (typeof categorieSelezionate != 'string') {
            categorieSelezionate.forEach((element) => {
              if (r.title.toLowerCase().includes(element.toLowerCase())) {
                trovato = true;
              }
            });
          }
          return trovato;
        });
      })
    );

    let vuoto = false;
    reviewTrovate
      .pipe(
        map((data) => {
          if (data.length < 1) {
            vuoto = true;
          }
        })
      )
      .subscribe();

    if (vuoto) {
      return rev$;
    }
    return reviewTrovate;
  }

}
