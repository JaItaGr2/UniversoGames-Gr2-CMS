import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VideogiochiService } from '../service/videogiochi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Videogioco } from '../model/videogioco';
import { map } from 'rxjs';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-nuovo-videogioco',
  templateUrl: './nuovo-videogioco.component.html',
  styleUrls: ['./nuovo-videogioco.component.css'],
})
export class NuovoVideogiocoComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    softwareHouse: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    numberOfPlayers: new FormControl(undefined, [Validators.required]),
    languages: new FormGroup({
      voice: new FormArray([]),
      text: new FormArray([]),
    }),
    coverImage: new FormControl('', [Validators.required]),
  });

  isEditMode = false;

  idVideogiocoDaModificare = '';

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  voiceCtrl = new FormControl('');
  textCtrl = new FormControl('');
  selectedPath = '';

  constructor(
    private videogiochiService: VideogiochiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idVideogiocoDaModificare = params['id'];
      if (this.idVideogiocoDaModificare) {
        this.isEditMode = true;
        this.videogiochiService
          .getVideogioco(this.idVideogiocoDaModificare)
          .pipe(
            map((val: Videogioco) => {
              return (this.form = new FormGroup({
                title: new FormControl(val.title),
                category: new FormControl(val.category),
                releaseDate: new FormControl(val.releaseDate),
                genre: new FormControl(val.genre),
                softwareHouse: new FormControl(val.softwareHouse),
                publisher: new FormControl(val.publisher),
                numberOfPlayers: new FormControl(val.numberOfPlayers),
                languages: new FormGroup({
                  voice: new FormArray(
                    val.languages.voice.map((step) => new FormControl(step))
                  ),
                  text: new FormArray(
                    val.languages.text.map((step) => new FormControl(step))
                  ),
                }),
                coverImage: new FormControl(val.coverImage),
              }));
            })
          )
          .subscribe();
      }
    });
  }

  // get languagesFormGroup(): FormGroup {
  //   return this.form.get('languages') as FormGroup;
  // }

  get voiceFormArray(): FormArray {
    return this.form.get('languages.voice') as FormArray;
  }

  get textFormArray(): FormArray {
    return this.form.get('languages.text') as FormArray;
  }

  // onAddVoice() {
  //   this.voiceFormArray.push(new FormControl(''));
  // }

  // onRemoveVoice(index: number) {
  //   this.voiceFormArray.removeAt(index);
  // }

  // onAddText() {
  //   this.textFormArray.push(new FormControl(''));
  // }

  // onRemoveText(index: number) {
  //   this.textFormArray.removeAt(index);
  // }


  //chips
  remove(index: number): void {
    this.voiceFormArray.removeAt(index);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value && typeof value == 'string') {
      this.voiceFormArray.push(new FormControl(value));
    }
    // Clear the input value
    event.chipInput!.clear();
    this.voiceCtrl.setValue(null);
  }

  removet(index: number): void {
    this.textFormArray.removeAt(index);
  }

  addt(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value && typeof value == 'string') {
      this.textFormArray.push(new FormControl(value));
    }
    // Clear the input value
    event.chipInput!.clear();
    this.textCtrl.setValue(null);
  }


  onSubmit() {

    console.log(this.form.getRawValue);

    if (this.form.invalid) {
      alert('Attenzione, compilare i campi obbligatori');
      return;
    }

    let formResponse = this.form.getRawValue();
    formResponse.__v = 0;
    console.log(formResponse);
    if (this.isEditMode) {
      formResponse._id = this.idVideogiocoDaModificare;
      this.videogiochiService.updateVideogioco(formResponse).subscribe(() => {
        this.videogiochiService.getVideogioco(this.idVideogiocoDaModificare);
      });
    } else {
      this.videogiochiService.addVideogioco(formResponse).subscribe(() => {
        this.videogiochiService.getVideogiochi();
      });
    }

    this.form.reset();
    this.isEditMode = false;
    this.idVideogiocoDaModificare = '';
    this.router.navigateByUrl('/lista-videogiochi');
    }
}
