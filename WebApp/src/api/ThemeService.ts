type Theme = "light" | "dark" | "auto";
const STORAGE_KEY = "theme";

export class ThemeService {
  static get(): Theme {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved ?? "auto";
  }

  static set(theme: Theme): void {
    localStorage.setItem(STORAGE_KEY, theme);
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

  // wywołać raz przy starcie
  static init() {
    this.apply(this.get());
  }
}
