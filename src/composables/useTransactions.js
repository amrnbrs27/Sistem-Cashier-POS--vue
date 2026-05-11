import {
  ref,
  computed,
  watch
} from 'vue'

const transactions = ref(

  JSON.parse(
    localStorage.getItem('transactions')
  ) || []

)

watch(

  transactions,

  (newTransactions) => {

    localStorage.setItem(

      'transactions',

      JSON.stringify(newTransactions)

    )

  },

  {
    deep: true
  }

)

export function useTransactions(){

  // ADD TRANSACTION

  const addTransaction = (transaction) => {

    transactions.value.unshift({

      id: Date.now(),

      ...transaction

    })

  }

  // TOTAL REVENUE

  const totalRevenue = computed(() => {

    return transactions.value.reduce(

      (total, transaction) => {

        return total + transaction.total

      },

      0

    )

  })

  // TOTAL TRANSACTIONS

  const totalTransactions = computed(() => {

    return transactions.value.length

  })

  // TOTAL ITEMS

  const totalItems = computed(() => {

    return transactions.value.reduce(

      (total, transaction) => {

        return total +

          transaction.items.length

      },

      0

    )

  })

  return {

    transactions,

    addTransaction,

    totalRevenue,

    totalTransactions,

    totalItems

  }

}