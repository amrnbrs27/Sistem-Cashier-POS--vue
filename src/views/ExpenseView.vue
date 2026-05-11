<template>
  <div class="lg:flex">
    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <div
      class="flex-1 p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white"
    >
      <!-- HEADER -->

      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold dark:text-white">Pengeluaran</h1>

          <p class="text-gray-500 dark:text-gray-400 mt-1">
            Management pengeluaran toko
          </p>
        </div>

        <button
          @click="showModal = true"
          class="bg-black text-white px-5 py-3 rounded-2xl"
        >
          Tambah Pengeluaran
        </button>
      </div>

      <!-- TOTAL -->

      <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 mt-8">
        <p class="text-gray-500 dark:text-gray-400">Total Pengeluaran</p>

        <h1 class="text-4xl font-bold mt-3 text-red-500">
          {{ formatRupiah(totalExpense) }}
        </h1>
      </div>

      <!-- LIST -->

      <div class="space-y-4 mt-8">
        <div
          v-for="expense in expenses"
          :key="expense.id"
          class="bg-white dark:bg-gray-800 rounded-3xl p-5"
        >
          <div class="flex justify-between items-center">
            <div>
              <h2 class="font-bold">
                {{ expense.name }}
              </h2>

              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {{ expense.date }}
              </p>
            </div>

            <h2 class="text-xl font-bold text-red-500">
              {{ formatRupiah(expense.amount) }}
            </h2>
          </div>
        </div>
      </div>

      <!-- MODAL -->

      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-md">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold">Tambah Pengeluaran</h2>

            <button @click="showModal = false" class="text-2xl">✕</button>
          </div>

          <!-- FORM -->

          <div class="space-y-4 mt-6">
            <input
              v-model="form.name"
              type="text"
              placeholder="Nama pengeluaran"
              class="w-full p-4 border rounded-2xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              v-model="form.amount"
              type="number"
              placeholder="Jumlah"
              class="w-full p-4 border rounded-2xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <!-- BUTTON -->

          <button
            @click="handleAddExpense"
            class="w-full mt-6 bg-red-500 text-white py-4 rounded-2xl"
          >
            Simpan Pengeluaran
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import Sidebar from "../components/Sidebar.vue";

import { formatRupiah } from "../utils/formatRupiah";

import { useExpenses } from "../composables/useExpenses";

const showModal = ref(false);

const {
  expenses,

  addExpense,

  totalExpense,
} = useExpenses();

const form = ref({
  name: "",
  amount: "",
});

const handleAddExpense = () => {
  if (!form.value.name || !form.value.amount) {
    alert("Semua field wajib diisi");

    return;
  }

  addExpense({
    name: form.value.name,

    amount: Number(form.value.amount),

    date: new Date().toLocaleString(),
  });

  form.value = {
    name: "",
    amount: "",
  };

  showModal.value = false;
};
</script>
