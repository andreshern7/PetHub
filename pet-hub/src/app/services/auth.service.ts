import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData, { withCredentials: true });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.http.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true }).subscribe(() => {
      localStorage.removeItem('token');  // 🔹 Eliminar token del usuario
      this.router.navigate(['/login']);  // 🔹 Redirigir a la página de login
    });
  }
}
