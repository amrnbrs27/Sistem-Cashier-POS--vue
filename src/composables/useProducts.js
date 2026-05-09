import {
  ref,
  watch
} from 'vue'

import {
  defaultProducts
} from '../data/products'

const products = ref(

  JSON.parse(
    localStorage.getItem('products')
  ) || defaultProducts

)

watch(

  products,

  (newProducts) => {

    localStorage.setItem(

      'products',

      JSON.stringify(newProducts)

    )

  },

  {
    deep: true
  }

)

export function useProducts(){

  // ADD PRODUCT

  const addProduct = (product) => {

    products.value.unshift({

      id: Date.now(),

      ...product

    })

  }

  // DELETE PRODUCT

  const deleteProduct = (id) => {

    products.value = products.value.filter(

      product => product.id !== id

    )

  }

  // UPDATE PRODUCT

  const updateProduct = (

    id,
    updatedProduct

  ) => {

    products.value = products.value.map(

      product => {

        if(product.id === id){

          return {

            ...updatedProduct,

            id

          }

        }

        return product

      }

    )

  }

  return {

    products,

    addProduct,

    deleteProduct,

    updateProduct

  }

}