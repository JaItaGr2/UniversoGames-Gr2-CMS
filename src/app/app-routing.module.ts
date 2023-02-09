import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNewsComponent } from './form-news/form-news.component';
import { ListaNewsComponent } from './lista-news/lista-news.component';

const routes: Routes = [
  {
    path: '',
    component: ListaNewsComponent,
  },
  {
    path: 'form-news/:id',
    component: FormNewsComponent,
  },
  {
    path: 'new-news',
    component: FormNewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
