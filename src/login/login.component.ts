import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { finalize, Observable } from 'rxjs';
import { SnackbarComponent } from "../components/snackbar/snackbar.component";
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    SnackbarComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  showPassword: boolean = false;
  errorMessage = '';
  myForm!: FormGroup;
  isLoginMode: boolean = true;
  loading = false;
  authObs?: Observable<any>;
  router = inject(Router)

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  handleSubmit() {
    this.loading = true;
    const { email, password } = this.myForm.value;
    if (this.isLoginMode) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.singUp(email, password);
    }

    this.authObs.pipe(finalize(() => {
      this.loading = false;
      this.myForm.reset();
    })).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (errMsg) => {
        this.setErroMessage(errMsg);
      }
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  setErroMessage(errMessage: string) {
    this.errorMessage = errMessage;

    setTimeout(() => {
      this.errorMessage = '';
    }, 3000)
  }

  toggleLoginMode() {
    this.isLoginMode = !this.isLoginMode;
    this.myForm.reset();
  }
}
