<template>
  <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 mt-8">
    <h2 class="text-2xl font-bold dark:text-white">Grafik Penjualan</h2>

    <div class="mt-6 h-[350px]">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { useTransactions } from "../composables/useTransactions";

import { computed } from "vue";

import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,

  BarElement,
  CategoryScale,
  LinearScale,
);

const { transactions } = useTransactions();

const chartData = computed(() => {
  return {
    labels: transactions.value.map((_, index) => `T${index + 1}`),

    datasets: [
      {
        label: "Pendapatan",

        data: transactions.value.map((transaction) => transaction.total),

        borderRadius: 10,
        backgroundColor: "#111827"
      },
    ],
  };
});

const chartOptions = {
  responsive: true,

  maintainAspectRatio: false,
};
</script>
