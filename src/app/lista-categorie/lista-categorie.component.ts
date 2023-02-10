import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-lista-categorie',
  templateUrl: './lista-categorie.component.html',
  styleUrls: ['./lista-categorie.component.css']
})
export class ListaCategorieComponent implements OnInit{

  categorie$!: Observable<Categoria[]>;

  constructor(private categorieService: CategorieService){}

  ngOnInit(): void {
    this.categorie$ = this.categorieService.getCategorie();
  }

  onClickDelete(_id: string){
    this.categorieService.deleteCategoria(_id).subscribe(() =>{
      this.categorie$ = this.categorieService.getCategorie();
    })
  }

  onClickEdit(id:string){}

}
