<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import type { Story, Status } from "@/api/StoryService";
import { StoryService } from "@/api/StoryService";
import { UserService } from "@/api/UserService";

const props = defineProps<{ projectId: number }>();

const stories = ref<Story[]>([]);
const form = reactive<Omit<Story, "id" | "createdAt">>({
  name: "",
  description: "",
  priority: "medium",
  status: "todo",
  projectId: props.projectId,
  ownerId: UserService.getCurrentUser().id,
});

const editingId = ref<number | null>(null);
const filter = ref<Status | "all">("all");

const filteredStories = computed(() => {
  return filter.value === "all"
    ? stories.value
    : stories.value.filter((s) => s.status === filter.value);
});

function load() {
  stories.value = StoryService.getByProject(props.projectId);
}

function save() {
  const story: Story = {
    ...form,
    id: editingId.value ?? 0,
    createdAt: "",
  };

  StoryService.save(story);
  resetForm();
  load();
}

function edit(story: Story) {
  Object.assign(form, story);
  editingId.value = story.id;
}

function remove(id: number) {
  StoryService.delete(id);
  load();
}

function resetForm() {
  form.name = "";
  form.description = "";
  form.priority = "medium";
  form.status = "todo";
  editingId.value = null;
}

onMounted(load);
</script>

<template>
  <div class="my-4">
    <h2 class="text-xl font-bold mb-2">Zarządzanie historyjkami</h2>

    

    <!-- Formularz -->
    <form @submit.prevent="save" class="space-y-2 mb-6 p-4 border rounded">
      <input v-model="form.name" placeholder="Nazwa" class="w-full p-2 border rounded" required />
      <textarea v-model="form.description" placeholder="Opis" class="w-full p-2 border rounded" required />
      
      <div class="flex gap-4">
        <select v-model="form.priority" class="p-2 border rounded">
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>
        <select v-model="form.status" class="p-2 border rounded">
          <option value="todo">Do zrobienia</option>
          <option value="doing">W trakcie</option>
          <option value="done">Zrobione</option>
        </select>
      </div>

      <div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          {{ editingId ? "Zapisz" : "Dodaj" }}
        </button>
        <button v-if="editingId" @click="resetForm" type="button" class="ml-2 bg-gray-400 text-white px-4 py-2 rounded">
          Anuluj
        </button>
      </div>
    </form>

    <!-- Filtrowanie -->
    <div class="mb-4">
      <label class="mr-2">Filtruj:</label>
      <select v-model="filter" class="p-2 border rounded">
        <option value="all">Wszystkie</option>
        <option value="todo">Do zrobienia</option>
        <option value="doing">W trakcie</option>
        <option value="done">Zrobione</option>
      </select>
    </div>

    <!-- Lista historyjek -->
    <ul class="space-y-4">
      <li v-for="story in filteredStories" :key="story.id" class="border rounded p-4">
        <h3 class="text-lg font-semibold">{{ story.name }}</h3>
        <p class="text-sm text-gray-700">{{ story.description }}</p>
        <p class="text-sm">Priorytet: {{ story.priority }} | Status: {{ story.status }}</p>
        <div class="mt-2 space-x-2">
          <button @click="edit(story)" class="bg-yellow-500 text-white px-3 py-1 rounded">Edytuj</button>
          <button @click="remove(story.id)" class="bg-red-500 text-white px-3 py-1 rounded">Usuń</button>
        </div>
      </li>
    </ul>
  </div>
</template>
