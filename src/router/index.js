import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'
import CreateView from '../views/CreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'order-list',
      component: HomeView
    },
    {
      path: '/order/create',
      name: 'order-create',
      component: CreateView
    },
    {
      path: '/order/:id/edit',
      name: 'order-edit',
      component: EditView
    }
  ]
})

export default router
