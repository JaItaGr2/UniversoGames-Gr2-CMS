import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Person } from "../model/person";

@Injectable ({providedIn: 'root'})
export class PersonsService {

    private apiUrl = 'https://63da4b152af48a60a7c9f77a.mockapi.io/api/v1/people';

    constructor(private http: HttpClient) {}

    getPersons() {
        return this.http.get<Person[]>(this.apiUrl);
    }

    postPersons(newPerson: Omit<Person, 'id'>) {
        return this.http.post(this.apiUrl, newPerson);
    }

    deletePerson(id: number) {
        return this.http.delete(this.apiUrl + '/' + id);
    }

    editPerson(id: number, editPerson: Person) {
        return this.http.put(this.apiUrl, editPerson);
    }
}