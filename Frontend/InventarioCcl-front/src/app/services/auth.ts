import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


interface LoginResponse{
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5054/auth';

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      usuario,
      password
    }).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void{
    localStorage.removeItem('token');
  }
}
