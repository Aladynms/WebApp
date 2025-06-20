export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "doing" | "done";

export interface Story {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  createdAt: string;
  status: Status;
  projectId: string;
  ownerId: string;
}

export class StoryService {
  static async getByProject(projectId: string): Promise<Story[]> {
    const res = await fetch(`http://localhost:3000/api/stories/project/${projectId}`);
    const data = await res.json();
    return await data.map((s: any) => ({
      ...s,
      id: s._id, 
    }));
  }

  static async getById(id: string): Promise<Story> {
    const res = await fetch(`http://localhost:3000/api/stories/${id}`);
    return await res.json();
  }

  static async save(story: Story): Promise<void> {
    const method = story.id ? "PUT" : "POST";
    const url = story.id
      ? `http://localhost:3000/api/stories/${story.id}`
      : `http://localhost:3000/api/stories`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(story),
    });
  }

  static async delete(id: string): Promise<void> {
    await fetch(`http://localhost:3000/api/stories/${id}`, {
      method: "DELETE",
    });
  }
}
