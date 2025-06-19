<script setup lang="ts">
import type { Task } from "@/api/TaskService";
import { TaskService } from "@/api/TaskService";
import { UserService } from "@/api/UserService";
import { computed, ref } from "vue";

const props = defineProps<{ task: Task }>();
const emit = defineEmits(["updated"]);

const users = UserService.getAll().filter(u => u.role !== "admin");
const assigneeId = ref(props.task.assigneeId ?? null);

const assignee = computed(() =>
  assigneeId.value ? UserService.getById(assigneeId.value) : null
);

const assignUser = () => {
  if (!assigneeId.value) return;
  props.task.assigneeId = assigneeId.value;
  props.task.status = "doing";
  props.task.startDate = new Date().toISOString();
  TaskService.save(props.task);
  emit("updated");
};

const markDone = () => {
  props.task.status = "done";
  props.task.endDate = new Date().toISOString();
  TaskService.save(props.task);
  emit("updated");
};
</script>

<template>
  <div class="p-4 rounded-lg bg-white dark:bg-gray-700 shadow-md space-y-2 text-sm text-gray-800 dark:text-gray-100">
    <h3 class="font-semibold text-base">{{ task.name }}</h3>
    <p>{{ task.description }}</p>

    <p class="text-gray-500 dark:text-gray-300">
      Priorytet: {{ task.priority }} |
      Status: {{ task.status }} |
      Czas: {{ task.estimatedHours }}h
    </p>

    <p v-if="assignee" class="text-gray-400">
      Przypisany: {{ assignee.firstName }} {{ assignee.lastName }} ({{ assignee.role }})
    </p>

    <div v-if="task.status === 'todo'" class="space-y-2">
      <label class="block text-sm">Przypisz osobę:</label>
      <select v-model="assigneeId" class="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.firstName }} {{ user.lastName }} ({{ user.role }})
        </option>
      </select>
      <button @click="assignUser" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md">
        Przypisz i rozpocznij
      </button>
    </div>

    <div v-else-if="task.status === 'doing'" class="space-y-1">
      <p>Start: {{ new Date(task.startDate!).toLocaleString() }}</p>
      <button @click="markDone" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md">
        Zakończ
      </button>
    </div>

    <div v-else-if="task.status === 'done'" class="space-y-1">
      <p>Start: {{ new Date(task.startDate!).toLocaleString() }}</p>
      <p>Koniec: {{ new Date(task.endDate!).toLocaleString() }}</p>
    </div>
  </div>
</template>