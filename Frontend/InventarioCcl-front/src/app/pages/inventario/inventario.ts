import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Producto, ProductosService } from '../../services/productos';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inventario.html',
  styleUrls: ['./inventario.scss']
})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];

  nombre = '';
  cantidad: number | null = null;
  tipoMovimiento = 'entrada';

  mensaje = '';
  errorMessage = '';

  constructor(
    private productosService: ProductosService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void{
    this.productosService.getInventario().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar el inventario.';
      }
    });
  }

  registrarMovimiento(): void {
    this.mensaje = ``;
    this.errorMessage = ``;

    if (!this.nombre || !this.cantidad || this.cantidad <= 0){
      this.errorMessage = 'Debe ingresar producto y cantidad validas.'
      return;
    }

    this.productosService.registrarMovimiento({
      nombre: this.nombre,
      cantidad: this.cantidad,
      tipoMovimiento: this.tipoMovimiento
    }).subscribe({
      next: () => {
        this.mensaje = 'Movimiento registrado correctamente.';
        this.nombre = '';
        this.cantidad = null;
        this.tipoMovimiento = 'entrada';
        this.cargarInventario();
      },
      error: (error) => {
        this.errorMessage = error.error || 'No fue posible registrar el movimiento';
      }
    });
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
