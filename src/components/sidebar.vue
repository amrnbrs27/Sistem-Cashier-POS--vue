<template>
  <div class="w-64 min-h-screen bg-white dark:bg-gray-800 border-r p-5">
    <img
      v-if="storeSettings.logo"
      :src="storeSettings.logo"
      alt="Logo"
      class="max-w-[180px] max-h-[100px] object-contain mb-1"
    />

    <h1 class="text-2xl font-bold mb-1 dark:text-white">
      {{ storeSettings.name }}
    </h1>

    <p class="text-gray-500 text-sm mb-10">Sistem management penjualan</p>

    <div class="space-y-3 dark:text-white">
      <RouterLink to="/dashboard" class="menu" active-class="active">
        <span>📊</span>
        Dashboard
      </RouterLink>

      <RouterLink to="/" class="menu" active-class="active">
        <span>🛒</span>
        Kasir
      </RouterLink>

      <RouterLink to="/products" class="menu" active-class="active">
        <span>📦</span>
        Produk
      </RouterLink>

      <RouterLink to="/transactions" class="menu" active-class="active">
        <span>🧾</span>
        Riwayat
      </RouterLink>

      <RouterLink to="/expenses" class="menu" active-class="active">
        <span>💸</span>
        Pengeluaran
      </RouterLink>

      <RouterLink to="/reports" class="menu" active-class="active">
        <span>📈</span>
        Laporan
      </RouterLink>

      <RouterLink to="/settings" class="menu">
        <span>⚙️</span>
        Setting
      </RouterLink>

      <button
        @click="toggleTheme"
        class="mt-8 w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-2xl"
      >
        {{ isDark ? "Light Mode ☀️" : "Dark Mode 🌙" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStoreSettings } from "../composables/useStoreSettings";
import { RouterLink } from "vue-router";
import { useTheme } from "../composables/useTheme";

const { storeSettings } = useStoreSettings();

const {
  isDark,

  toggleTheme,
} = useTheme();
</script>

<style scoped>
.menu {
  @apply block
  flex
  p-3
  rounded-xl
  cursor-pointer
  hover:bg-gray-100
  transition
  dark:text-gray-200
  dark:hover:bg-gray-700;
}

.active {
  @apply bg-black
  text-white;
}
</style>
