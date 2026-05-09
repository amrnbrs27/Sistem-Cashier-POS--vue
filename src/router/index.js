import {
  createRouter,
  createWebHistory
} from 'vue-router'

import CashierView
from '../views/CashierView.vue'

import DashboardView
from '../views/DashboardView.vue'

import TransactionView
from '../views/TransactionView.vue'

const routes = [
    {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
    },
  {
    path: '/',
    name: 'cashier',
    component: CashierView
  },

  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionView
  }

]

const router = createRouter({

  history: createWebHistory(),

  routes

})

export default router