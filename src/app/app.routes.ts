import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
];
