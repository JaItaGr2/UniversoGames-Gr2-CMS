import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Videogioco } from '../model/videogioco';
import { VideogiochiService } from '../service/videogiochi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-videogiochi',
  templateUrl: './lista-videogiochi.component.html',
  styleUrls: ['./lista-videogiochi.component.css']
})
export class ListaVideogiochiComponent implements OnInit{

  videogiochi$!: Observable<Videogioco[]>;

  constructor(private videogiochiService: VideogiochiService, private router: Router,){}

  ngOnInit(): void {
    this.videogiochi$ = this.videogiochiService.getVideogiochi();
  }

  onClickDelete(id: string){
    console.log('Elimina elemento');
    this.videogiochiService.deleteVideogioco(id).subscribe(() =>{
      this.videogiochi$ = this.videogiochiService.getVideogiochi();
    });
    console.log('Done Component');
  }

}
