import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  usuario = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.getToken()){
      this.router.navigate(['/inventario'])
    }
  }

  login(): void{
    this.errorMessage= '';

    this.authService.login(this.usuario, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/inventario']);
        },
        error: () => {
          this.errorMessage = 'Credenciales invalidas.'
        }
      })
  }

}
