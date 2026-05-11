<template>
  <div class="lg:flex">
    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <div
      class="flex-1 p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white"
    >
      <!-- HEADER -->

      <h1 class="text-3xl font-bold">Setting Toko</h1>

      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Konfigurasi informasi toko
      </p>

      <!-- FORM -->

      <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 mt-8 max-w-2xl">
        <!-- STORE NAME -->

        <div class="mb-5">
          <label class="font-semibold"> Nama Toko </label>

          <input
            v-model="storeSettings.name"
            type="text"
            class="w-full mt-2 p-4 rounded-2xl border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <!-- ADDRESS -->

        <div class="mb-5">
          <label class="font-semibold"> Alamat </label>

          <input
            v-model="storeSettings.address"
            type="text"
            class="w-full mt-2 p-4 rounded-2xl border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <!-- PHONE -->

        <div>
          <label class="font-semibold"> Nomor Telepon </label>

          <input
            v-model="storeSettings.phone"
            type="text"
            class="w-full mt-2 p-4 rounded-2xl border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <!-- LOGO -->

        <div class="mt-5">
          <label class="font-semibold"> Logo Toko </label>

          <input
            type="file"
            accept="image/*"
            @change="handleLogoUpload"
            class="w-full mt-2 p-4 rounded-2xl border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";

import { useStoreSettings } from "../composables/useStoreSettings";

const { storeSettings } = useStoreSettings();

const handleLogoUpload = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    storeSettings.value.logo = reader.result;
  };

  reader.readAsDataURL(file);
};
</script>
