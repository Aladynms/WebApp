<script lang="ts">
  import { defineComponent, reactive, onMounted } from "vue";
  import { ProjectService } from "../api/ProjectService";
  import type { Project } from "../api/ProjectService";
  
  export default defineComponent({
    name: "ManagMe",
    setup() {
      const projects = reactive<Project[]>([]);
      const form = reactive<Project>({ id: 0, name: "", description: "" });
  
      const loadProjects = () => {
        const data = ProjectService.getAll();
        projects.splice(0, projects.length, ...data);
      };
  
      const saveProject = () => {
        ProjectService.save({ ...form });
        resetForm();
        loadProjects();
      };
  
      const editProject = (project: Project) => {
        Object.assign(form, project);
      };
  
      const deleteProject = (id: number) => {
        ProjectService.delete(id);
        loadProjects();
      };
  
      const resetForm = () => {
        form.id = 0;
        form.name = "";
        form.description = "";
      };
  
      onMounted(loadProjects);
  
      return {
        projects,
        form,
        saveProject,
        editProject,
        deleteProject,
        resetForm,
      };
    },
  });
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-100">
    <h1 class="text-3xl font-bold mb-6 text-center">📁 Zarządzanie projektami</h1>

    <!-- Formularz dodawania/edycji -->
    <form
      @submit.prevent="saveProject"
      class="mb-8 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md space-y-4"
    >
      <input
        v-model="form.name"
        type="text"
        placeholder="Nazwa projektu"
        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      />
      <textarea
        v-model="form.description"
        placeholder="Opis projektu"
        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        required
      ></textarea>
      <div class="flex gap-2">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          {{ form.id ? "Zapisz zmiany" : "Dodaj projekt" }}
        </button>
        <button
          v-if="form.id"
          @click="resetForm"
          type="button"
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
        >
          Anuluj
        </button>
      </div>
    </form>

    <!-- Lista projektów -->
    <ul class="space-y-4">
      <li
        v-for="project in projects"
        :key="project.id"
        class="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-md flex justify-between items-center"
      >
        <div>
          <h3 class="text-xl font-semibold">{{ project.name }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ project.description }}</p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="$router.push(`/project/${project.id}`)"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md transition"
          >
            Wejdź
          </button>
          <button
            @click="editProject(project)"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md transition"
          >
            Edytuj
          </button>
          <button
            @click="deleteProject(project.id)"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md transition"
          >
            Usuń
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
  
  
  