<template>

  <div class="lg:flex">

    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <div
      class="
        flex-1
        p-4
        lg:p-6
        bg-gray-100
        min-h-screen
      "
    >

      <!-- HEADER -->

      <h1 class="text-3xl font-bold">
        Laporan
      </h1>

      <p class="text-gray-500 mt-1">
        Ringkasan bisnis dan keuangan
      </p>

      <!-- SUMMARY -->

      <div
        class="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-5
          mt-8
        "
      >

        <!-- REVENUE -->

        <div
          class="
            bg-white
            rounded-3xl
            p-6
          "
        >

          <p class="text-gray-500">
            Pendapatan
          </p>

          <h1
            class="
              text-3xl
              font-bold
              mt-3
              text-green-500
            "
          >
            {{ formatRupiah(totalRevenue) }}
          </h1>

        </div>

        <!-- EXPENSE -->

        <div
          class="
            bg-white
            rounded-3xl
            p-6
          "
        >

          <p class="text-gray-500">
            Pengeluaran
          </p>

          <h1
            class="
              text-3xl
              font-bold
              mt-3
              text-red-500
            "
          >
            {{ formatRupiah(totalExpense) }}
          </h1>

        </div>

        <!-- PROFIT -->

        <div
          class="
            bg-white
            rounded-3xl
            p-6
          "
        >

          <p class="text-gray-500">
            Profit Bersih
          </p>

          <h1
            class="
              text-3xl
              font-bold
              mt-3
              text-blue-500
            "
          >
            {{ formatRupiah(totalProfit) }}
          </h1>

        </div>

        <!-- TRANSACTION -->

        <div
          class="
            bg-white
            rounded-3xl
            p-6
          "
        >

          <p class="text-gray-500">
            Total Transaksi
          </p>

          <h1
            class="
              text-4xl
              font-bold
              mt-3
            "
          >
            {{ totalTransactions }}
          </h1>

        </div>

      </div>

      <!-- TRANSACTION TABLE -->

      <div
        class="
          bg-white
          rounded-3xl
          p-6
          mt-8
        "
      >

        <h2 class="text-2xl font-bold">
          Transaksi Terbaru
        </h2>

        <div class="space-y-4 mt-6">

          <div

            v-for="transaction in transactions"

            :key="transaction.id"

            class="
              flex
              justify-between
              items-center
              border-b
              pb-4
            "
          >

            <div>

              <h2 class="font-semibold">
                Transaction #{{ transaction.id }}
              </h2>

              <p
                class="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                {{ transaction.date }}
              </p>

            </div>

            <h2
              class="
                font-bold
                text-green-500
              "
            >
              {{ formatRupiah(transaction.total) }}
            </h2>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script setup>

import {
  computed
} from 'vue'

import Sidebar
from '../components/Sidebar.vue'

import {
  formatRupiah
} from '../utils/formatRupiah'

const transactions = JSON.parse(

  localStorage.getItem('transactions')

) || []

const expenses = JSON.parse(

  localStorage.getItem('expenses')

) || []

const totalRevenue = computed(() => {

  return transactions.reduce(

    (total, transaction) => {

      return total + transaction.total

    },

    0

  )

})

const totalExpense = computed(() => {

  return expenses.reduce(

    (total, expense) => {

      return total + expense.amount

    },

    0

  )

})

const totalProfit = computed(() => {

  return totalRevenue.value -

    totalExpense.value

})

const totalTransactions = computed(() => {

  return transactions.length

})

</script>