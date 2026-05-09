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
        Dashboard
      </h1>

      <p class="text-gray-500 mt-1">
        Statistik penjualan toko
      </p>

      <!-- STATS -->

      <div
        class="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          mt-8
        "
      >

        <!-- TOTAL TRANSACTION -->

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

        <!-- TOTAL REVENUE -->

        <div
          class="
            bg-white
            rounded-3xl
            p-6
          "
        >

          <p class="text-gray-500">
            Total Pendapatan
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

        <!-- TOTAL ITEM -->

        <div
          class="
            bg-white
            rounded-3xl
            p-6
          "
        >

          <p class="text-gray-500">
            Total Item Terjual
          </p>

          <h1
            class="
              text-4xl
              font-bold
              mt-3
            "
          >
            {{ totalItems }}
          </h1>

        </div>

      </div>

      <!-- RECENT TRANSACTION -->

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

            v-for="transaction in recentTransactions"

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

              <p class="text-sm text-gray-500 mt-1">
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

import { computed }
from 'vue'

import Sidebar
from '../components/Sidebar.vue'

import {
  formatRupiah
} from '../utils/formatRupiah'

const transactions = JSON.parse(

  localStorage.getItem('transactions')

) || []

const totalTransactions = computed(() => {

  return transactions.length

})

const totalRevenue = computed(() => {

  return transactions.reduce(

    (total, transaction) => {

      return total + transaction.total

    },

    0

  )

})

const totalItems = computed(() => {

  return transactions.reduce(

    (total, transaction) => {

      return total +

        transaction.items.reduce(

          (itemTotal, item) => {

            return itemTotal + item.quantity

          },

          0

        )

    },

    0

  )

})

const recentTransactions = computed(() => {

  return transactions.slice(0, 5)

})

</script>