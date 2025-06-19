export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export class UserService {
  static getCurrentUser(): User {
    // Mock użytkownika
    return {
      id: 1,
      firstName: "Jan",
      lastName: "Kowalski"
    };
  }
}
