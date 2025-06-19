export type TaskStatus = "todo" | "doing" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: number;
  estimatedHours: number;
  status: TaskStatus;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  assigneeId?: number;
}

const STORAGE_KEY = "tasks";

export class TaskService {
  static getAll(): Task[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  static getByStory(storyId: number): Task[] {
    return this.getAll().filter((task) => task.storyId === storyId);
  }

  static getById(id: number): Task | undefined {
    return this.getAll().find((t) => t.id === id);
  }

  static save(task: Task): void {
    const tasks = this.getAll();
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      tasks[index] = task;
    } else {
      task.id = Date.now();
      task.createdAt = new Date().toISOString();
      tasks.push(task);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  static delete(id: number): void {
    const updated = this.getAll().filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
