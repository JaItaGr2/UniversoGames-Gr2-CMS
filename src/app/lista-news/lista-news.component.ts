import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { news } from '../model/news';
import { newsService } from '../service/news.service';

@Component({
  selector: 'app-lista-news',
  templateUrl: './lista-news.component.html',
  styleUrls: ['./lista-news.component.css']
})
export class ListaNewsComponent implements OnInit{
  dati$ !: Observable<news[]>;

  constructor(private newsService: newsService){}

  ngOnInit(): void {
    this.dati$ = this.newsService.getNews();
  }

  onClickDelete(id: string){
    this.newsService.deleteNews(id).subscribe(()=> {
      this.dati$ = this.newsService.getNews();
    })
  }

  onClickEdit(id: string) {}
}