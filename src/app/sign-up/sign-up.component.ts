import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  firstFormGroup = this._formBuilder.group({
    nomeCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group(
    {
      emailCtrl: new FormControl('', [Validators.required, Validators.email]),
      emailCtrlRepeat: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    },
    { validators: repetitionEmailValidator }
  );
  thirdFormGroup = this._formBuilder.group(
    {
      passwordCtrl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordCtrlRepeat: new FormControl('', [Validators.required]),
    },
    { validators: repetitionPasswordValidator }
  );
  isEditable = true;
  hide = true;
  finalStep = false;

  getErrorMsgEmail() {
    let errore = '';
    if (this.secondFormGroup.get('emailCtrl')!.hasError('required')) {
      errore = 'Devi compilare questo campo';
    } else if (this.secondFormGroup.get('emailCtrl')!.hasError('email')) {
      errore = 'Email non valida';
    }
    return errore;
  }
  getErrorMsgEmailRepeat() {
    let errore = '';
    if (this.secondFormGroup.get('emailCtrlRepeat')!.hasError('required')) {
      errore = 'Devi compilare questo campo';
    } else if (this.secondFormGroup.hasError('emailCoincidenceError')) {
      errore = 'Le due email non corrispondono';
    } else if (this.secondFormGroup.get('emailCtrl')!.hasError('email')) {
      errore = 'Le due email non corrispondono';
    }
    return errore;
  }

  getErrorMsgPassword() {
    let errore = '';
    if (this.thirdFormGroup.get('passwordCtrl')!.hasError('required')) {
      errore = 'Devi compilare questo campo';
    } else if (this.secondFormGroup.get('emailCtrl')!.hasError('minLength')) {
      errore = 'Password troppo corta';
    }
    return errore;
  }
  getErrorMsgPasswordRepeat() {
    let errore = '';
    if (this.thirdFormGroup.get('passwordCtrlRepeat')!.hasError('required')) {
      errore = 'Devi compilare questo campo';
    } else if (this.thirdFormGroup.hasError('passwordCoincidenceError')) {
      errore = 'Le due password non corrispondono';
    } else if (this.secondFormGroup.get('emailCtrl')!.hasError('minLength')) {
      errore = 'Le due password non corrispondono';
    }
    return errore;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  registrati() {
    const { nomeCtrl } = this.firstFormGroup.getRawValue();
    const { emailCtrl } = this.secondFormGroup.getRawValue();
    const { passwordCtrl } = this.thirdFormGroup.getRawValue();

    this.authService.signUpUser(nomeCtrl!, emailCtrl!, passwordCtrl!);
  }

  primoLogin() {
    const { emailCtrl } = this.secondFormGroup.getRawValue();
    const { passwordCtrl } = this.thirdFormGroup.getRawValue();

    this.authService.login(emailCtrl!, passwordCtrl!);
  }

}

export const repetitionEmailValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const emailVerification = control.get('emailCtrl');
  const emailRepeatVerification = control.get('emailCtrlRepeat');

  return emailVerification &&
    emailRepeatVerification &&
    emailVerification.getRawValue() !== emailRepeatVerification.getRawValue()
    ? { emailCoincidenceError: true }
    : null;
};

export const repetitionPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordVerification = control.get('passwordCtrl');
  const passwordRepeatVerification = control.get('passwordCtrlRepeat');
  return passwordVerification &&
    passwordRepeatVerification &&
    passwordVerification.getRawValue() !==
      passwordRepeatVerification.getRawValue()
    ? { passwordCoincidenceError: true }
    : null;
};
