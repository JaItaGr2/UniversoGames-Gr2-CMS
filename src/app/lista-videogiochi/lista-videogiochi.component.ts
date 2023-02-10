import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Linguaggio, Videogioco } from '../model/videogioco';
import { VideogiochiService } from '../service/videogiochi.service';

@Component({
  selector: 'app-lista-videogiochi',
  templateUrl: './lista-videogiochi.component.html',
  styleUrls: ['./lista-videogiochi.component.css']
})
export class ListaVideogiochiComponent implements OnInit{

  videogiochi$!: Observable<Videogioco[]>;
  languages$!: Observable<Linguaggio[]>;

  constructor(private videogiochiService: VideogiochiService){}

  ngOnInit(): void {
    this.videogiochi$ = this.videogiochiService.getVideogiochi();
  }

  onClickDelete(id: string){
    this.videogiochiService.deleteVideogioco(id).subscribe(() =>{
      this.videogiochi$ = this.videogiochiService.getVideogiochi();
    })
  }

  onClickEdit(id:string){}
}
