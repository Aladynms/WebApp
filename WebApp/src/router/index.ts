import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { ActiveProjectService } from "@/api/ActiveProjectService";


const Home = () => import("@/views/Home.vue");
const ProjectView = () => import("@/views/ProjectView.vue");


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/project/:id",
    component: ProjectView, 
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// ⬇️ Dodajemy przekierowanie domyślne na aktywny projekt
router.beforeEach((to, from, next) => {
  const activeId = ActiveProjectService.getActiveProjectId();

  if (to.path === "/" && activeId) {
    next(`/project/${activeId}`);
  } else {
    next();
  }
});

export default router;
