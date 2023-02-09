import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCategorieComponent } from './lista-categorie/lista-categorie.component';
import { ListaVideogiochiComponent } from './lista-videogiochi/lista-videogiochi.component';
import { NuovaCategoriaComponent } from './nuova-categoria/nuova-categoria.component';
import { NuovoVideogiocoComponent } from './nuovo-videogioco/nuovo-videogioco.component';

const routes: Routes = 
[
  {
    path:'nuova-categoria',
    component: NuovaCategoriaComponent,
  },
  {
    path:'nuovo-videogioco',
    component: NuovoVideogiocoComponent,
  },
  {
    path:'lista-videogiochi',
    component: ListaVideogiochiComponent,
  },
  {
    path:'lista-categorie',
    component: ListaCategorieComponent,
  },
  {
    path:'lista-videogiochi/:id',
    component: ListaVideogiochiComponent,
  },
  {
    path:'lista-categorie/:id',
    component: ListaCategorieComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
