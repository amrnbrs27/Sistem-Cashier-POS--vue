<template>
  <div
    class="w-64 min-h-screen bg-white border-r p-5"
  >
    <h1 class="text-2xl font-bold mb-1">
      SRBN POS
    </h1>

    <p class="text-gray-500 text-sm mb-10">
      Sistem management penjualan
    </p>

    <div class="space-y-3">

      <div class="menu active">
        Kasir
      </div>

      <div class="menu">
        Dashboard
      </div>

      <div class="menu">
        Riwayat
      </div>

      <div class="menu">
        Produk
      </div>

      <div class="menu">
        Pengaturan
      </div>

      <div class="menu">
        Laporan
      </div>

    </div>
  </div>
</template>

<style scoped>

.menu{
  @apply p-3 rounded-xl cursor-pointer
  hover:bg-gray-100 transition;
}

.active{
  @apply bg-black text-white;
}

</style>