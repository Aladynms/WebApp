<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { ActiveProjectService } from "@/api/ActiveProjectService";
import ProjectStories from "@/components/ProjectStories.vue";

const route = useRoute();
const projectId = Number(route.params.id);

onMounted(() => {
  if (!isNaN(projectId)) {
    ActiveProjectService.setActiveProject(projectId);
  }
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
      📌 Szczegóły projektu #{{ projectId }}
    </h1>
    <ProjectStories :project-id="projectId" />
  </div>
</template>
