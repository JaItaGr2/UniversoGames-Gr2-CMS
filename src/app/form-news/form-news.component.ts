import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { news } from '../model/news';
import { newsService } from '../service/news.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.css']
})
export class FormNewsComponent implements OnInit{
  form: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    imageUrl: new FormControl('',[Validators.required]),
    content: new FormControl('',[Validators.required]),
    publicationDate: new FormControl('',[Validators.required]),
    authorName: new FormControl('',[Validators.required]),
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
        
        this.newsService.getNew(this.idnewsdamodificare).pipe(
          map((val: news)=>{
            return this.form = new FormGroup({
              title: new FormControl(val.title),
              category: new FormControl(val.category),
              imageUrl: new FormControl(val.imageUrl),
              content: new FormControl(val.content),
              publicationDate: new FormControl(val.publicationDate),
              authorName: new FormControl(val.authorName),
              tags: new FormArray(
                val.tags.map((pro)=> new FormControl(pro))
              ),
            });
          })
        ).subscribe(console.log);
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
    if(this.form.invalid){
      alert('Compilare tutti i campi!');
      return;
    }

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
}