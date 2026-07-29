import { createRouter, createWebHistory } from "vue-router";

import { mockRoutes } from "../mocks/routeMock";

const router = createRouter({
  history: createWebHistory(),
  routes: mockRoutes,
});

export default router;
