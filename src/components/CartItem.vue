<template>
  <div class="flex justify-between items-center bg-white p-4 rounded-2xl">
    <div>
      <h2 class="font-semibold">
        {{ item.name }}
      </h2>

      <p class="text-sm text-gray-500">
        {{ formatRupiah(item.price) }}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <button
        @click="$emit('decrease', item.id)"
        class="bg-gray-200 w-8 h-8 rounded-full"
      >
        -
      </button>

      <span>
        {{ item.quantity }}
      </span>

      <button
        @click="$emit('increase', item.id)"
        class="bg-green-500 text-white w-8 h-8 rounded-full"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});

defineEmits(["increase", "decrease"]);
import { formatRupiah } from "../utils/formatRupiah";
</script>
