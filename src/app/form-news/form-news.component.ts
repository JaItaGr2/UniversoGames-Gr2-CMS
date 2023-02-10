import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { newsService } from '../service/news.service';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.css']
})
export class FormNewsComponent implements OnInit{
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    imageUrl: new FormControl(''),
    content: new FormControl(''),
    publicationDate: new FormControl(''),
    authorName: new FormControl(''),
    tags: new FormArray([new FormControl('')]),
  });

  editmode = false;
  idnewsdamodificare = '';

  constructor(
    private newsService: newsService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idnewsdamodificare = params['id'];
      
      if(this.idnewsdamodificare){
        this.editmode = true;
        const newsdamodificare = this.newsService.getNew(this.idnewsdamodificare);

        if(newsdamodificare){
          this.form = new FormGroup({
            title: new FormControl(''),
            category: new FormControl(''),
            imageUrl: new FormControl(''),
            content: new FormControl(''),
            publicationDate: new FormControl(''),
            authorName: new FormControl(''),
            tags: new FormArray([new FormControl('')]),
          });
        }
      }
    });
  }

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
    let formResponse = this.form.getRawValue();
    formResponse.__v = 0;

    if(this.editmode){
      formResponse._id = this.idnewsdamodificare;
      this.newsService.editNews(formResponse).subscribe(()=> {
        this.newsService.getNew(this.idnewsdamodificare);
      });
    }
    else{
      this.newsService.addNews(formResponse).subscribe(()=> {
        this.newsService.getNews();
      });
    }

    this.form.reset();
    this.editmode = false;
    this.idnewsdamodificare = '';
    this.router.navigateByUrl('/');
  }

  objectForm(){}
}