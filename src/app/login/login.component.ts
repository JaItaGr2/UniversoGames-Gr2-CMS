import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    const { username, password } = this.form.getRawValue();
    if (this.authService.login(username!, password!)) {
      alert('Login effettuato con successo');
    } else {
      alert('Login errato');
    }
  }
}
