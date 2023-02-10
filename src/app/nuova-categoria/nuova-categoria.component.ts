import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-nuova-categoria',
  templateUrl: './nuova-categoria.component.html',
  styleUrls: ['./nuova-categoria.component.css']
})
export class NuovaCategoriaComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });

  isEditMode = false;
  idCategoriaDaModificare='';

  constructor(private categorieService: CategorieService, private router: Router,private route : ActivatedRoute ) {}

  ngOnInit(): void{
    this.route.params.subscribe((params) => {
      this.idCategoriaDaModificare = params['id'];
      if(this.idCategoriaDaModificare){
        this.isEditMode = true;
        const categoriaDaModificare = this.categorieService.getCategoria(
          this.idCategoriaDaModificare
        );
      
      if(categoriaDaModificare){
        this.form = new FormGroup({
          id: new FormControl(''),
          name: new FormControl('')
        });
      }
      }
    });
  }



  onSubmit(){
    if (this.form.invalid){
      alert('Attenzione, compilare i campi obbligatori');
      return;
    }

    if(this.isEditMode){
      this.categorieService.updateCategoria(this.form.value);
    } else {
      this.categorieService.addCategoria(this.form.value);
    }

  console.log(this.form.value);

  this.form.reset();
  this.isEditMode = false;
  this.idCategoriaDaModificare = '';
  this.router.navigateByUrl('/');
}
}




