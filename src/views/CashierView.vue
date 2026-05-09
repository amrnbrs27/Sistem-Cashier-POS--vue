<template>

  <div class="flex">

    <Sidebar />

    <div class="flex-1 p-6 bg-gray-100 min-h-screen">

      <h1 class="text-3xl font-bold">
        SRBN POS
      </h1>

      <p class="text-gray-500 mt-1">
        Pilih produk dan proses pembayaran
      </p>

      <!-- SEARCH -->

      <input
        type="text"
        placeholder="Cari nama produk"
        class="w-full mt-6 p-4 rounded-2xl border"
      />

      <!-- CATEGORY -->

      <div class="flex gap-3 mt-5">

        <button class="category active">
          Semua
        </button>

        <button class="category">
          Coffee
        </button>

        <button class="category">
          Food
        </button>

        <button class="category">
          Non Coffee
        </button>

      </div>

      <!-- PRODUCT GRID -->

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8"
      >

        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />

      </div>

    </div>

  </div>

</template>

<script setup>

import Sidebar from '../components/Sidebar.vue'
import ProductCard from '../components/ProductCard.vue'

import { products } from '../data/products'

</script>

<style scoped>

.category{
  @apply px-4 py-2 rounded-full bg-white;
}

.active{
  @apply bg-green-500 text-white;
}

</style>