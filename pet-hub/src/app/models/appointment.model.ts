export class Appointment {
  id: number;
  petId: number;
  doctorId: number;
  date: string;
  notes: string;

  constructor(id: number, petId: number, doctorId: number, date: string, notes: string) {
    this.id = id;
    this.petId = petId;
    this.doctorId = doctorId;
    this.date = date;
    this.notes = notes;
  }
}
