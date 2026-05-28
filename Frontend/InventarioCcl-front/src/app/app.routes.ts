import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { InventarioComponent } from './pages/inventario/inventario'
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'inventario',
        component: InventarioComponent,
        canActivate: [authGuard]
    }
];
