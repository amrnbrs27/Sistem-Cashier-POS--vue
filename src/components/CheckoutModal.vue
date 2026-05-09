<template>

  <div
    class="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
    "
  >

    <div
      class="
        bg-white
        rounded-3xl
        w-full
        max-w-md
        p-6
      "
    >

      <div class="flex justify-between items-center">

        <h2 class="text-2xl font-bold">
          Pembayaran
        </h2>

        <button
          @click="$emit('close')"
          class="text-2xl"
        >
          ✕
        </button>

      </div>

      <!-- TOTAL -->

      <div class="mt-6">

        <p class="text-gray-500">
          Total Belanja
        </p>

        <h1 class="text-3xl font-bold mt-1">
          {{ formatRupiah(total) }}
        </h1>

      </div>

      <!-- INPUT -->

      <div class="mt-6">

        <label class="text-sm text-gray-500">
          Uang Pembayaran
        </label>

        <input
          v-model="payment"
          type="number"
          placeholder="Masukkan uang"
          class="
            w-full
            mt-2
            p-4
            border
            rounded-2xl
          "
        />

      </div>

      <!-- KEMBALIAN -->

      <div
        v-if="payment > 0"
        class="mt-6"
      >

        <p class="text-gray-500">
          Kembalian
        </p>

        <h2
          class="
            text-2xl
            font-bold
            mt-1
          "
          :class="
            change >= 0
              ? 'text-green-500'
              : 'text-red-500'
          "
        >
          {{ formatRupiah(change) }}
        </h2>

      </div>

      <!-- BUTTON -->

      <button
        @click="processPayment"
        class="
          w-full
          mt-8
          bg-green-500
          text-white
          py-4
          rounded-2xl
        "
      >
        Bayar Sekarang
      </button>

    </div>

  </div>

</template>

<script setup>

import { ref, computed }
from 'vue'

import {
  formatRupiah
} from '../utils/formatRupiah'

const props = defineProps({
  total: Number
})

const emit = defineEmits([
  'close',
  'success'
])

const payment = ref(0)

const change = computed(() => {

  return payment.value - props.total

})

const processPayment = () => {

  if(payment.value < props.total){

    alert('Uang tidak cukup')

    return

  }

  emit('success')

}

</script>