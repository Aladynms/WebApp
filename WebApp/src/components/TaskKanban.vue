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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
    <div>
      <h2 class="text-xl font-semibold mb-2">🕐 Todo</h2>
      <div v-for="task in tasks.filter(t => t.status === 'todo')" :key="task.id" class="card">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>
    <div>
      <h2 class="text-xl font-semibold mb-2">🔧 Doing</h2>
      <div v-for="task in tasks.filter(t => t.status === 'doing')" :key="task.id" class="card">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>
    <div>
      <h2 class="text-xl font-semibold mb-2">✅ Done</h2>
      <div v-for="task in tasks.filter(t => t.status === 'done')" :key="task.id" class="card">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>
  </div>
</template>
