<template>

  <div class="lg:flex">

    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <div
      class="
        flex-1
        p-4
        lg:p-6
        bg-gray-100
        min-h-screen
      "
    >

      <!-- HEADER -->

      <div
        class="
          flex
          justify-between
          items-center
        "
      >

        <div>

          <h1 class="text-3xl font-bold">
            Pengeluaran
          </h1>

          <p class="text-gray-500 mt-1">
            Management pengeluaran toko
          </p>

        </div>

        <button
          @click="showModal = true"
          class="
            bg-black
            text-white
            px-5
            py-3
            rounded-2xl
          "
        >
          Tambah Pengeluaran
        </button>

      </div>

      <!-- TOTAL -->

      <div
        class="
          bg-white
          rounded-3xl
          p-6
          mt-8
        "
      >

        <p class="text-gray-500">
          Total Pengeluaran
        </p>

        <h1
          class="
            text-4xl
            font-bold
            mt-3
            text-red-500
          "
        >
          {{ formatRupiah(totalExpense) }}
        </h1>

      </div>

      <!-- LIST -->

      <div class="space-y-4 mt-8">

        <div

          v-for="expense in expenses"

          :key="expense.id"

          class="
            bg-white
            rounded-3xl
            p-5
          "
        >

          <div
            class="
              flex
              justify-between
              items-center
            "
          >

            <div>

              <h2 class="font-bold">
                {{ expense.name }}
              </h2>

              <p
                class="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                {{ expense.date }}
              </p>

            </div>

            <h2
              class="
                text-xl
                font-bold
                text-red-500
              "
            >
              {{ formatRupiah(expense.amount) }}
            </h2>

          </div>

        </div>

      </div>

      <!-- MODAL -->

      <div

        v-if="showModal"

        class="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          p-4
          z-50
        "
      >

        <div
          class="
            bg-white
            rounded-3xl
            p-6
            w-full
            max-w-md
          "
        >

          <div
            class="
              flex
              justify-between
              items-center
            "
          >

            <h2 class="text-2xl font-bold">
              Tambah Pengeluaran
            </h2>

            <button
              @click="showModal = false"
              class="text-2xl"
            >
              ✕
            </button>

          </div>

          <!-- FORM -->

          <div class="space-y-4 mt-6">

            <input
              v-model="form.name"
              type="text"
              placeholder="Nama pengeluaran"
              class="
                w-full
                p-4
                border
                rounded-2xl
              "
            />

            <input
              v-model="form.amount"
              type="number"
              placeholder="Jumlah"
              class="
                w-full
                p-4
                border
                rounded-2xl
              "
            />

          </div>

          <!-- BUTTON -->

          <button
            @click="addExpense"
            class="
              w-full
              mt-6
              bg-red-500
              text-white
              py-4
              rounded-2xl
            "
          >
            Simpan Pengeluaran
          </button>

        </div>

      </div>

    </div>

  </div>

</template>

<script setup>

import {
  ref,
  computed,
  watch
} from 'vue'

import Sidebar
from '../components/Sidebar.vue'

import {
  formatRupiah
} from '../utils/formatRupiah'

const expenses = ref(

  JSON.parse(
    localStorage.getItem('expenses')
  ) || []

)

const showModal = ref(false)

const form = ref({

  name: '',
  amount: ''

})

watch(

  expenses,

  (newExpenses) => {

    localStorage.setItem(

      'expenses',

      JSON.stringify(newExpenses)

    )

  },

  {
    deep: true
  }

)

const totalExpense = computed(() => {

  return expenses.value.reduce(

    (total, expense) => {

      return total + Number(expense.amount)

    },

    0

  )

})

const addExpense = () => {

  if(

    !form.value.name ||

    !form.value.amount

  ){

    alert('Semua field wajib diisi')

    return

  }

  expenses.value.unshift({

    id: Date.now(),

    name: form.value.name,

    amount: Number(form.value.amount),

    date: new Date().toLocaleString()

  })

  form.value = {

    name: '',
    amount: ''

  }

  showModal.value = false

}

</script>