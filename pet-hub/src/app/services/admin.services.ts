import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todos los usuarios
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, { withCredentials: true });
  }

  // 🔹 Obtener todos los doctores
  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctors`, { withCredentials: true });
  }

  // 🔹 Obtener todas las mascotas
  getAllPets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pets`, { withCredentials: true });
  }

  // 🔹 Obtener todas las citas médicas
  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`, { withCredentials: true });
  }

  // 🔹 Actualizar usuario
  updateUser(id: number, data: any, headers: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data, { headers });
  }

  // 🔹 Actualizar mascota
  updatePet(id: number, data: any, headers: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/pets/${id}`, data, { headers });
  }

  // 🔹 Actualizar cita médica
  updateAppointment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/appointments/${id}`, data, { withCredentials: true });
  }

  // 🔹 Eliminar cita médica
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/${id}`, { withCredentials: true });
  }

  createPet(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pets`, data, { withCredentials: true });
  }

  createAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, data, { withCredentials: true });
  }

}
