export interface Project {
  id: string;
  name: string;
  description: string;
}

export class ProjectService {
  static async getAll(): Promise<Project[]> {
    const res = await fetch("http://localhost:3000/api/projects");
    const raw = await res.json();
    return raw.map((p: any) => ({ ...p, id: p._id }));
  }

  static async getById(id: string): Promise<Project> {
    const res = await fetch(`http://localhost:3000/api/projects/${id}`);
    const data = await res.json();
    return { ...data, id: data._id };
  }

  static async save(project: Project): Promise<void> {
    const { id, ...payload } = project;
    const method = id && id !== "0" ? "PUT" : "POST";
    const url = id && id !== "0"
      ? `http://localhost:3000/api/projects/${id}`
      : `http://localhost:3000/api/projects`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: string): Promise<void> {
    await fetch(`http://localhost:3000/api/projects/${id}`, {
      method: "DELETE",
    });
  }
}
