import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './pages/login/login';
import { InventarioComponent } from './pages/inventario/inventario'
import { MovimientoComponent } from './pages/movimiento/movimiento';


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
    },
    {
        path: 'movimiento',
        component: MovimientoComponent,
        canActivate: [authGuard]
    }
];
