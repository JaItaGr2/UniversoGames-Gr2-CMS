import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';
import { PersonsService } from '../service/persons.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  dati$ !: Observable<Person[]>;

  constructor(private personsService: PersonsService) {}

  ngOnInit(): void {
    this.dati$ = this.personsService.getPersons();
  }

  onClickDelete(id: number) {
    this.personsService.deletePerson(id).subscribe(() => {
      this.dati$ = this.personsService.getPersons();
    });
  }

  onClickEdit(id: number) {
    
  }

}
