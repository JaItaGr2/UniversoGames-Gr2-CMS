import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VideogiochiService } from '../service/videogiochi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Videogioco } from '../model/videogioco';
import { map } from 'rxjs';

@Component({
  selector: 'app-nuovo-videogioco',
  templateUrl: './nuovo-videogioco.component.html',
  styleUrls: ['./nuovo-videogioco.component.css'],
})
export class NuovoVideogiocoComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    releaseDate: new FormControl(''),
    genre: new FormControl(''),
    softwareHouse: new FormControl(''),
    publisher: new FormControl(''),
    numberOfPlayers: new FormControl(),
    languages: new FormGroup({
      voice: new FormArray([new FormControl('')]),
      text: new FormArray([new FormControl('')]),
    }),
    coverImage: new FormControl(''),
  });

  isEditMode = false;

  idVideogiocoDaModificare = '';

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
              console.log('ok');
              console.log(val);
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
          .subscribe(console.log);
      }
    });
  }

  get languagesFormGroup(): FormGroup {
    return this.form.get('languages') as FormGroup;
  }

  get voiceFormArray(): FormArray {
    return this.form.get('languages.voice') as FormArray;
  }

  get textFormArray(): FormArray {
    return this.form.get('languages.text') as FormArray;
  }

  onAddVoice() {
    this.voiceFormArray.push(new FormControl(''));
  }

  onRemoveVoice(index: number) {
    this.voiceFormArray.removeAt(index);
  }

  onAddText() {
    this.textFormArray.push(new FormControl(''));
  }

  onRemoveText(index: number) {
    this.textFormArray.removeAt(index);
  }

  onSubmit() {

    console.log(this.form.getRawValue);

    if (this.form.invalid) {
      alert('Attenzione, compilare i campi obbligatori');
      return;
    }

    let formResponse = this.form.getRawValue();
    formResponse.__v = 0;
    formResponse._id = '';

    if (this.isEditMode) {
      formResponse._id = this.idVideogiocoDaModificare;
      console.log(formResponse);
      this.videogiochiService.updateVideogioco(formResponse).subscribe(() => {
        this.videogiochiService.getVideogioco(this.idVideogiocoDaModificare);
      });
    } else {
      console.log(formResponse);
      this.videogiochiService.addVideogioco(formResponse).subscribe(() => {
        this.videogiochiService.getVideogiochi();
      });
    }

    this.form.reset();
    this.isEditMode = false;
    this.idVideogiocoDaModificare = '';
    this.router.navigateByUrl('/');
    }
}
