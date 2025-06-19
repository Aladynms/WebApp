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
  <div>
    <h3 class="font-semibold">{{ task.name }}</h3>
    <p>{{ task.description }}</p>

    <p class="text-sm mt-1">
      Priorytet: {{ task.priority }} |
      Status: {{ task.status }} |
      Przewidywany czas: {{ task.estimatedHours }}h
    </p>

    <p v-if="assignee" class="text-sm text-gray-400 mt-1">
      Przypisany: {{ assignee.firstName }} {{ assignee.lastName }} ({{ assignee.role }})
    </p>

    <!-- Opcja przypisania -->
    <div v-if="task.status === 'todo'" class="mt-2">
      <label>Przypisz osobę:</label>
      <select v-model="assigneeId" class="mt-1">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.firstName }} {{ user.lastName }} ({{ user.role }})
        </option>
      </select>
      <button @click="assignUser" class="mt-2">Przypisz i rozpocznij</button>
    </div>

    <!-- Status doing -->
    <div v-if="task.status === 'doing'" class="mt-2">
      <p>Start: {{ new Date(task.startDate!).toLocaleString() }}</p>
      <button @click="markDone" class="mt-2">Zakończ</button>
    </div>

    <!-- Status done -->
    <div v-if="task.status === 'done'" class="mt-2">
      <p>Start: {{ new Date(task.startDate!).toLocaleString() }}</p>
      <p>Koniec: {{ new Date(task.endDate!).toLocaleString() }}</p>
    </div>
  </div>
</template>
