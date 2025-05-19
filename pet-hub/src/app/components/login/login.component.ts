import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';  // ✅ Importar FormsModule


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage = ''; // 🔹 Variable para almacenar errores

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const isToken:boolean = this.authService.isLoggedIn();
    if (isToken) {
      this.router.navigate(['/profile']); // 🔹 Si ya hay sesión, redirigir al perfil
    }
  }

  login() {
    this.authService.login(this.user).subscribe((response: any) => {
      alert(response.message);  // 🔹 Mensaje de éxito
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.errorMessage = '';   // 🔹 Limpiar errores si el login es exitoso
      this.router.navigate(['/profile']); // Redirecciona al perfil tras login
    },
    (error) => {
      this.errorMessage = error.error?.error || 'Error en el login';  // 🔹 Capturar mensaje del backend
    });
  }
}

