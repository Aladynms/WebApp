export class AuthService {
  static async login(login: string, password: string): Promise<void> {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password })
    });

    if (!res.ok) throw new Error("Błąd logowania");

    const { accessToken, refreshToken } = await res.json();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  static async getMe() {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:3000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Unauthorized");
    return await res.json();
  }

  static logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  }
}
