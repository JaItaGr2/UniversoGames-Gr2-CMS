import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { news } from '../model/news';
import { newsService } from '../service/news.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { Categoria } from '../model/categoria';
import { CategorieService } from '../service/categorie.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-news',
  templateUrl: './lista-news.component.html',
  styleUrls: ['./lista-news.component.css'],
})
export class ListaNewsComponent implements OnInit {
  dati$!: Observable<news[]>;
  categorie = new FormControl('');
  ordinamentoControl = new FormControl('');
  categorie$!: Observable<Categoria[]>;
  keyRicerca = '';
  idDaEliminare = '';

  constructor(
    private newsService: newsService,
    private categorieService: CategorieService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dati$ = this.newsService.getNews();
    this.categorie$ = this.categorieService.getCategorie();
    this.ricerca();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.onClickDelete();
      }
      this.idDaEliminare = '';
    }); 
  }

  onClickDelete() {
    this.newsService.deleteNews(this.idDaEliminare).subscribe(() => {
      this.dati$ = this.newsService.getNews();
    });
  }

  updateNews() {
    this.dati$ = this.newsService.getNews();
    this.categorie$ = this.categorieService.getCategorie();
    this.ricerca();
  }

  ricerca() {
    this.dati$ = this.newsService.ricercaKey(this.keyRicerca);
    if (this.categorie) {
      if (typeof this.categorie.value != 'string' && this.categorie.getRawValue()!.length != 0) {
        this.dati$ = this.newsService.filtraCategorie(
          this.categorie.getRawValue()!,
          this.dati$
        );
      }
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
