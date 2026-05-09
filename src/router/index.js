import {
  createRouter,
  createWebHistory
} from 'vue-router'

import CashierView
from '../views/CashierView.vue'

import DashboardView
from '../views/DashboardView.vue'

import ProductView
from '../views/ProductView.vue'

import TransactionView
from '../views/TransactionView.vue'

import ExpenseView
from '../views/ExpenseView.vue'

import ReportView
from '../views/ReportView.vue'

const routes = [
  {
  path: '/reports',
  name: 'reports',
  component: ReportView
},
{
  path: '/expenses',
  name: 'expenses',
  component: ExpenseView
},

{
  path: '/products',
  name: 'products',
  component: ProductView
},

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