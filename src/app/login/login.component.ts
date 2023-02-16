import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  getErrorMessage() {
    if (this.form.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    const { email, password } = this.form.getRawValue();

    const logged = this.authService.login(email!, password!);
    if (logged) {
      this._snackBar.open('Login effettuato con successo!!', '', {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['color-snackbar'],
      });
    } else {
      this._snackBar.open('Email o password errate', '', {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['color-snackbar', 'error-snackbar'],
      });
    }
  }
}
