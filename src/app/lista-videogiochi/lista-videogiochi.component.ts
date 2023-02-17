import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Videogioco } from '../model/videogioco';
import { VideogiochiService } from '../service/videogiochi.service';
import { map } from 'rxjs';
import { CategorieService } from '../service/categorie.service';
import { Categoria } from '../model/categoria';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-lista-videogiochi',
  templateUrl: './lista-videogiochi.component.html',
  styleUrls: ['./lista-videogiochi.component.css'],
})
export class ListaVideogiochiComponent implements OnInit {
  keyRicerca = '';
  videogiochi$!: Observable<Videogioco[]>;
  categorie$!: Observable<Categoria[]>;
  categorie = new FormControl('');
  ordinamentoControl = new FormControl('');  //'data-decrescente'
  idDaEliminare = '';

  constructor(
    private videogiochiService: VideogiochiService,
    private categorieService: CategorieService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.videogiochi$ = this.videogiochiService.getVideogiochi();
    this.categorie$ = this.categorieService.getCategorie();
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

  updateVideogiochi() {
    this.videogiochi$ = this.videogiochiService.getVideogiochi();
    this.categorie$ = this.categorieService.getCategorie();
    this.ricerca();
  }

  onClickDelete() {
    if (this.idDaEliminare) {
      this.videogiochiService.deleteVideogioco(this.idDaEliminare).subscribe(() => {
        this.videogiochi$ = this.videogiochiService.getVideogiochi();
      });
      this.aggiornaLista();
    }
  }

  aggiornaLista() {
    this.videogiochi$ = this.videogiochiService.getVideogiochi();
    this.ricerca();
  }

  ricerca() {
    this.videogiochi$ = this.videogiochiService.ricercaKey(this.keyRicerca);
    if (this.categorie.value) {
      this.videogiochi$ = this.videogiochiService.filtraCategorie(
        this.categorie.value,
        this.videogiochi$
      );
    }
    this.ordinaPer();
  }

  ordinaPer() {
    const ord = this.ordinamentoControl.value?.split('-');
    if (ord) {
      this.videogiochi$ = this.videogiochi$.pipe(
        map((data) => {
          let sortedData = data.sort((p1, p2) => {
            if (ord[0] == 'data') {
              return p1.releaseDate > p2.releaseDate
                ? 1
                : p1.releaseDate < p2.releaseDate
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
