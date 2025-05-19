export class Pet {
  id: number;
  name: string;
  age: number;
  petPhoto: string;
  ownerId: number;

  constructor(id: number, name: string, age: number, petPhoto: string, ownerId: number) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.petPhoto = petPhoto;
    this.ownerId = ownerId;
  }
}
