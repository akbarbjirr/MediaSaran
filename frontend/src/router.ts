import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router';
import HomeView from './views/HomeView.vue';
import AdminView from './views/AdminView.vue';
import LoginView from './views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    beforeEnter: (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const isAuthenticated = localStorage.getItem('admin_session') === 'true';
      if (isAuthenticated) {
        next();
      } else {
        next('/admin/login');
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
