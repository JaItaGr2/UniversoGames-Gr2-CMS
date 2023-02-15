import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ReviewsService } from '../service/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../model/review';
import { map } from 'rxjs';

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
        this.reviewsService.getReview(this.idReviewDaModificare).pipe(
          map((val: Review) => {
            console.log('ok');
            console.log(val);
            return this.form = new FormGroup({
              title: new FormControl(val.title),
              publicationDate: new FormControl(val.publicationDate),
              content: new FormControl(val.content),
              score: new FormControl(val.score),
              reviewerName: new FormControl(val.reviewerName),
              imageUrls: new FormArray(
                val.imageUrls.map((step) => new FormControl(step))
              ),
              reviewedGame: new FormGroup({
                id: new FormControl(val.reviewedGame.id),
                name: new FormControl(val.reviewedGame.name),
              }),
            });
          })
        ).subscribe(console.log);
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
    if(this.form.invalid){
      alert('Compilare tutti i campi!');
      return;
    }

    let formResponse = this.form.getRawValue();
    formResponse.__v = 0;

    if (this.isEditMode) {
      formResponse._id = this.idReviewDaModificare;
      console.log(formResponse);
      this.reviewsService.updateReview(formResponse).subscribe(() => {
        this.reviewsService.getReview(this.idReviewDaModificare);
      });
    } else {
      console.log(formResponse);
      this.reviewsService.addReview(formResponse).subscribe(() => {
        this.reviewsService.getReviews();
      });
    }

    this.form.reset();
    this.isEditMode = false;
    this.idReviewDaModificare = '';
    this.router.navigateByUrl('/');
  }
}
