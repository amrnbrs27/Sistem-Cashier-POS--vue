<template>
  <div
    class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
  >
    <div class="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl p-6">
      <!-- HEADER -->

      <div class="text-center">
        <h1 class="text-2xl font-bold dark:text-white">
          {{ storeSettings.name }}
        </h1>

        <p class="text-gray-500 dark:text-gray-400 mt-1">Struk Pembayaran</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {{ storeSettings.address }}
        </p>

        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ storeSettings.phone }}
        </p>
      </div>

      <!-- DATE -->

      <div class="mt-6 text-sm text-gray-500 dark:text-gray-400">
        {{ transaction.date }}
      </div>

      <!-- ITEMS -->

      <div class="mt-6 space-y-4">
        <div
          v-for="item in transaction.items"
          :key="item.id"
          class="flex justify-between items-center"
        >
          <div>
            <h2 class="font-semibold dark:text-white">
              {{ item.name }}
            </h2>

            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ item.quantity }} x
              {{ formatRupiah(item.price) }}
            </p>
          </div>

          <h2 class="font-bold dark:text-white">
            {{ formatRupiah(item.price * item.quantity) }}
          </h2>
        </div>
      </div>

      <!-- TOTAL -->

      <div class="border-t mt-6 pt-6 flex justify-between items-center">
        <h2 class="text-xl font-bold dark:text-white">Total</h2>

        <h2 class="text-xl font-bold text-green-500">
          {{ formatRupiah(transaction.total) }}
        </h2>
      </div>

      <!-- BUTTON -->

      <div class="flex gap-3 mt-8">
        <button
          @click="$emit('close')"
          class="flex-1 border py-3 rounded-2xl dark:text-white"
        >
          Tutup
        </button>

        <button
          @click="printReceipt"
          class="flex-1 bg-black dark:bg-white dark:text-black text-white py-3 rounded-2xl"
        >
          Print
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoreSettings } from "../composables/useStoreSettings";

import { formatRupiah } from "../utils/formatRupiah";

const { storeSettings } = useStoreSettings();

const props = defineProps({
  transaction: Object,
});

const printReceipt = () => {
  window.print();
};
</script>
