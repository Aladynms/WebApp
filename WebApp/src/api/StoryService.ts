export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "doing" | "done";

export interface Story {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  createdAt: string;
  status: Status;
  projectId: number;
  ownerId: number;
}

const STORAGE_KEY = "stories";

export class StoryService {
  static getAll(): Story[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  static getByProject(projectId: number): Story[] {
    return this.getAll().filter((story) => story.projectId === projectId);
  }

  static save(story: Story): void {
    const stories = this.getAll();
    const index = stories.findIndex((s) => s.id === story.id);

    if (index !== -1) {
      stories[index] = story;
    } else {
      story.id = Date.now();
      story.createdAt = new Date().toISOString();
      stories.push(story);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  static delete(id: number): void {
    const updated = this.getAll().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
