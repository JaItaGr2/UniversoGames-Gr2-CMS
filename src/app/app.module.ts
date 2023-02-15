import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { FormNewsComponent } from './form-news/form-news.component';
import { NuovaCategoriaComponent } from './nuova-categoria/nuova-categoria.component';
import { NuovoVideogiocoComponent } from './nuovo-videogioco/nuovo-videogioco.component';
import { ListaNewsComponent } from './lista-news/lista-news.component';
import { ListaVideogiochiComponent } from './lista-videogiochi/lista-videogiochi.component';
import { ListaCategorieComponent } from './lista-categorie/lista-categorie.component';
import { HeaderComponent } from './header/header.component';
import { ListaReviewsComponent } from './lista-reviews/lista-reviews.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NuovaCategoriaComponent,
    NuovoVideogiocoComponent,
    FormReviewComponent,
    FormNewsComponent,
    ListaNewsComponent,
    ListaVideogiochiComponent,
    ListaCategorieComponent,
    HeaderComponent,
    ListaReviewsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
