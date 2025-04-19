import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { isLoggedIn } from '../services/auth.interceptor';

export const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [isLoggedIn]},
    {path: 'login', component: LoginComponent},
];
