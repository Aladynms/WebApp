<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TaskService, type Task } from "@/api/TaskService";
import TaskCard from "./TaskCard.vue";

const props = defineProps<{ storyId: number }>();
const tasks = ref<Task[]>([]);

const load = () => {
  tasks.value = TaskService.getByStory(props.storyId);
};

onMounted(load);
</script>

<template>
  <div class="kanban-board">
    <!-- Todo -->
    <div class="kanban-column">
      <h2>🕐 Todo</h2>
      <div v-for="task in tasks.filter(t => t.status === 'todo')" :key="task.id" class="kanban-card">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>

    <!-- Doing -->
    <div class="kanban-column">
      <h2>🔧 Doing</h2>
      <div v-for="task in tasks.filter(t => t.status === 'doing')" :key="task.id" class="kanban-card">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>

    <!-- Done -->
    <div class="kanban-column">
      <h2>✅ Done</h2>
      <div v-for="task in tasks.filter(t => t.status === 'done')" :key="task.id" class="kanban-card">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.kanban-column {
  flex: 1;
  background-color: var(--color-surface);
  padding: 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.kanban-column h2 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--color-text);
  font-weight: 600;
  text-align: center;
}

.kanban-card {
  margin-bottom: 1rem;
}
</style>
