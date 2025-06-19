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
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md min-h-[300px]">
      <h2 class="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">🕐 Todo</h2>
      <div v-for="task in tasks.filter(t => t.status === 'todo')" :key="task.id" class="mb-4">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>

    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md min-h-[300px]">
      <h2 class="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">🔧 Doing</h2>
      <div v-for="task in tasks.filter(t => t.status === 'doing')" :key="task.id" class="mb-4">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>

    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md min-h-[300px]">
      <h2 class="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">✅ Done</h2>
      <div v-for="task in tasks.filter(t => t.status === 'done')" :key="task.id" class="mb-4">
        <TaskCard :task="task" @updated="load" />
      </div>
    </div>
  </div>
</template>