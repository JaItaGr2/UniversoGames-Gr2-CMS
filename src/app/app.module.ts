import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormNewsComponent } from './form-news/form-news.component';
import { NuovaCategoriaComponent } from './nuova-categoria/nuova-categoria.component';
import { NuovoVideogiocoComponent } from './nuovo-videogioco/nuovo-videogioco.component';
import { ListaVideogiochiComponent } from './lista-videogiochi/lista-videogiochi.component';
import { ListaCategorieComponent } from './lista-categorie/lista-categorie.component';


@NgModule({
  declarations: [
    AppComponent,
    NuovaCategoriaComponent,
    NuovoVideogiocoComponent,
    FormReviewComponent,
    FormNewsComponent,
    ListaVideogiochiComponent,
    ListaCategorieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
