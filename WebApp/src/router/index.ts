import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { ActiveProjectService } from "@/api/ActiveProjectService";
import { AuthService } from "@/api/AuthService";


const Home = () => import("@/views/Home.vue");
const ProjectView = () => import("@/views/ProjectView.vue");
const UsersView = () => import("@/views/UsersView.vue");
const StoryView = () => import("@/views/StoryView.vue");
const LoginView = () => import("@/views/LoginView.vue");


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/project/:id",
    component: ProjectView, 
    props: true,
  },
  {
    path: "/story/:id",
    component: StoryView, 
    props: true,
  },
  {
    path: "/users",
    component: UsersView ,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const isPublic = to.path === "/login";

  if (!isAuthenticated && !isPublic) {
    // Nie zalogowany → tylko /login dozwolone
    return next("/login");
  }

  // Jeśli zalogowany i wchodzi na / → przekieruj na aktywny projekt (jeśli jest)
  if (to.path === "/" && isAuthenticated) {
    const activeId = ActiveProjectService.getActiveProjectId();
    if (activeId) {
      return next(`/project/${activeId}`);
    }
  }

  next(); // domyślnie przejdź dalej
});

export default router;
