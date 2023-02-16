import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../model/categoria';
import { CategorieService } from '../service/categorie.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-nuova-categoria',
  templateUrl: './nuova-categoria.component.html',
  styleUrls: ['./nuova-categoria.component.css']
})
export class NuovaCategoriaComponent implements OnInit{
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  isEditMode = false;
  idCategoriaDaModificare='';

  constructor(private categorieService: CategorieService, private router: Router,private route : ActivatedRoute ) {}

  ngOnInit(): void{
    this.route.params.subscribe((params) => {
      this.idCategoriaDaModificare = params['id'];
      if(this.idCategoriaDaModificare){
        this.isEditMode = true;
      this.categorieService.getCategoria(this.idCategoriaDaModificare).pipe(
      map((val: Categoria) =>{
        console.log('ok');
        console.log(val);
        return this.form = new FormGroup({
          name: new FormControl(val.name),
        }); 
      })
      ).subscribe(console.log);
      }
    });
  }



  onSubmit(){
    if (this.form.invalid){
      alert('Attenzione, compilare i campi obbligatori');
      return;
    }

    let formResponse = this.form.getRawValue();
    formResponse.__v = 0;

    if(this.isEditMode){
      formResponse._id = this.idCategoriaDaModificare;
      console.log(formResponse);
     this.categorieService.updateCategoria(formResponse).subscribe(() =>{
      this.categorieService.getCategoria(this.idCategoriaDaModificare);
     });
  } else{
    console.log(formResponse);
    this.categorieService.addCategoria(formResponse).subscribe(() =>{
      this.categorieService.getCategorie();
    });
  }

  this.form.reset();
  this.isEditMode = false;
  this.idCategoriaDaModificare = '';
  this.router.navigateByUrl('/');
}
}



