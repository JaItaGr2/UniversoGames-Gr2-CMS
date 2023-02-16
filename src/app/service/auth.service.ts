import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      name: 'Luca',
      email: 'pippo@example.com',
      password: 'qwerty',
      role: 'admin',
    },
    {
      name: 'Mara',
      email: 'mara@example.com',
      password: 'admin',
      role: 'admin',
    },
  ];

  private userLogged?: User;

  private isLogged = true;

  isLoggedChanged = new Subject<boolean>();

  constructor(private router: Router) {}

  getIsLogged() {
    return this.isLogged;
  }

  login(email: string, password: string) {
    this.users.forEach(user => {
      if (email === user.email && password === user.password) {
        this.isLogged = true;
        this.userLogged = user;

        localStorage.setItem('nameUser', user.name);
        localStorage.setItem('currentUser', user.email);
        localStorage.setItem('roleUser', user.role);
        //const user = localStorage.getItem('currentUser');
      }
    });
    this.isLoggedChanged.next(this.isLogged);

    this.router.navigateByUrl('/');
    return this.isLogged;
  }

  logout() {
    this.isLogged = false;
    this.userLogged = undefined;

    localStorage.removeItem('nameUser');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('roleUser');
    
    this.isLoggedChanged.next(this.isLogged);

    this.router.navigateByUrl('/login');
    return this.isLogged;
  }

  signInUser(name: string, email: string, password: string) {
    this.users.push({
      name,
      email,
      password,
      role: 'admin'
    })
    this.login(email, password);
  }
}
