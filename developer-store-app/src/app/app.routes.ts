import { Routes } from '@angular/router';
import { SalesListComponent } from './components/sales/sales-list/sales-list.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sales', component: SalesListComponent,  canActivate: [AuthGuard]},
    { path: 'registration', component: RegistrationComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
