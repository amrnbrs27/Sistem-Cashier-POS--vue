<template>

  <div
    class="
      bg-white
      rounded-3xl
      p-6
      mt-8
    "
  >

    <h2 class="text-2xl font-bold">
      Grafik Penjualan
    </h2>

    <div class="mt-6">

      <Bar
        :data="chartData"
        :options="chartOptions"
      />

    </div>

  </div>

</template>

<script setup>

import {
  computed
} from 'vue'

import {
  Bar
} from 'vue-chartjs'

import {

  Chart as ChartJS,

  Title,
  Tooltip,
  Legend,

  BarElement,
  CategoryScale,
  LinearScale

} from 'chart.js'

ChartJS.register(

  Title,
  Tooltip,
  Legend,

  BarElement,
  CategoryScale,
  LinearScale

)

const transactions = JSON.parse(

  localStorage.getItem('transactions')

) || []

const chartData = computed(() => {

  return {

    labels: transactions.map(

      (_, index) => `T${index + 1}`

    ),

    datasets: [

      {

        label: 'Pendapatan',

        data: transactions.map(

          transaction => transaction.total

        ),

        borderRadius: 10

      }

    ]

  }

})

const chartOptions = {

  responsive: true,

  maintainAspectRatio: false

}

</script>