import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';
import { CategorieService } from '../service/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-categorie',
  templateUrl: './lista-categorie.component.html',
  styleUrls: ['./lista-categorie.component.css']
})
export class ListaCategorieComponent implements OnInit{

  categorie$!: Observable<Categoria[]>;

  constructor(private categorieService: CategorieService,private router: Router, ){}

  ngOnInit(): void {
    this.categorie$ = this.categorieService.getCategorie();
  }

  onClickDelete(_id: string){
    console.log('Elimina elemento');
    this.categorieService.deleteCategoria(_id).subscribe(() =>{
      this.categorie$ = this.categorieService.getCategorie();
    });
    console.log('Done Component');
  }



}
