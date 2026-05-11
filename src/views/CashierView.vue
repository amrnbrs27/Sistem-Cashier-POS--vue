<template>
  <div class="lg:flex">
    <!-- MOBILE OVERLAY -->

    <div
      v-if="showMobileSidebar"
      @click="showMobileSidebar = false"
      class="fixed inset-0 bg-black/40 z-40 lg:hidden"
    ></div>
    <!-- DESKTOP SIDEBAR -->

    <div class="hidden lg:block">
      <Sidebar />
    </div>

    <!-- MOBILE SIDEBAR -->

    <div
      :class="[
        'fixed top-0 left-0 z-50 h-full transition-all duration-300 lg:hidden',

        showMobileSidebar ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="relative">
        <Sidebar />

        <!-- CLOSE BUTTON -->

        <button
          @click="showMobileSidebar = false"
          class="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- MAIN CONTENT -->

    <div
      class="flex-1 p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-black dark:text-white"
    >
      <div class="lg:hidden flex justify-between items-center mb-5">
        <h1 class="text-2xl font-bold">CASHIER</h1>

        <button
          @click="showMobileSidebar = true"
          class="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow"
        >
          Menu
        </button>
      </div>
      <div class="hidden lg:block">
        <h1 class="text-2xl lg:text-3xl font-bold dark:text-white">CASHIER</h1>

        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Pilih produk dan proses pembayaran
        </p>
      </div>

      <!-- SEARCH -->

      <input
        v-model="search"
        type="text"
        placeholder="Cari nama produk"
        class="w-full bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 mt-6 p-3 lg:p-4 rounded-2xl border"
      />

      <!-- CATEGORY -->

      <div class="flex gap-3 mt-5">
        <button
          @click="selectedCategory = 'Semua'"
          :class="['category', selectedCategory === 'Semua' ? 'active' : '']"
        >
          Semua
        </button>

        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="['category', selectedCategory === category ? 'active' : '']"
        >
          {{ category }}
        </button>
      </div>

      <!-- PRODUCT GRID -->

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </div>

    <!-- CART -->

    <div
      class="w-full lg:w-96 bg-white dark:bg-gray-800 p-5 border-t lg:border-l lg:border-t-0"
    >
      <div class="flex justify-between items-center ">
        <h2 class="text-2xl font-bold dark:text-white">Keranjang</h2>

        <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          {{ cart.length }}
        </span>
      </div>

      <div class="space-y-4 mt-5">
        <CartItem
          v-for="item in cart"
          :key="item.id"
          :item="item"
          @increase="increaseQty"
          @decrease="decreaseQty"
        />

        <div v-if="cart.length === 0" class="text-center text-gray-400 py-10">
          Keranjang masih kosong
        </div>
      </div>

      <!-- TOTAL -->

      <div class="mt-10">
        <div class="flex justify-between text-xl font-bold dark:text-white">
          <span>Total</span>

          <span>
            {{ formatRupiah(totalPrice) }}
          </span>
        </div>

        <button
          @click="showCheckout = true"
          :disabled="cart.length === 0"
          class="w-full mt-5 bg-green-500 text-white py-4 rounded-2xl disabled:opacity-50"
        >
          Bayar
        </button>

        <button
          @click="clearCart"
          class="w-full mt-3 bg-red-500 text-white py-3 rounded-2xl"
        >
          Kosongkan Keranjang
        </button>
      </div>
    </div>
    <!-- CHECKOUT MODAL -->

    <CheckoutModal
      v-if="showCheckout"
      :total="totalPrice"
      @close="showCheckout = false"
      @success="handleCheckoutSuccess"
    />
  </div>
</template>

<script setup>
import { formatRupiah } from "../utils/formatRupiah";
import CheckoutModal from "../components/CheckoutModal.vue";
import { ref, computed, watch } from "vue";

import Sidebar from "../components/Sidebar.vue";
import ProductCard from "../components/ProductCard.vue";
import CartItem from "../components/CartItem.vue";
import { defaultProducts } from "../data/products";
import { useTransactions } from "../composables/useTransactions";

const { addTransaction } = useTransactions();

const showMobileSidebar = ref(false);
const showCheckout = ref(false);
const products =
  JSON.parse(localStorage.getItem("products")) || defaultProducts;
const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const search = ref("");

const selectedCategory = ref("Semua");

const categories = ["Coffee", "Food", "Non Coffee"];

const filteredProducts = computed(() => {
  return products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchCategory =
      selectedCategory.value === "Semua" ||
      product.category === selectedCategory.value;

    return matchSearch && matchCategory;
  });
});

const addToCart = (product) => {
  if (product.stock <= 0) {
    alert("Stock habis");

    return;
  }

  const existingItem = cart.value.find((item) => item.id === product.id);

  // VALIDASI STOCK

  if (existingItem && existingItem.quantity >= product.stock) {
    alert("Stock tidak mencukupi");

    return;
  }

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({
      ...product,

      quantity: 1,
    });
  }
};

const increaseQty = (id) => {
  const item = cart.value.find((item) => item.id === id);

  if (item) {
    item.quantity++;
  }
};

const decreaseQty = (id) => {
  const item = cart.value.find((item) => item.id === id);

  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart.value = cart.value.filter((item) => item.id !== id);
    }
  }
};

const clearCart = () => {
  cart.value = [];
};
const handleCheckoutSuccess = () => {
  const purchasedItems = [...cart.value];

  addTransaction({
    total: totalPrice.value,

    items: purchasedItems,

    date: new Date().toLocaleString(),
  });

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];

  purchasedItems.forEach((cartItem) => {
    const productIndex = allProducts.findIndex(
      (product) => product.id === cartItem.id,
    );

    if (productIndex !== -1) {
      allProducts[productIndex].stock -= cartItem.quantity;
    }
  });

  localStorage.setItem(
    "products",

    JSON.stringify(allProducts),
  );

  alert("Pembayaran berhasil");

  cart.value = [];

  showCheckout.value = false;
};
const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

watch(
  cart,

  (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  },

  {
    deep: true,
  },
);
</script>

<style scoped>
.category {
  @apply px-4 py-2 rounded-full dark:bg-gray-800;
}

.active {
  @apply bg-green-500 dark:bg-green-500 text-white;
}
</style>
