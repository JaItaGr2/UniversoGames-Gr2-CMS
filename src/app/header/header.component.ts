import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  selectedPath = '';

  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events
      .pipe(filter((e) => e instanceof RoutesRecognized))
      .subscribe((val: any) => {
        this.selectedPath = val.urlAfterRedirects.split('/')[1];
      });

  }
}
