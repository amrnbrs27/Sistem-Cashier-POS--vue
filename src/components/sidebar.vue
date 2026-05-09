<template>
  <div class="w-64 min-h-screen bg-white border-r p-5">
    <h1 class="text-2xl font-bold mb-1">SRBN POS</h1>

    <p class="text-gray-500 text-sm mb-10">Sistem management penjualan</p>

    <div class="space-y-3">
      <RouterLink to="/dashboard" class="menu" active-class="active">
        Dashboard
      </RouterLink>

      <RouterLink to="/" class="menu" active-class="active"> Kasir </RouterLink>

      <RouterLink to="/transactions" class="menu" active-class="active">
        Riwayat
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.menu {
  @apply block
  p-3
  rounded-xl
  cursor-pointer
  hover:bg-gray-100
  transition;
}

.active {
  @apply bg-black
  text-white;
}
</style>
