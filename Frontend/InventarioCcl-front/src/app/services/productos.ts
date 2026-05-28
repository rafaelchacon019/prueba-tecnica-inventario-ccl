import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
}

export interface MovimientoProductoRequest {
  nombre: string;
  cantidad: number;
  tipoMovimiento: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private readonly apiUrl = 'http://localhost:5054/productos';

  constructor(private http: HttpClient) {}

  getInventario(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.apiUrl}/inventario`, {
      headers: this.getAuthHeaders()
    });
  }

  registrarMovimiento(request: MovimientoProductoRequest): Observable<Producto>{
    return this.http.post<Producto>(`${this.apiUrl}/movimiento`, request, {
      headers: this.getAuthHeaders()
    });
  }

  private getAuthHeaders(): HttpHeaders{
    const token = localStorage.getItem('token') ?? '';

    return new HttpHeaders({
      Authorization : `Bearer ${token}`
    });

  }
}

