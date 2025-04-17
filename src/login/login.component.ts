import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword: boolean = false;
  ngForm!: FormGroup;

  ngOnInit(): void {
    this.ngForm = new FormGroup({
      gmail: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
      
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
