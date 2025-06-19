export class ActiveProjectService {
  private static readonly KEY = "activeProjectId";

  static setActiveProject(id: number): void {
    localStorage.setItem(this.KEY, id.toString());
  }

  static getActiveProjectId(): number | null {
    const id = localStorage.getItem(this.KEY);
    return id ? parseInt(id) : null;
  }

  static clear(): void {
    localStorage.removeItem(this.KEY);
  }
}
