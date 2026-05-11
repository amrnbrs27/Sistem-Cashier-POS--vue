<template>
  <div class="lg:flex">
    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <div
      class="flex-1 p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white"
    >
      <h1 class="text-3xl font-bold dark:text-white">Riwayat Transaksi</h1>

      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Semua transaksi pembayaran
      </p>

      <!-- EMPTY -->

      <div
        v-if="transactions.length === 0"
        class="mt-10 bg-white dark:bg-gray-800 rounded-2xl p-10 text-center text-gray-400"
      >
        Belum ada transaksi
      </div>

      <!-- LIST -->

      <div v-else class="space-y-4 mt-8">
        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="bg-white dark:bg-gray-800 rounded-2xl p-5"
        >
          <div class="flex justify-between items-center">
            <div>
              <h2 class="font-bold">Transaction #{{ transaction.id }}</h2>

              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {{ transaction.date }}
              </p>
              <!-- ITEMS -->

              <div class="mt-4 space-y-2">
                <div
                  v-for="item in transaction.items"
                  :key="item.id"
                  class="flex justify-between text-sm"
                >
                  <div>
                    <span class="font-medium">
                      {{ item.name }}
                    </span>

                    <span class="text-gray-500 dark:text-gray-400">
                      x{{ item.quantity }}
                    </span>
                  </div>

                  <span class="text-gray-500 dark:text-gray-400">
                    {{ formatRupiah(item.price * item.quantity) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="border-t my-4"></div>
            <h2 class="text-xl font-bold text-green-500">
              {{ formatRupiah(transaction.total) }}
            </h2>
            <button
              @click="openReceipt(transaction)"
              class="mt-4 bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-2xl"
            >
              Lihat Struk
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ReceiptModal

  v-if="showReceipt"

  :transaction="selectedTransaction"

  @close="showReceipt = false"

/>
</template>

<script setup>
import { ref } from "vue";

import Sidebar from "../components/Sidebar.vue";

import { formatRupiah } from "../utils/formatRupiah";

import ReceiptModal from "../components/ReceiptModal.vue";

const showReceipt = ref(false);

const selectedTransaction = ref(null);

const openReceipt = (transaction) => {
  selectedTransaction.value = transaction;

  showReceipt.value = true;
};

const transactions = ref(
  JSON.parse(localStorage.getItem("transactions")) || [],
);
</script>
