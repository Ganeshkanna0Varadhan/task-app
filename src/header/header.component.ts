import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isOpenMobile: boolean = false;
  isLoggedIn: boolean = false;
  authService = inject(AuthService);

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.user.subscribe((user) => {
        if (!user)  {
          this.isLoggedIn = false;
          return;
        }
        this.isLoggedIn = true
      })
    })
  }

  onLogout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isOpenMobile = !this.isOpenMobile;
  }
}
