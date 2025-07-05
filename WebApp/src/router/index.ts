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

router.beforeEach(async (to, from, next) => {
  const isPublic = to.path === "/login";

  try {
    const user = await AuthService.getMe();

    if (!user && !isPublic) {
      AuthService.logout();
      return next("/login");
    }

    if (to.path === "/" && user) {
      const activeId = await ActiveProjectService.getActiveProjectId();
      if (activeId) return next(`/project/${activeId}`);
    }

    return next();
  } catch (e: any) {
    AuthService.logout();
    if (!isPublic) return next("/login");
    return next(); 
  }
});

export default router;
