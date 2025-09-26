import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login',  component: LoginComponent },
            { path: 'register',  component: RegisterComponent }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'profile',  component: ProfileComponent, canActivate: [AuthGuard] }
        ]
    },
];
