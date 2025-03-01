import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";


const Home = () => import("@/views/Home.vue");


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
