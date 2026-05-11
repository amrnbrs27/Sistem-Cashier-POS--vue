<template>
  <div class="lg:flex">
    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <div
      class="flex-1 p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white"
    >
      <!-- HEADER -->

      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold dark:text-white">Laporan</h1>

          <p class="text-gray-500 dark:text-gray-400 mt-1">
            Ringkasan bisnis dan keuangan
          </p>
        </div>

        <button
          @click="exportPDF"
          class="bg-black dark:bg-gray-800 dark:text-white text-white px-5 py-3 rounded-2xl"
        >
          Export PDF
        </button>
      </div>

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
import jsPDF from "jspdf";

import { computed } from "vue";

import Sidebar from "../components/Sidebar.vue";

import { formatRupiah } from "../utils/formatRupiah";

import { useTransactions } from "../composables/useTransactions";

import { useExpenses } from "../composables/useExpenses";

import { useStoreSettings } from "../composables/useStoreSettings";

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

const { storeSettings } = useStoreSettings();

const exportPDF = () => {
  console.log("PDF CLICKED");

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    `${storeSettings.value.name} REPORT`,

    20,

    20,
  );

  doc.setFontSize(10);

  doc.text(
    storeSettings.value.address,

    20,

    28,
  );

  doc.text(
    storeSettings.value.phone,

    20,

    34,
  );

  doc.setFontSize(12);

  doc.text(
    `Total Revenue: ${formatRupiah(totalRevenue.value)}`,

    20,

    40,
  );

  doc.text(
    `Total Expense: ${formatRupiah(totalExpense.value)}`,

    20,

    50,
  );

  doc.text(
    `Net Profit: ${formatRupiah(totalProfit.value)}`,

    20,

    60,
  );

  doc.text(
    `Total Transactions: ${totalTransactions.value}`,

    20,

    70,
  );

  let y = 90;

  doc.setFontSize(16);

  doc.text("Recent Transactions", 20, y);

  y += 10;

  doc.setFontSize(11);

  transactions.value.forEach((transaction) => {
    doc.text(
      `#${transaction.id} - ${formatRupiah(transaction.total)}`,

      20,

      y,
    );

    y += 8;

    doc.text(
      `${transaction.date}`,

      25,

      y,
    );

    y += 12;
  });

  doc.save("report.pdf");
};
</script>
