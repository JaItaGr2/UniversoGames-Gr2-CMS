import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { news } from '../model/news';
import { newsService } from '../service/news.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { Categoria } from '../model/categoria';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-lista-news',
  templateUrl: './lista-news.component.html',
  styleUrls: ['./lista-news.component.css']
})
export class ListaNewsComponent implements OnInit{
  dati$ !: Observable<news[]>;
  categorie = new FormControl('');
  ordinamentoControl = new FormControl('');
  categorie$!: Observable<Categoria[]>;
  keyRicerca = '';

  constructor(private newsService: newsService,
    private categorieService: CategorieService,){}

  ngOnInit(): void {
    this.dati$ = this.newsService.getNews();
    this.categorie$ = this.categorieService.getCategorie();
  }

  onClickDelete(id: string){
    this.newsService.deleteNews(id).subscribe(()=> {
      this.dati$ = this.newsService.getNews();
    })
  }

  onClickEdit(id: string) {}

  ricerca() {
    this.dati$ = this.newsService.ricercaKey(this.keyRicerca);
    if (this.categorie.value) {
      this.dati$ = this.newsService.filtraCategorie(
        this.categorie.value,
        this.dati$
      );
    }
    this.ordinaPer();
  }

  ordinaPer() {
    const ord = this.ordinamentoControl.value?.split('-');
    if (ord) {
      this.dati$ = this.dati$.pipe(
        map((data) => {
          let sortedData = data.sort((p1, p2) => {
            if (ord[0] == 'data') {
              return p1.publicationDate > p2.publicationDate
                ? 1
                : p1.publicationDate < p2.publicationDate
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