export class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  userPhoto: string;
  role: string;

  constructor(id: number, name: string, lastName: string, email: string, userPhoto: string, role: string) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.userPhoto = userPhoto;
    this.role = role;
  }
}
