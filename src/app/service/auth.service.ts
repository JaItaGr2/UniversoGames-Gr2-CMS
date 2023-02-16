import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    {
      nome: 'Luca',
      email: 'pippo@example.com',
      password: 'qwerty',
    },
    {
      nome: 'Mara',
      email: 'mara@example.com',
      password: 'admin',
    },
  ]

  isLogged = true;

  isLoggedChanged = new Subject<boolean>();

  constructor(private router: Router) {}

  login(email: string, password: string) {
    this.users.forEach(user => {
      if (email === user.email && password === user.password) {
        this.isLogged = true;
      }
    });
    this.isLoggedChanged.next(this.isLogged);

    this.router.navigateByUrl('/');
    return this.isLogged;
  }

  signInUser(nome: string, email: string, password: string) {
    this.users.push({
      nome,
      email,
      password,
    })
    this.login(email, password);
  }
}
