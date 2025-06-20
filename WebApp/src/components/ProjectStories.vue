<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import type { Story, Status } from "@/api/StoryService";
import { StoryService } from "@/api/StoryService";
import { UserService, currentUser } from "@/api/UserService";

const props = defineProps<{ projectId: string }>();

const stories = ref<Story[]>([]);
const form = ref<Omit<Story, "id" | "createdAt"> | null>(null);
const editingId = ref<string | null>(null);
const filter = ref<Status | "all">("all");

const filteredStories = computed(() =>
  filter.value === "all"
    ? stories.value
    : stories.value.filter((s) => s.status === filter.value)
);

async function load() {
  stories.value = await StoryService.getByProject(props.projectId);
}

async function save() {
  if (!form.value) return;

  const story: Story = {
    ...form.value,
    id: editingId.value ?? "",
    createdAt: "",
  };

  await StoryService.save(story);
  resetForm();
  await load();
}

function edit(story: Story) {
  form.value = reactive<Omit<Story, "id" | "createdAt">>({
    name: story.name,
    description: story.description,
    priority: story.priority,
    status: story.status,
    projectId: story.projectId,
    ownerId: story.ownerId,
  });
  editingId.value = story.id;
}

async function remove(id: string) {
  if (!id) {
    console.error("Brak ID – nie można usunąć.");
    return;
  }

  const confirmed = confirm("Czy na pewno chcesz usunąć tę historyjkę?");
  if (!confirmed) return;

  await StoryService.delete(id);
  await load();
}

function resetForm() {
  if (!currentUser.value) return;

  form.value = reactive<Omit<Story, "id" | "createdAt">>({
    name: "",
    description: "",
    priority: "medium",
    status: "todo",
    projectId: props.projectId,
    ownerId: currentUser.value.id,
  });
  editingId.value = null;
}
onMounted(async () => {
  await UserService.fetchCurrentUser();
  if (currentUser.value) {
    form.value = reactive<Omit<Story, "id" | "createdAt">>({
      name: "",
      description: "",
      priority: "medium",
      status: "todo",
      projectId: props.projectId,
      ownerId: currentUser.value.id,
    });
  }
  await load();
});
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">🧩 Zarządzanie historyjkami</h2>

      <!-- Formularz -->
      <form v-if="form" @submit.prevent="save" class="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md space-y-4">
        <input
          v-model="form.name"
          placeholder="Nazwa"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
        <textarea
          v-model="form.description"
          placeholder="Opis"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />

        <div class="flex flex-wrap gap-4">
          <select v-model="form.priority" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <option value="low">Niski</option>
            <option value="medium">Średni</option>
            <option value="high">Wysoki</option>
          </select>
          <select v-model="form.status" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <option value="todo">Do zrobienia</option>
            <option value="doing">W trakcie</option>
            <option value="done">Zrobione</option>
          </select>
        </div>

        <div class="flex gap-2">
          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
            {{ editingId ? "Zapisz" : "Dodaj" }}
          </button>
          <button v-if="editingId" @click="resetForm" type="button" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition">
            Anuluj
          </button>
        </div>
      </form>
    </div>

    <!-- Filtrowanie -->
    <div class="flex items-center gap-4">
      <label class="text-gray-700 dark:text-gray-300">🔍 Filtruj:</label>
      <select v-model="filter" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
        <option value="all">Wszystkie</option>
        <option value="todo">Do zrobienia</option>
        <option value="doing">W trakcie</option>
        <option value="done">Zrobione</option>
      </select>
    </div>

    <!-- Lista historyjek -->
    <ul class="space-y-4">
      <li v-for="story in filteredStories" :key="story.id" class="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">{{ story.name }}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-1">{{ story.description }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Priorytet: <span class="font-medium">{{ story.priority }}</span> |
          Status: <span class="font-medium">{{ story.status }}</span>
        </p>
        <div class="mt-3 flex gap-2">
          <button @click="$router.push(`/story/${story.id}`)" class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm">Wejdź</button>
          <button @click="edit(story)" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-sm">Edytuj</button>
          <button @click="remove(story.id)" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm">Usuń</button>
        </div>
      </li>
    </ul>
  </div>
</template>