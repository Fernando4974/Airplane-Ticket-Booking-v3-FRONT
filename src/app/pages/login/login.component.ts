import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/authServices/auth.service';
import { User, UserLogin } from '../../common/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showPassword = signal(false);
  loginView = signal(true);
  isLoading = signal(false);
  notice:string="VillaBooking - Registro"
  ok = signal(false);

  constructor(private fb: FormBuilder,private _authService:AuthService, private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
    // Añadimos el validador a nivel de GRUPO
    validators: this.passwordMatchValidator
  });

  }
   okF(){
    this.ok.update(v => !v);

  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};
  togglePassword() {
    this.showPassword.update(v => !v);
  }

isFieldInvalid(field: string, form: FormGroup = this.loginForm): boolean {
  const control = form.get(field);

  if (field === 'confirmPassword') {
    return !!(
      (control && control.invalid && (control.dirty || control.touched)) ||
      (form.hasError('passwordMismatch') && (control?.dirty || control?.touched))
    );
  }

  return !!(control && control.invalid && (control.dirty || control.touched));
}

  toggleView(){
  this.loginView.update(val => !val)
  }
onRegister() {
  if (this.registerForm.valid) {
    this.isLoading.set(true);
    const user: User = this.registerForm.value;

    this._authService.register(user).subscribe({
      next: (value) => {

        this.notice = "Registro Guardado con éxito";
        this.okF()
        this.isLoading.set(false);


        setTimeout(() => {
          this.notice = "VillaBooking - Registro";
          this.okF();
          this.registerForm.reset();
          this.toggleView();

        }, 2000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.notice = "Error al registrar usuario";
        console.error(err);

      }
    });
  }
}

login(){
  const user:UserLogin=this.loginForm.value;

  try {
    this._authService.login(user).subscribe({
      next:(res)=> {
        console.log(res)
         const userId = res.data.userId
        sessionStorage.setItem("userId", userId)
       this.router.navigate(["/home"])
      },
      error: (err)=>{
        alert("fail: "+user.email +" / " +err)
      }
    })

  } catch (error) {

  }
}
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.login();
      this.isLoading.set(false);

      // Simulación de petición API

    }
  }

}
