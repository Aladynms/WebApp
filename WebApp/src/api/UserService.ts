export type UserRole = "admin" | "developer" | "devops";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const USERS: User[] = [
  { id: 1, firstName: "Anna", lastName: "Nowak", role: "admin" },     // Zalogowany
  { id: 2, firstName: "Michał", lastName: "Kowalski", role: "developer" },
  { id: 3, firstName: "Ewa", lastName: "Wiśniewska", role: "devops" },
];

export class UserService {
  static getCurrentUser(): User {
    return USERS[0]; // Admin
  }

  static getAll(): User[] {
    return USERS;
  }

  static getById(id: number): User | undefined {
    return USERS.find((u) => u.id === id);
  }
}
