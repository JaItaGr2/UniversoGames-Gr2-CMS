import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Categoria } from '../service/categorie.service';
@Component({
  selector: 'app-nuova-categoria',
  templateUrl: './nuova-categoria.component.html',
  styleUrls: ['./nuova-categoria.component.css']
})
export class NuovaCategoriaComponent implements OnInit {
  form: FormGroup = new FormControl({
    id: new FormControl('',
    [
      Validators.required,
      Validators.minLength(24),
    ]),
    name: new FormControl('')
  });

}
