import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from "../model/categoria";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategorieService{
    private apiUrl = 'https://project-works-rest-api.onrender.com/api/v1/GROUP-II/category';

    constructor(private http: HttpClient) {}

    getCategorie(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiUrl);
    }

    getCategoria(id: string): Observable<Categoria> {
        return this.http.get<Categoria>(this.apiUrl + '/' + id);
    }

    addCategoria(newCategoria: Omit<Categoria, 'id'>){
        return this.http.post(this.apiUrl, newCategoria);
    }

    deleteCategoria(id: string){
        return this.http.delete(this.apiUrl + '/' + id);
    }
}