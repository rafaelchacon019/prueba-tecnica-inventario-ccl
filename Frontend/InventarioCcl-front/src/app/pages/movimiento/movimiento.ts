import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Producto, ProductosService } from '../../services/productos';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './movimiento.html',
  styleUrls: ['./movimiento.scss']
})
export class MovimientoComponent implements OnInit {
  productos: Producto[] = [];

  productoSeleccionado = '';
  nuevoProducto = '';
  cantidad: number | null = null;
  tipoMovimiento = 'entrada';

  mensaje = '';
  errorMessage = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  get productoActual(): Producto | undefined {
    return this.productos.find(
      producto => producto.nombre === this.productoSeleccionado
    );
  }

  cargarInventario(): void {
    this.productosService.getInventario().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar los productos.';
      }
    });
  }

  registrarMovimiento(): void {
    this.mensaje = '';
    this.errorMessage = '';

    const nombreProducto = this.obtenerNombreProducto();

    if (!nombreProducto || !this.cantidad || this.cantidad <= 0) {
      this.errorMessage = 'Debe seleccionar producto e ingresar una cantidad válida.';
      return;
    }

    if (this.tipoMovimiento === 'salida' && this.productoSeleccionado === 'nuevo') {
      this.errorMessage = 'No se puede registrar salida de un producto nuevo.';
      return;
    }

    this.productosService.registrarMovimiento({
      nombre: nombreProducto,
      cantidad: this.cantidad,
      tipoMovimiento: this.tipoMovimiento
    }).subscribe({
      next: () => {
        this.mensaje = 'Movimiento registrado correctamente.';
        this.productoSeleccionado = '';
        this.nuevoProducto = '';
        this.cantidad = null;
        this.tipoMovimiento = 'entrada';
        this.cargarInventario();
      },
      error: (error) => {
        this.errorMessage = error.error || 'No fue posible registrar el movimiento.';
      }
    });
  }

  private obtenerNombreProducto(): string {
    if (this.productoSeleccionado === 'nuevo') {
      return this.nuevoProducto.trim();
    }

    return this.productoSeleccionado.trim();
  }
}