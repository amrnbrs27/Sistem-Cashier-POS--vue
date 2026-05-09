<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
    <img :src="product.image" class="w-full h-40 object-cover" />

    <div class="p-4">
      <h2 class="font-semibold">
        {{ product.name }}
      </h2>

      <p class="text-gray-500 mt-1">
        {{ formatRupiah(product.price) }}
      </p>

      <p
        class="text-sm mt-2"
        :class="product.stock <= 5 ? 'text-red-500' : 'text-green-500'"
      >
        Stock:
        {{ product.stock }}
      </p>

      <button
        @click="$emit('add-to-cart', product)"
        :disabled="product.stock <= 0"
        class="mt-3 w-full py-2 rounded-xl text-white"
        :class="product.stock <= 0 ? 'bg-gray-400' : 'bg-green-500'"
      >
        {{ product.stock <= 0 ? "Stock Habis" : "Tambah" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { formatRupiah } from "../utils/formatRupiah";

defineProps({
  product: Object,
});

defineEmits(["add-to-cart"]);
</script>
