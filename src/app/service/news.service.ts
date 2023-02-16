import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { news } from "src/app/model/news";
import { Observable, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class newsService{
    private apiUrl = 'https://project-works-rest-api.onrender.com/api/v1/GROUP-II/news';

    news$!: Observable<news[]>;

    constructor(private http: HttpClient) {}

    getNews() {
        this.news$=this.http.get<news[]>(this.apiUrl);

        return this.news$;
    }

    getNew(id: string){
        return this.http.get<news>(`${this.apiUrl}/${id}`);
    }

    addNews(newNews: Omit<news, '_id'>) {
        return this.http.post(this.apiUrl, newNews);
    }

    deleteNews(id: string) {
        return this.http.delete(this.apiUrl + '/' + id);
    }

    editNews(editNews: news) {
        return this.http.put(`${this.apiUrl}/${editNews._id}`, editNews);
    }

    ricercaKey(keyword: string) {
        console.log(keyword);
        keyword = keyword.toLowerCase().trim();
        const newsTrovate = this.news$.pipe(
          map((data) => {
            return data.filter((v: news) => {
              return (
                v.title.toLowerCase().includes(keyword) ||
                v.category.toLowerCase().includes(keyword) ||
                v.imageUrl.toLowerCase().includes(keyword) ||
                v.content.toLowerCase().includes(keyword) ||
                v.publicationDate.toLowerCase().includes(keyword) ||
                v.authorName.toLowerCase().includes(keyword)
              );
            });
          })
        );
        return newsTrovate;
      }
    
      filtraCategorie(
        categorieSelezionate: string[] | string,
        vids$: Observable<news[]>
      ) {
        const newsTrovate = vids$.pipe(
          map((data) => {
            return data.filter((v: news) => {
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
        newsTrovate
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
        return newsTrovate;
      }
    
}