import { Component, } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-nuova-categoria',
  templateUrl: './nuova-categoria.component.html',
  styleUrls: ['./nuova-categoria.component.css']
})
export class NuovaCategoriaComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl('',
    [
      Validators.required,
      Validators.minLength(24),
    ]),
    name: new FormControl('')
  });

  constructor(private categorieService: CategorieService, private router: Router ) {}

onSubmit(){
  if (this.form.invalid){
    alert('Attenzione, compilare i campi obbligatori');
    return;
  }

  this.categorieService.addCategoria(this.form.value);

  this.form.reset();
  this.router.navigateByUrl('/');
}
}




