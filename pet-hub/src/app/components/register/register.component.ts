import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  newUser = { name: '', lastName: '', email: '', password: '', role: 'usuario' };
  errorMessage = ''; // 🔹 Variable para manejar errores

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.newUser).subscribe((response: any) => {
        alert(response.message); // 🔹 Mensaje de éxito
        // localStorage.setItem('token', response.token);
        this.errorMessage = ''; // 🔹 Limpiar errores si el registro es exitoso
        this.router.navigate(['/login']); // Redirecciona al perfil tras registro
      },
      (error) => {
        this.errorMessage = error.error?.error || 'Error en el registro'; // 🔹 Capturar mensaje del backend
      });
  }
}
