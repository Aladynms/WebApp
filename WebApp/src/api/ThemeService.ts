export type Theme = "light" | "dark" | "auto";

export class ThemeService {
  static async get(): Promise<Theme> {
    const token = localStorage.getItem("accessToken");
    if (!token) return "auto"; // fallback gdy nie jesteśmy zalogowani

    const res = await fetch("http://localhost:3000/api/users/settings", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return "auto"; // fallback gdy np. 401
    const data = await res.json();
    return data.theme ?? "auto";
  }

  static async set(theme: Theme): Promise<void> {
    const token = localStorage.getItem("accessToken");
    await fetch("http://localhost:3000/api/users/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ theme }),
    });

    this.apply(theme);
  }

  static apply(theme: Theme) {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    }
  }

  static async init() {
    const theme = await this.get();
    this.apply(theme);
  }
}
