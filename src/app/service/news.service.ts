import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { news } from "src/app/model/news";

@Injectable({providedIn: 'root'})
export class newsService{
    private apiUrl = 'https://project-works-rest-api.onrender.com/api/v1/GROUP-II/news';

    constructor(private http: HttpClient) {}

    getNews() {
        return this.http.get<news[]>(this.apiUrl);
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
        return this.http.put(this.apiUrl, editNews);
    }
}