<template>
  <div class="lg:flex">
    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <div class="flex-1 p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <!-- HEADER -->

      <h1 class="text-3xl font-bold dark:text-white">Laporan</h1>

      <p class="text-gray-500 dark:text-gray-400 mt-1">Ringkasan bisnis dan keuangan</p>

      <!-- SUMMARY -->

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        <!-- REVENUE -->

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6">
          <p class="text-gray-500 dark:text-gray-400">Pendapatan</p>

          <h1 class="text-3xl font-bold mt-3 text-green-500 dark:text-white">
            {{ formatRupiah(totalRevenue) }}
          </h1>
        </div>

        <!-- EXPENSE -->

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6">
          <p class="text-gray-500 dark:text-gray-400">Pengeluaran</p>

          <h1 class="text-3xl font-bold mt-3 text-red-500 dark:text-white">
            {{ formatRupiah(totalExpense) }}
          </h1>
        </div>

        <!-- PROFIT -->

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6">
          <p class="text-gray-500 dark:text-gray-400">Profit Bersih</p>

          <h1 class="text-3xl font-bold mt-3 text-blue-500 dark:text-white">
            {{ formatRupiah(totalProfit) }}
          </h1>
        </div>

        <!-- TRANSACTION -->

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6">
          <p class="text-gray-500 dark:text-gray-400">Total Transaksi</p>

          <h1 class="text-4xl font-bold mt-3">
            {{ totalTransactions }}
          </h1>
        </div>
      </div>

      <!-- TRANSACTION TABLE -->

      <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 mt-8">
        <h2 class="text-2xl font-bold">Transaksi Terbaru</h2>

        <div class="space-y-4 mt-6">
          <div
            v-for="transaction in transactions"
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

            <div class="mt-5 pt-5 border-t">
              <h3 class="font-semibold mb-3">Item Dibeli</h3>

              <div class="space-y-3">
                <div
                  v-for="item in transaction.items"
                  :key="item.id"
                  class="flex justify-between items-center"
                >
                  <div>
                    <p class="font-medium">
                      {{ item.name }}
                    </p>

                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Qty:
                      {{ item.quantity }}
                    </p>
                  </div>

                  <h3 class="font-semibold">
                    {{ formatRupiah(item.price * item.quantity) }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import Sidebar from "../components/Sidebar.vue";

import { formatRupiah } from "../utils/formatRupiah";

import { useTransactions } from "../composables/useTransactions";

import { useExpenses } from "../composables/useExpenses";

const {
  transactions,

  totalRevenue,

  totalTransactions,
} = useTransactions();

const {
  expenses,

  totalExpense,
} = useExpenses();

const totalProfit = computed(() => {
  return totalRevenue.value - totalExpense.value;
});
</script>
