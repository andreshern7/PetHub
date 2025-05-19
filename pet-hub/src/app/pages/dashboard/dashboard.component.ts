import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { Pet } from '../../models/pet.model'; 
import { Appointment } from '../../models/appointment.model';
import { Doctor } from '../../models/doctor.model';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  userProfile: User | null = null;
  pets: Pet[] = [];
  appointments: Appointment[] = [];
  doctors: Doctor[] = [];

  currentPassword = '';
  newPassword = '';

  editingUser = false;
  editingProfile = false;
  editingPassword = false;
  editingPetId: number | null = null;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Debes iniciar sesión primero");
      this.router.navigate(['/']);
      return;
    }

    this.loadUserProfile();
    this.loadPets();
    this.loadAppointments();
    this.loadDoctors();
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get<User>('http://localhost:3000/api/auth/profile', { headers }).subscribe(
      (data) => { this.userProfile = data; },
      (error) => { console.error('Error al cargar perfil:', error); }
    );
  }

  loadPets(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get<Pet[]>('http://localhost:3000/api/auth/pets', { headers }).subscribe(
      (data) => { this.pets = data; },
      (error) => { console.error('Error al cargar mascotas:', error); }
    );
  }

  loadAppointments(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get<Appointment[]>('http://localhost:3000/api/auth/appointments', { headers }).subscribe(
      (data) => { this.appointments = data; },
      (error) => { console.error('Error al cargar citas:', error); }
    );
  }

  loadDoctors(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get<any[]>('http://localhost:3000/api/doctors', { headers }).subscribe(
      (data) => { this.doctors = data; },
      (error) => { console.error('Error al cargar doctores:', error); }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  getAppointmentsForPet(petId: number): Appointment[] {
    return this.appointments.filter(appt => appt.petId === petId);
  }

  toggleEditUser(): void {
    this.editingUser = !this.editingUser;
  }

  toggleEditProfile(): void {
    // this.toggleEditUser();
    this.editingProfile = !this.editingProfile;
  }

  toggleEditPassword(): void {
    // this.toggleEditUser();
    this.editingPassword = !this.editingPassword;
  }

  toggleEditPet(id: number): void {
    this.editingPetId = this.editingPetId === id ? null : id;
  }


  updatePassword(): void {
    const token = localStorage.getItem('token');
      if (!token || !this.userProfile) return;

      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const body = { currentPassword: this.currentPassword, newPassword: this.newPassword };

      this.http.put(`http://localhost:3000/api/users/${this.userProfile.id}/password`, body, { headers })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.handleError(error);
            throw error;
          })
        )
        .subscribe(
          () => {
            alert("✅ Contraseña cambiada exitosamente");
            this.currentPassword = '';  // 🔄 Limpiar input
            this.newPassword = '';  // 🔄 Limpiar input
            this.toggleEditPassword();
          },
          error => console.error("❌ Error al cambiar contraseña:", error)
        );
  }


  //-------------------------------------------------------------

  updateUser(): void {
    const token = localStorage.getItem('token');
    if (!token || !this.userProfile) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.put(`http://localhost:3000/api/users/${this.userProfile.id}/profile`, this.userProfile, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          throw error;
        })
      )
      .subscribe(
        () => {
          alert("✅ Perfil actualizado correctamente")
          this.toggleEditProfile();
        },
        error => console.error("❌ Error al actualizar perfil:", error)
      );
  }

  newPet: Pet = {id: 0, name: '', age: 0, petPhoto: '', ownerId: 0 }; // 🆕 Modelo de mascota vacía
  
  addPet(): void {
  const token = localStorage.getItem('token');
  if (!token || !this.userProfile) return;

  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  this.newPet.ownerId = this.userProfile.id;  // 🔹 Asignar el usuario actual como dueño

  if (!this.newPet.name || !this.newPet.age || !this.newPet.petPhoto) {
    alert("Todos los campos son obligatorios");
    return;
  }

  this.http.post<Pet>('http://localhost:3000/api/pets', this.newPet, { headers }).subscribe(
    (data) => {
      this.pets.push(data);  // 🔹 Agregar la nueva mascota al array
      this.newPet = {id: 0, name: '', age: 0, petPhoto: '', ownerId: 0 };  // 🔄 Limpiar el formulario
    },
    (error) => { console.error('Error al agregar mascota:', error); }
  );
  }

  updatePet(pet: Pet): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    const body = { name: pet.name, age: pet.age, petPhoto: pet.petPhoto };

    this.http.put(`http://localhost:3000/api/pets/${pet.id}`, body, { headers })
      .subscribe(
        () =>
          {
            alert("✅ Mascota actualizada correctamente")
            this.toggleEditPet(pet.id);
          },
        (error) => this.handleError(error)
      );
  }

  newAppointment: Appointment = { id: 0, petId: 0, doctorId: 0, date: '', notes: '' };

  addAppointment(petId: number): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.newAppointment.petId = petId;  // 🔹 Asignamos la mascota seleccionada

    this.http.post<Appointment>('http://localhost:3000/api/appointments', this.newAppointment, { headers }).subscribe(
      (data) => {
        this.appointments.push(data);  // 🔹 Agregar la nueva cita al array
        this.newAppointment = { id: 0, petId: 0, doctorId: 0, date: '', notes: '' };  // 🔄 Limpiar formulario
      },
      (error) => { console.error('Error al agregar cita médica:', error); }
    );
  }

  handleError(error: HttpErrorResponse): void {
    if (error.status === 400) {
      alert("⚠️ Error: " + error.error.message);  // Mensaje de validación
    } else if (error.status === 401) {
      alert("🔒 Contraseña incorrecta.");
    } else if (error.status === 404) {
      alert("❌ Usuario no encontrado.");
    } else {
      alert("❗ Ocurrió un error inesperado. Inténtalo nuevamente.");
    }
  }
}