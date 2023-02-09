import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { newsService } from '../service/news.service';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.css']
})
export class FormNewsComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    imageUrl: new FormControl(''),
    content: new FormControl(''),
    publicationDate: new FormControl(''),
    authorName: new FormControl(''),
    tags: new FormArray([new FormControl('')]),
  });

  constructor(
    private newsService: newsService,
    private router: Router,
  ){}

  get tagsFormArray(): FormArray{
    return this.form.get('tags') as FormArray;
  }

  onAddTags(){
    this.tagsFormArray.push(new FormControl());
  }

  onDeleteTags(index: number){
    this.tagsFormArray.removeAt(index);
  }

  onSubmit(){
    if(this.form.invalid) alert('Compilare tutti i campi!');

    this.newsService.addNews(this.form.value);

    this.form.reset();
    this.router.navigateByUrl('/');
  }
}
