import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
      role: 'admin',
    },
    {
      name: 'Luca',
      email: 'pippo@example.com',
      password: 'qwerty',
      role: 'user',
    },
    {
      name: 'Mara',
      email: 'mara@example.com',
      password: 'admin',
      role: 'admin',
    },
  ];
  
  constructor(private router: Router) {}

  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  readonly loggedUser$ = this.loggedUserSubject.asObservable();

  readonly isLogged$ = this.loggedUser$.pipe(
    map((loggedUser) => {
      if (loggedUser === null) {
        return false;
      } else {
        return true;
      }
    }),
  );

  readonly isAdmin$ = this.loggedUser$.pipe(
    map((logged) => logged?.role === 'admin')
  );


  login(email: string, password: string) {
    const existingUser = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      this.loggedUserSubject.next(existingUser!);
      this.router.navigateByUrl('/');
    }

    return !!existingUser;
  }

  logout() {
    this.loggedUserSubject.next(null);

    this.router.navigateByUrl('/login');
  }

  signUpUser(name: string, email: string, password: string) {
    this.users.push({
      name,
      email,
      password,
      role: 'admin'
    });
  }
}
