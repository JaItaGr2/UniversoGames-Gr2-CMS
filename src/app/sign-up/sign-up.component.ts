import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email = new FormControl('', [Validators.required, ]); //Validators.email
  //emailRepeat = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordRepeat = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMsgEmail() {
    if (this.email.hasError('required')) {
      return 'Devi compilare questo campo';
    }

    return this.email.hasError('email') ? 'Email non valida' : '';
  }
  getErrorMsgEmailRepeat() {
    /*if (this.emailRepeat.hasError('required')) {
      return 'Devi compilare questo campo';
    }

    return this.emailRepeat.hasError('email') ? 'Le due email non corrispondono' : '';*/
  }

  getErrorMsgPassword() {
    if (this.password.hasError('required')) {
      return 'Devi compilare questo campo';
    }

    return this.password.hasError('email') ? 'Email non valida' : '';
  }
  getErrorMsgPasswordRepeat() {
    if (this.passwordRepeat.hasError('required')) {
      return 'Devi compilare questo campo';
    }

    return this.passwordRepeat.hasError('email') ? 'Le due password non corrispondono' : '';
  }





  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    secondCtrlRepeat: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
    thirdCtrlRepeat: ['', Validators.required],
  });
  isEditable = true;
  nome = '';
  emailSign = '';
  pwSign = '';

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  validateRepeat(campo: string) {
    /*if (campo === 'second') {
      if (this.secondFormGroup.getRawValue().secondCtrl === this.secondFormGroup.getRawValue().secondCtrlRepeat) {
        return true;
      }
    }
    else if (campo === 'third') {
      if (this.thirdFormGroup.getRawValue().thirdCtrl === this.thirdFormGroup.getRawValue().thirdCtrlRepeat) {
        return true;
      }
    }
    return false;*/
    return false;
  }

  register() {
    this.authService.signInUser(this.nome, this.emailSign, this.pwSign);
  }

}
