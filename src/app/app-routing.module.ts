import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNewsComponent } from './form-news/form-news.component';
import { ListaNewsComponent } from './lista-news/lista-news.component';
import { ListaCategorieComponent } from './lista-categorie/lista-categorie.component';
import { ListaVideogiochiComponent } from './lista-videogiochi/lista-videogiochi.component';
import { NuovaCategoriaComponent } from './nuova-categoria/nuova-categoria.component';
import { NuovoVideogiocoComponent } from './nuovo-videogioco/nuovo-videogioco.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { ListaReviewsComponent } from './lista-reviews/lista-reviews.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = 
[
  {
    path: '',
    component: ListaNewsComponent,
  },
  {
    path:'nuova-categoria',
    component: NuovaCategoriaComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'nuovo-videogioco',
    component: NuovoVideogiocoComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'nuova-categoria/:id',
    component: NuovaCategoriaComponent,
  },
  {
    path:'nuovo-videogioco/:id',
    component: NuovoVideogiocoComponent,
  },
  {
    path: 'form-news',
    component: FormNewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'form-news/:id',
    component: FormNewsComponent,
  },
  {
    path: 'form-review',
    component: FormReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'form-review/:id',
    component: FormReviewComponent,
    canActivate: [AuthGuard],
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
    path:'lista-news',
    component: ListaNewsComponent,
  },
  {
    path:'lista-reviews',
    component: ListaReviewsComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
