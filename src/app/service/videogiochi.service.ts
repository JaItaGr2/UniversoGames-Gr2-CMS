import { Injectable } from '@angular/core';
import { Videogioco } from "../model/videogioco";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VideogiochiService{
    private apiUrl = 'https://project-works-rest-api.onrender.com/api/v1/GROUP-II/videogame';

    constructor(private http: HttpClient) {}

    getVideogiochi(){
        return this.http.get<Videogioco[]>(this.apiUrl);
    }

    getVideogioco(id: string){
        return this.http.get<Videogioco>(this.apiUrl + '/' + id);
    }

    addVideogioco(newVideogioco: Omit<Videogioco, 'id'>){
        return this.http.post(this.apiUrl, newVideogioco);
    }

    deleteVideogioco(id: string){
        return this.http.delete(this.apiUrl + '/' + id);
    }

    updateVideogioco(videogioco: Videogioco){
        return this.http.put(this.apiUrl, videogioco);
    }
}