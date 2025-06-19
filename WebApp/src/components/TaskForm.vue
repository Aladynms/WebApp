<script setup lang="ts">
import { reactive, defineEmits } from "vue";
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
  <form @submit.prevent="save" class="card mb-4">
    <h3 class="text-lg font-semibold mb-2">Dodaj zadanie</h3>
    <input v-model="form.name" placeholder="Nazwa" required />
    <textarea v-model="form.description" placeholder="Opis" required />
    <div class="flex gap-2 mt-2">
      <select v-model="form.priority">
        <option value="low">Niski</option>
        <option value="medium">Średni</option>
        <option value="high">Wysoki</option>
      </select>
      <input type="number" min="1" v-model="form.estimatedHours" placeholder="Czas (h)" />
    </div>
    <button class="mt-2">Dodaj zadanie</button>
  </form>
</template>
