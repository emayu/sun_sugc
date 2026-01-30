import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then( m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/instituciones/institutos.component').then( m => m.InstitutosComponent ),
        canActivate: [ authGuard ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];
