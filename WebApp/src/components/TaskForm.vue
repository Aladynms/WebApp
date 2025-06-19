<script setup lang="ts">
import { reactive } from "vue";
import { TaskService, type Task } from "@/api/TaskService";

const props = defineProps<{ storyId: number }>();
const emit = defineEmits(["updated"]);

const form = reactive<Omit<Task, "id" | "createdAt">>({
  name: "",
  description: "",
  priority: "medium",
  storyId: props.storyId,
  estimatedHours: 0,
  status: "todo"
});

const save = () => {
  TaskService.save({ ...form, id: 0, createdAt: "" });
  reset();
  emit("updated");
};

const reset = () => {
  form.name = "";
  form.description = "";
  form.priority = "medium";
  form.estimatedHours = 0;
  form.status = "todo";
};
</script>

<template>
  <form @submit.prevent="save" class="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6 space-y-3">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">➕ Dodaj zadanie</h3>
    <input
      v-model="form.name"
      placeholder="Nazwa"
      required
      class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
    <textarea
      v-model="form.description"
      placeholder="Opis"
      required
      class="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
    <div class="flex flex-wrap gap-2">
      <select
        v-model="form.priority"
        class="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option value="low">Niski</option>
        <option value="medium">Średni</option>
        <option value="high">Wysoki</option>
      </select>
      <input
        type="number"
        min="1"
        v-model="form.estimatedHours"
        placeholder="Czas (h)"
        class="w-32 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      />
    </div>
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
    >
      Dodaj zadanie
    </button>
  </form>
</template>