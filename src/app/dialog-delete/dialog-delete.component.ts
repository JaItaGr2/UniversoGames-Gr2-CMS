import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ListaVideogiochiComponent } from '../lista-videogiochi/lista-videogiochi.component';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {
  clickDelete = false;

  constructor(
    public  dialogRef: MatDialogRef<ListaVideogiochiComponent>
  ) {
    dialogRef.beforeClosed().subscribe(
      result => dialogRef.close(this.clickDelete));
  }


  onClickDelete() {
    this.clickDelete = true;
    this.dialogRef.close(true);
  }
}
