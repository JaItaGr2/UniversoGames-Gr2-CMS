import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VideogiochiService } from '../service/videogiochi.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuovo-videogioco',
  templateUrl: './nuovo-videogioco.component.html',
  styleUrls: ['./nuovo-videogioco.component.css']
})
export class NuovoVideogiocoComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl('',
    [
      Validators.required,
      Validators.minLength(24),
    ]),
    title: new FormControl(''),
    category: new FormControl(''),
    releaseDate: new FormControl(''),
    genre: new FormControl(''),
    softwareHouse: new FormControl(''),
    publisher: new FormControl(''),
    numberOfPlayers: new FormControl(),
    languages: new FormArray([
      new FormGroup({
        voice: new FormArray([
          new FormControl(''),
          new FormControl(''),
        ]),
        text: new FormArray([
          new FormControl(''),
          new FormControl(''),
        ]),
      })
    ])
  });

  constructor(private videogiochiService: VideogiochiService, private router: Router ) {}

  get voiceFormArray() : FormArray{
    return this.form.get('voice') as FormArray;
  }

  get textFormArray() : FormArray{
    return this.form.get('text') as FormArray;
  }

  onAddVoice(){
    this.voiceFormArray.push(
      new FormControl(''),
    );
  }
  onRemoveVoice(index: number){
    this.voiceFormArray.removeAt(index);
  }

  onAddText(){
    this.textFormArray.push(
      new FormControl(''),
    );
  }

  onRemoveText(index: number){
    this.textFormArray.removeAt(index);
  }

  onSubmit(){
    if (this.form.invalid){
      alert('Attenzione, compilare i campi obbligatori');
      return;
    }
  
    this.videogiochiService.addVideogioco(this.form.value);
  
    this.form.reset();
    this.router.navigateByUrl('/');
  }




}
