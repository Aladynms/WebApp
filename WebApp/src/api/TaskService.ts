export type TaskStatus = "todo" | "doing" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: string;
  estimatedHours: string;
  status: TaskStatus;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  assigneeId?: string;
}

export class TaskService {
  static async getByStory(storyId: string): Promise<Task[]> {
    const res = await fetch(`http://localhost:3000/api/tasks/story/${storyId}`);
    const data = await res.json();
    return data.map((t: any) => ({
      ...t,
      id: t._id,
    }));
  }

  static async getById(id: string): Promise<Task> {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
    return await res.json();
  }

  static async save(task: Task): Promise<void> {
    const method = task.id ? "PUT" : "POST";
    const url = task.id
      ? `http://localhost:3000/api/tasks/${task.id}`
      : `http://localhost:3000/api/tasks`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  }

  static async delete(id: string): Promise<void> {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
    });
  }
}
