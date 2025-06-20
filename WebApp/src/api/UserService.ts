import { ref } from "vue";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: "admin" | "developer" | "devops";
}

export const currentUser = ref<User | null>(null);

export class UserService {
  static async fetchCurrentUser(): Promise<User | null> {
    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error();
      const user = await res.json();
      currentUser.value = { ...user, id: user._id };
      return currentUser.value;
    } catch {
      currentUser.value = null;
      return null;
    }
  }

  static async fetchAll(): Promise<User[]> {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    return data.map((u: any) => ({ ...u, id: u._id }));
  }

  static getById(id: string): Promise<User | undefined> {
    return this.fetchAll().then(users => users.find(u => u.id === id));
  }

  static logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    currentUser.value = null;
  }
}
