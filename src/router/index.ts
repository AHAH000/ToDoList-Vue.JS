// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TodoListView from '../views/TodoListView.vue';
import AboutView from '@/views/AboutView.vue';
import LoginForm from '@/views/LoginForm.vue';
import RegisterView from '@/views/RegisterView.vue';
import { isAuthenticated } from '@/auth';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/to-do-list',
    name: 'ToDoList',
    component: TodoListView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/LoginForm',
    name: 'LoginForm',
    component: LoginForm
  },{
    path: '/RegisterView',
    name: 'RegisterView',
    component: RegisterView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isAuthenticated.value) {
//     localStorage.setItem('redirectTo', to.fullPath);
//     next({ name: 'LoginForm' });
//   } else {
//     next();
//   }
// });

export default router;