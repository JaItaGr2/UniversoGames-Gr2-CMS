import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  selectedPath = '';
  loggedUser$!: Observable<User | null>;
  isLogged$!: Observable<boolean>;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loggedUser$ = this.authService.loggedUser$;
    this.isLogged$ = this.authService.isLogged$;

    this.router.events
      .pipe(filter((e) => e instanceof RoutesRecognized))
      .subscribe((val: any) => {
        this.selectedPath = val.urlAfterRedirects.split('/')[1];
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
