import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideogiochiComponent } from './videogiochi/videogiochi.component';
import { FormVideogiochiComponent } from './form-videogiochi/form-videogiochi.component';
import { FormCategorieComponent } from './form-categorie/form-categorie.component';
import { NuovaCategoriaComponent } from './nuova-categoria/nuova-categoria.component';
import { NuovoVideogiocoComponent } from './nuovo-videogioco/nuovo-videogioco.component';

@NgModule({
  declarations: [
    AppComponent,
    VideogiochiComponent,
    FormVideogiochiComponent,
    FormCategorieComponent,
    NuovaCategoriaComponent,
    NuovoVideogiocoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
