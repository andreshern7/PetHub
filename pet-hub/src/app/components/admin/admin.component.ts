import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.services';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usersMap = new Map<number, any>();
  petsMap = new Map<number, any>();
  appointmentsMap = new Map<number, any>();
  doctorsMap = new Map<number, any>();
  
  editingUserId: number | null = null;
  editingPetId: number | null = null;
  editingAppointmentId: number | null = null;


  newPet = { name: '', age: '0', petPhoto: '', ownerId: null };
  newAppointment = { petId: '0', doctorId: '0', date: '', notes: '' };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadDoctors();
    this.loadPets();
    this.loadAppointments();
  }

  loadUsers(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.adminService.getAllUsers().subscribe(users => {
      this.usersMap.clear();  // 🔹 Limpiar antes de actualizar

      users.forEach(user => {
        this.usersMap.set(user.id, {
          id: user.id,
          name: `${user.name} ${user.lastName}`,
          photo: user.userPhoto,
          email: user.email,
          role: user.role
        });
      });
    });
  }

  loadDoctors(): void {
    this.adminService.getAllDoctors().subscribe(doctors => {
      this.doctorsMap.clear();

      doctors.forEach(doctor => {
        this.doctorsMap.set(doctor.id, {
          id: doctor.id,
          name: `${doctor.name} ${doctor.lastName}`
        });
      });
    });
  }

  loadPets(): void {
    this.adminService.getAllPets().subscribe(pets => {
      this.petsMap.clear();

      pets.forEach(pet => {
        const owner = this.usersMap.get(pet.ownerId);
        this.petsMap.set(pet.id, {
          id: pet.id,
          name: pet.name,
          age: pet.age,
          photo: pet.petPhoto,
          ownerName: owner?.name || 'Dueño desconocido',
          ownerPhoto: owner?.photo || 'default-photo-url.jpg'
        });
      });
    });
  }

  loadAppointments(): void {
    this.adminService.getAllAppointments().subscribe(appointments => {
      this.appointmentsMap.clear();

      appointments.forEach(appointment => {
        const pet = this.petsMap.get(appointment.petId);
        const doctor = this.doctorsMap.get(appointment.doctorId);
        this.appointmentsMap.set(appointment.id, {
          id: appointment.id,
          petName: pet?.name || 'Mascota desconocida',
          petPhoto: pet?.photo || 'default-photo-url.jpg',
          doctorName: doctor?.name || 'Doctor desconocido',
          date: appointment.date,
          notes: appointment.notes || 'Sin notas'
        });
      });
    });
  }

  // 🔹 Editar usuario
  editUser(id: number): void {
    this.editingUserId = id;
  }

  cancelEditUser(): void {
    this.editingUserId = null;
  }

  updateUser(user: any): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.adminService.updateUser(user.id, user, headers)
      .subscribe(() => {
        alert("✅ Usuario actualizado correctamente");
        this.cancelEditUser();
      }, error => console.error("❌ Error al actualizar usuario:", error));
  }

  // 🔹 Editar mascota
  editPet(id: number): void {
    this.editingPetId = id;
  }

  cancelEditPet(): void {
    this.editingPetId = null;
  }

  updatePet(pet: any): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.adminService.updatePet(pet.id, pet, headers)
      .subscribe(() => {
        alert("✅ Mascota actualizada correctamente");
        this.cancelEditPet();
      }, error => console.error("❌ Error al actualizar mascota:", error));
  }

  
  editAppointment(id: number): void {
    this.editingAppointmentId = id;
  }

  cancelEditAppointment(): void {
    this.editingAppointmentId = null;
  }

  updateAppointment(appointment: any): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.adminService.updateAppointment(appointment.id, { 
      date: appointment.date, 
      notes: appointment.notes 
    })
    .subscribe(() => {
      alert("✅ Cita médica actualizada correctamente");
      this.cancelEditAppointment();
    }, error => console.error("❌ Error al actualizar cita médica:", error));
  }

  deleteAppointment(id: number): void {
    const confirmDelete = confirm("⚠️ ¿Estás seguro de que deseas eliminar esta cita médica?");
    if (!confirmDelete) return;

    this.adminService.deleteAppointment(id)
      .subscribe(() => {
        alert("🗑️ Cita médica eliminada correctamente");
        this.appointmentsMap.delete(id);  // 🔹 Remover cita del Map para actualizar la vista
      }, error => console.error("❌ Error al eliminar cita médica:", error));
  }

  createPet(): void {
    if (!this.newPet.name || !this.newPet.age || !this.newPet.petPhoto || !this.newPet.ownerId) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    const formattedPet = {
      name: this.newPet.name,
      age: String(this.newPet.age),  // 🔹 Convertir `age` a string
      petPhoto: this.newPet.petPhoto,
      ownerId: String(this.newPet.ownerId)  // 🔹 Convertir `ownerId` a string
    };
      
    this.adminService.createPet(formattedPet).subscribe(pet => {
      this.petsMap.set(pet.id, { 
        ...pet, 
        ownerName: this.usersMap.get(pet.ownerId)?.name || 'Dueño desconocido', 
        ownerPhoto: this.usersMap.get(pet.ownerId)?.petPhoto || 'default-photo-url.jpg' 
      });
      alert("✅ Mascota creada correctamente.");
      this.newPet = { name: '', age: '0', petPhoto: '', ownerId: null };  // 🔄 Limpiar formulario
    }, error => console.error("❌ Error al crear mascota:", error));
  }

  createAppointment(): void {
    if (!this.newAppointment.petId || !this.newAppointment.doctorId || !this.newAppointment.date) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    this.adminService.createAppointment(this.newAppointment).subscribe(appointment => {
      const pet = this.petsMap.get(appointment.petId);
      const doctor = this.doctorsMap.get(appointment.doctorId);
      this.appointmentsMap.set(appointment.id, { 
        ...appointment, 
        petName: pet?.name || 'Mascota desconocida', 
        petPhoto: pet?.photo || 'default-photo-url.jpg',
        doctorName: doctor?.name || 'Doctor desconocido' 
      });
      alert("✅ Cita médica creada correctamente.");
      this.newAppointment = { petId: '0', doctorId: '0', date: '', notes: '' };  // 🔄 Limpiar formulario
    }, error => console.error("❌ Error al crear cita médica:", error));
  }

}
