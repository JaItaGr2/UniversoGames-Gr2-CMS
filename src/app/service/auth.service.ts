import { Injectable } from '@angular/core';
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

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      this.isLogged = true;
    }

    this.isLoggedChanged.next(this.isLogged);

    return this.isLogged;
  }
}
