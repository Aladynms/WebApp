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
  try {
    const res = await fetch("http://localhost:3000/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (res.status === 401) {
      await this.refreshTokens();
      const retryRes = await fetch("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!retryRes.ok) throw new Error("Unauthorized");
      return await retryRes.json();
    }

    if (!res.ok) throw new Error("Unauthorized");
    return await res.json();
  } catch (e) {
    throw new Error("Unauthorized");
  }
}

  static logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  }

  static async refreshTokens() {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    });

    if (!res.ok) throw new Error("Refresh failed");
    const { accessToken, refreshToken: newRefresh } = await res.json();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefresh);
  }
}
