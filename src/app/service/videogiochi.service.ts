import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Videogioco } from "../model/videogioco";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategorieService{
    private apiUrl = 'https://project-works-rest-api.onrender.com/api/v1/GROUP-II/videogames';

    constructor(private http: HttpClient) {}

    getVideogiochi(): Observable<Videogioco[]> {
        return this.http.get<Videogioco[]>(this.apiUrl);
    }

    getVideogioco(id: string): Observable<Videogioco> {
        return this.http.get<Videogioco>(this.apiUrl + '/' + id);
    }

    addVideogioco(newVideogioco: Omit<Videogioco, 'id'>){
        return this.http.post(this.apiUrl, newVideogioco);
    }

    deleteVideogioco(id: string){
        return this.http.delete(this.apiUrl + '/' + id);
    }
}