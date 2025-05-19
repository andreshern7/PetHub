export class Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;

  constructor(id: number, name: string, specialty: string, email: string) {
    this.id = id;
    this.name = name;
    this.specialty = specialty;
    this.email = email;
  }
}
