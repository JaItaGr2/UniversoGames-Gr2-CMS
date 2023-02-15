import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Videogioco } from '../model/videogioco';
import { VideogiochiService } from '../service/videogiochi.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-lista-videogiochi',
  templateUrl: './lista-videogiochi.component.html',
  styleUrls: ['./lista-videogiochi.component.css']
})
export class ListaVideogiochiComponent implements OnInit{

  keyRicerca = '';

  videogiochi$!: Observable<Videogioco[]>;

  videogiochi!: Videogioco[];

  constructor(private videogiochiService: VideogiochiService, private router: Router,){}

  ngOnInit(): void {
    this.videogiochi$ = this.videogiochiService.getVideogiochi()//.pipe(
      //map((val: Videogioco[]) =>{
        //val.forEach(element => {
      //    this.videogiochi.push(element);          
      //  });
      //return val;
      //})
    //);
  }

  onClickDelete(id: string){
    console.log('Elimina elemento');
    this.videogiochiService.deleteVideogioco(id).subscribe(() =>{
      this.videogiochi$ = this.videogiochiService.getVideogiochi();
    });
    console.log('Done Component');
  }

  ricerca(keyword: string) {
    const videogiochiTrovati = this.videogiochi.slice().filter((v: Videogioco) => {
      return(
        v.title.includes(keyword),  
        v.category.includes(keyword), 
        v.releaseDate.includes(keyword),  
        v.genre.includes(keyword),  
        v.softwareHouse.includes(keyword),  
        v.publisher.includes(keyword),
        //v.languages.voice.includes(keyword)  //forse funziona così
        v.languages.voice.forEach(g => {
          g.includes(keyword) 
        }), 
        //v.languages.text.includes(keyword)  //forse funziona così
        v.languages.text.forEach(g => {
          g.includes(keyword)
        })
      );
    });

    if (videogiochiTrovati.length === 0) {
      alert('Nessuna corrispondenza');
      return this.videogiochi;
    } else {
      return videogiochiTrovati;
    }
  }
}
