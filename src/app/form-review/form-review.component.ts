import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ReviewsService } from '../service/reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.css']
})
export class FormReviewComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    publicationDate: new FormControl(''),
    content: new FormControl(''),
    score: new FormControl(),
    reviewerName: new FormControl(''),
    imageUrls: new FormArray([new FormControl('')]),
    reviewedGame: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    })
  });

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    ) {}

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

    this.reviewsService.addReview(this.form.value);

    this.form.reset();
    this.router.navigateByUrl('/');
  }

}
