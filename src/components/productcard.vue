<template>

  <div
    class="bg-white rounded-2xl overflow-hidden shadow-sm"
  >

    <img
      :src="product.image"
      class="w-full h-40 object-cover"
    />

    <div class="p-4">

      <h2 class="font-semibold">
        {{ product.name }}
      </h2>

      <p class="text-gray-500 mt-1">
        Rp {{ product.price.toLocaleString() }}
      </p>

      <button
        class="mt-3 bg-green-500 text-white w-full py-2 rounded-xl"
      >
        Tambah
      </button>

    </div>

  </div>

</template>

<script setup>

defineProps({
  product: Object
})

</script>