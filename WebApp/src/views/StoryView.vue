<script setup lang="ts">
import { useRoute } from "vue-router";
import { StoryService } from "@/api/StoryService";
import { TaskService } from "@/api/TaskService";
import { ref, computed, onMounted } from "vue";
import type { Story } from "@/api/StoryService";
import type { Task } from "@/api/TaskService";
import TaskForm from "@/components/TaskForm.vue";
import TaskCard from "@/components/TaskCard.vue";

const route = useRoute();
const storyId = Number(route.params.id);

const story = ref<Story | null>(null);
const tasks = ref<Task[]>([]);

const load = () => {
  story.value = StoryService.getAll().find((s) => s.id === storyId) || null;
  tasks.value = TaskService.getByStory(storyId);
};

onMounted(load);
</script>

<template>
  <div class="mt-4">
    <h1 class="text-2xl font-bold mb-2">Historyjka: {{ story?.name }}</h1>
    <p class="mb-4">{{ story?.description }}</p>

    <TaskForm :story-id="storyId" @updated="load" />

    <h2 class="text-xl font-semibold mt-6 mb-2">Zadania</h2>
    <div v-for="task in tasks" :key="task.id" class="card">
      <TaskCard :task="task" @updated="load" />
    </div>
  </div>
</template>
