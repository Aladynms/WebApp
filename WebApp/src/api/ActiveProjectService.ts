export class ActiveProjectService {
  static async setActiveProject(id: string | null): Promise<void> {
    const token = localStorage.getItem("accessToken");
    await fetch("http://localhost:3000/api/users/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ activeProjectId: id }),
    });
  }

  static async getActiveProjectId(): Promise<number | null> {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("http://localhost:3000/api/users/settings", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Nie można pobrać aktywnego projektu");
    const data = await res.json();
    return data.activeProjectId ?? null;
  }

  static async clear(): Promise<void> {
    await this.setActiveProject(null);
  }
}
