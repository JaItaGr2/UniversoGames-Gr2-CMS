import { Injectable } from '@angular/core';
import { Videogioco } from '../model/videogioco';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VideogiochiService {
  private apiUrl =
    'https://project-works-rest-api.onrender.com/api/v1/GROUP-II/videogame';

  videogiochi$!: Observable<Videogioco[]>;

  constructor(private http: HttpClient) {}

  getVideogiochi() {
    this.videogiochi$ = this.http.get<Videogioco[]>(this.apiUrl);
    return this.videogiochi$;
  }

  getVideogioco(id: string) {
    return this.http.get<Videogioco>(`${this.apiUrl}/${id}`);
  }

  addVideogioco(newVideogioco: Omit<Videogioco, 'id'>) {
    return this.http.post(this.apiUrl, newVideogioco);
  }

  deleteVideogioco(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateVideogioco(videogioco: Videogioco) {
    return this.http.put(`${this.apiUrl}/${videogioco._id}`, videogioco);
  }

  ricercaKey(keyword: string) {
    keyword = keyword.toLowerCase().trim();
    const videogiochiTrovati = this.videogiochi$.pipe(
      map((data) => {
        return data.filter((v: Videogioco) => {
          return (
            v.title.toLowerCase().includes(keyword) ||
            v.category.toLowerCase().includes(keyword) ||
            v.releaseDate.toLowerCase().includes(keyword) ||
            v.genre.toLowerCase().includes(keyword) ||
            v.softwareHouse.toLowerCase().includes(keyword) ||
            v.publisher.toLowerCase().includes(keyword)
          );
        });
      })
    );
    return videogiochiTrovati;
  }

  filtraCategorie(
    categorieSelezionate: string[] | string,
    vids$: Observable<Videogioco[]>
  ) {
    const videogiochiTrovati = vids$.pipe(
      map((data) => {
        return data.filter((v: Videogioco) => {
          let trovato = false;
          if (typeof categorieSelezionate != 'string') {
            categorieSelezionate.forEach((element) => {
              if (v.category.toLowerCase().includes(element.toLowerCase())) {
                trovato = true;
              }
            });
          }
          return trovato;
        });
      })
    );

    let vuoto = false;
    videogiochiTrovati
      .pipe(
        map((data) => {
          if (data.length < 1) {
            vuoto = true;
          }
        })
      )
      .subscribe();

    if (vuoto) {
      return vids$;
    }
    return videogiochiTrovati;
  }
}
