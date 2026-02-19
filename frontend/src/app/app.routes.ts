import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicLoggedGuard } from './guards/public-logged.guard';
import { isAdminRoleGuard } from './guards/isAdminRole.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then( m => m.LoginComponent),
        canActivate: [ publicLoggedGuard ]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/instituciones/institutos.component').then( m => m.InstitutosComponent ),
        canActivate: [ authGuard ]
    },
    {
        path: 'instituciones',
        loadComponent: () => import('./pages/institutos-admin/institutos-admin.component').then( m => m.InstitutosAdminComponent ),
        canActivate: [ authGuard, isAdminRoleGuard]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];
