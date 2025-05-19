import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';  // ✅ Importar FormsModule
import { HttpClientModule  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { PetComponent } from './pages/pet/pet.component';
// import { AppointmentComponent } from './pages/appointment/appointment.component';
// import { PetDetailComponent } from './pages/pet/pet-detail/pet-detail.component';
// import { BookAppointmentComponent } from './pages/appointment/book-appointment/book-appointment.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminComponent,
    // PetComponent,
    // AppointmentComponent,
    // PetDetailComponent,
    // BookAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
