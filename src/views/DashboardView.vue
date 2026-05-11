<template>
  <div class="lg:flex">
    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <div class="flex-1 p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <!-- HEADER -->

      <h1 class="text-3xl font-bold dark:text-white">Dashboard</h1>

      <p class="text-gray-500 dark:text-gray-400 mt-1">Statistik penjualan toko</p>

      <!-- STATS -->

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
        <!-- TOTAL TRANSACTION -->

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6">
          <p class="text-gray-500 dark:text-gray-400">Total Transaksi</p>

          <h1 class="text-4xl font-bold mt-3">
            {{ totalTransactions }}
          </h1>
        </div>

        <!-- TOTAL REVENUE -->

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6">
          <p class="text-gray-500 dark:text-gray-400">Total Pendapatan</p>

          <h1 class="text-3xl font-bold mt-3 text-green-500 dark:text-white">
            {{ formatRupiah(totalRevenue) }}
          </h1>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6">
          <p class="text-gray-500 dark:text-gray-400">Profit Bersih</p>

          <h1 class="text-3xl font-bold mt-3 text-blue-500 dark:text-white">
            {{ formatRupiah(totalProfit) }}
          </h1>
        </div>

        <!-- TOTAL ITEM -->

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6">
          <p class="text-gray-500 dark:text-gray-400">Total Item Terjual</p>

          <h1 class="text-4xl font-bold mt-3">
            {{ totalItems }}
          </h1>
        </div>
      </div>

      <!-- RECENT TRANSACTION -->

      <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 mt-8">
        <h2 class="text-2xl font-bold">Transaksi Terbaru</h2>

        <div class="space-y-4 mt-6">
          <div
            v-for="transaction in recentTransactions"
            :key="transaction.id"
            class="flex justify-between items-center border-b pb-4"
          >
            <div>
              <h2 class="font-semibold">Transaction #{{ transaction.id }}</h2>

              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {{ transaction.date }}
              </p>
            </div>

            <h2 class="font-bold text-green-500">
              {{ formatRupiah(transaction.total) }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SalesChart />
  <TopSellingProducts />
</template>

<script setup>
import { computed } from "vue";

import SalesChart from "../components/SalesChart.vue";

import Sidebar from "../components/Sidebar.vue";

import { formatRupiah } from "../utils/formatRupiah";

import { useTransactions } from "../composables/useTransactions";

import {
  useExpenses
} from '../composables/useExpenses'

import TopSellingProducts
from "../components/TopSellingProducts.vue";

const {
  transactions,

  totalRevenue,

  totalTransactions,

  totalItems,
} = useTransactions();

const {

  totalExpense

} = useExpenses()

const totalProfit = computed(() => {

  return totalRevenue.value -

    totalExpense.value

})

const recentTransactions = computed(() => {
  return transactions.value.slice(0, 5);
});
</script>
