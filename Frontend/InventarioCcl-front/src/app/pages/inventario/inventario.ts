import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Producto, ProductosService } from '../../services/productos';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inventario.html',
  styleUrls: ['./inventario.scss']
})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];
  errorMessage = '';

  constructor(
    private productosService: ProductosService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.productosService.getInventario().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar el inventario.';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}