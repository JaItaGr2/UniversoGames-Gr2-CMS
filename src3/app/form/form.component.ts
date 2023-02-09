
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from '../model/person';
import { PersonsService } from '../service/persons.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  dati$ !: Observable<Person[]>;
  avatar = '';
  nome = '';
  dob = '';
  position = '';

  constructor(private personsService: PersonsService, private router: Router) {}

  ngOnInit(): void {
    this.dati$ = this.personsService.getPersons();
  }
  
  onClickPost(){
    const newPerson = {
      avatar: this.avatar,
      nome: this.nome,
      dataDiNascita: this.dob,
      professione: this.position
    };

    this.personsService.postPersons(newPerson).subscribe(() => {
      this.dati$ = this.personsService.getPersons();
    });

    this.router.navigateByUrl('/');
  }

}
