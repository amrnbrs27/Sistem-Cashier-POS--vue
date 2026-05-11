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
          <h1 class="text-3xl font-bold dark:text-white">Produk</h1>

          <p class="text-gray-500 dark:text-gray-400 mt-1">
            Management produk toko
          </p>
        </div>

        <button
          @click="showModal = true"
          class="bg-black text-white px-5 py-3 rounded-2xl"
        >
          Tambah Produk
        </button>
      </div>

      <!-- PRODUCT GRID -->

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden"
        >
          <img :src="product.image" class="w-full h-48 object-cover" />

          <div class="p-5">
            <h2 class="text-xl font-bold">
              {{ product.name }}
            </h2>

            <p class="text-gray-500 dark:text-gray-400 mt-1">
              {{ product.category }}
            </p>

            <div class="mt-3">
              <span
                class="px-3 py-1 rounded-full text-sm"
                :class="
                  product.stock <= 5
                    ? 'bg-red-100 text-red-500'
                    : 'bg-green-100 text-green-500'
                "
              >
                Stock:
                {{ product.stock }}
              </span>
            </div>

            <h2 class="text-green-500 font-bold mt-3">
              {{ formatRupiah(product.price) }}
            </h2>
            <div class="flex gap-3 mt-5">
              <button
                @click="editProduct(product)"
                class="flex-1 bg-blue-500 text-white py-3 rounded-2xl"
              >
                Edit
              </button>

              <button
                @click="deleteProduct(product.id)"
                class="flex-1 bg-red-500 text-white py-3 rounded-2xl"
              >
                Hapus
              </button>
            </div>
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
            <h2 class="text-2xl font-bold">
              {{ isEdit ? "Edit Produk" : "Tambah Produk" }}
            </h2>

            <button @click="closeModal" class="text-2xl">✕</button>
          </div>

          <!-- FORM -->

          <div class="space-y-4 mt-6">
            <input
              v-model="form.name"
              type="text"
              placeholder="Nama produk"
              class="w-full p-4 border rounded-2xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              v-model="form.price"
              type="number"
              placeholder="Harga"
              class="w-full p-4 border rounded-2xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <input
              v-model="form.stock"
              type="number"
              placeholder="Stock produk"
              class="w-full p-4 border rounded-2xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <select
              v-model="form.category"
              class="w-full p-4 border rounded-2xl"
            >
              <option value="">Pilih kategori</option>

              <option value="Coffee">Coffee</option>

              <option value="Food">Food</option>

              <option value="Non Coffee">Non Coffee</option>
            </select>

            <div>
              <label class="text-sm text-gray-500 dark:text-gray-400">
                Upload Gambar
              </label>

              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="w-full mt-2 p-3 border rounded-2xl bg-white dark:bg-gray-800"
              />
              <img
                v-if="form.image"
                :src="form.image"
                class="w-full h-40 object-cover rounded-2xl mt-4"
              />
            </div>
          </div>

          <!-- BUTTON -->

          <button
            @click="handleSubmit"
            class="w-full mt-6 bg-green-500 text-white py-4 rounded-2xl"
          >
            {{ isEdit ? "Update Produk" : "Simpan Produk" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import Sidebar from "../components/Sidebar.vue";

import { formatRupiah } from "../utils/formatRupiah";

import { useProducts } from "../composables/useProducts";

const {
  products,

  addProduct,

  deleteProduct,

  updateProduct,
} = useProducts();
const showModal = ref(false);
const isEdit = ref(false);

const selectedProductId = ref(null);

const form = ref({
  name: "",
  price: "",
  category: "",
  stock: "",
  image: "",
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    form.value.image = reader.result;
  };

  reader.readAsDataURL(file);
};

const closeModal = () => {
  showModal.value = false;

  isEdit.value = false;

  selectedProductId.value = null;

  form.value = {
    name: "",
    price: "",
    category: "",
    image: "",
  };
};

const editProduct = (product) => {
  isEdit.value = true;

  showModal.value = true;

  selectedProductId.value = product.id;

  form.value = {
    ...product,
  };
};

const handleSubmit = () => {
  if (
    !form.value.name ||
    !form.value.price ||
    !form.value.category ||
    !form.value.image
  ) {
    alert("Semua field wajib diisi");

    return;
  }

  if (isEdit.value) {
    updateProduct(
      selectedProductId.value,

      form.value,
    );
  } else {
    addProduct(form.value);
  }

  form.value = {
    name: "",
    price: "",
    category: "",
    image: "",
  };

  isEdit.value = false;

  selectedProductId.value = null;

  showModal.value = false;
};
</script>
