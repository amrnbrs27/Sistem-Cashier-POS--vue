<template>

  <div
    class="
      bg-white
      dark:bg-gray-800
      rounded-3xl
      p-6
      mt-8
    "
  >

    <h2
      class="
        text-2xl
        font-bold
        dark:text-white
      "
    >
      Produk Terlaris
    </h2>

    <div class="space-y-4 mt-6">

      <div

        v-for="product in topProducts"

        :key="product.name"

        class="
          flex
          justify-between
          items-center
          border-b
          border-gray-200
          dark:border-gray-700
          pb-4
        "
      >

        <div>

          <h3
            class="
              font-semibold
              dark:text-white
            "
          >
            {{ product.name }}
          </h3>

          <p
            class="
              text-sm
              text-gray-500
              dark:text-gray-400
              mt-1
            "
          >
            {{ product.quantity }}
            item terjual
          </p>

        </div>

        <h2
          class="
            text-green-500
            font-bold
          "
        >
          {{ formatRupiah(product.total) }}
        </h2>

      </div>

    </div>

  </div>

</template>

<script setup>

import {

  computed

} from "vue";

import {

  useTransactions

} from "../composables/useTransactions";

import {

  formatRupiah

} from "../utils/formatRupiah";

const {

  transactions

} = useTransactions();

const topProducts = computed(() => {

  const products = {};

  transactions.value.forEach((transaction) => {

    transaction.items.forEach((item) => {

      if (!products[item.name]) {

        products[item.name] = {

          name: item.name,

          quantity: 0,

          total: 0,

        };

      }

      products[item.name].quantity += item.quantity;

      products[item.name].total +=

        item.price * item.quantity;

    });

  });

  return Object.values(products)

    .sort((a, b) => b.quantity - a.quantity)

    .slice(0, 5);

});

</script>