import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import StockManagement from '../views/StockManagement.vue'
import SalesTracking from '../views/SalesTracking.vue'
const routes = [
  { path: '/', component: Dashboard },
  { path: '/stock', component: StockManagement },
  { path: '/sales', component: SalesTracking }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router