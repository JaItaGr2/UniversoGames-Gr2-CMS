import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';
import { CategorieService } from '../service/categorie.service';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-categorie',
  templateUrl: './lista-categorie.component.html',
  styleUrls: ['./lista-categorie.component.css'],
})
export class ListaCategorieComponent implements OnInit {
  categorie$!: Observable<Categoria[]>;
  idDaEliminare = '';

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categorie$ = this.categorieService.getCategorie();
  }

  updateReview() {
    this.categorie$ = this.categorieService.getCategorie();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog
      .open(DialogDeleteComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.onClickDelete();
        }
        this.idDaEliminare = '';
      });
  }

  updateCategorie() {
    this.categorie$ = this.categorieService.getCategorie();
  }

  onClickDelete() {
    this.categorieService.deleteCategoria(this.idDaEliminare).subscribe(() => {
      this.categorie$ = this.categorieService.getCategorie();
    });
  }
}
