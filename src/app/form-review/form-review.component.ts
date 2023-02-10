import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ReviewsService } from '../service/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../model/review';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.css'],
})
export class FormReviewComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    publicationDate: new FormControl(''),
    content: new FormControl(''),
    score: new FormControl(undefined),
    reviewerName: new FormControl(''),
    imageUrls: new FormArray([new FormControl('')]),
    reviewedGame: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
  });

  isEditMode = false;
  idReviewDaModificare = '';

  scoreRating?: number;

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idReviewDaModificare = params['id'];
      if (this.idReviewDaModificare) {
        this.isEditMode = true;
        const reviewDaModificare = this.reviewsService.getReview(
          this.idReviewDaModificare
        );

        if (reviewDaModificare) {
          this.form = new FormGroup({
            title: new FormControl(''),
            publicationDate: new FormControl(''),
            content: new FormControl(''),
            score: new FormControl(undefined),
            reviewerName: new FormControl(''),
            imageUrls: new FormArray([new FormControl('')]),
            reviewedGame: new FormGroup({
              id: new FormControl(''),
              name: new FormControl(''),
            }),
          });
        }
      }
    });
  }

  get imageUrlsFormArray(): FormArray {
    return this.form.get('imageUrls') as FormArray;
  }

  onAddImageUrls() {
    this.imageUrlsFormArray.push(new FormControl(''));
  }

  onRemoveImageUrls(index: number) {
    this.imageUrlsFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Attenzione, compilare i campi obbligatori!');
      return;
    }

    if (this.isEditMode) {
      this.reviewsService.updateReview(this.form.value);
    } else {
      this.reviewsService.addReview(this.form.value);
    }

    this.form.reset();
    this.isEditMode = false;
    this.idReviewDaModificare = '';
    this.router.navigateByUrl('/');
  }
}
