import {
  ref,
  computed,
  watch
} from 'vue'

const expenses = ref(

  JSON.parse(
    localStorage.getItem('expenses')
  ) || []

)

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

export function useExpenses(){

  // ADD EXPENSE

  const addExpense = (expense) => {

    expenses.value.unshift({

      id: Date.now(),

      ...expense

    })

  }

  // DELETE EXPENSE

  const deleteExpense = (id) => {

    expenses.value = expenses.value.filter(

      expense => expense.id !== id

    )

  }

  // TOTAL EXPENSE

  const totalExpense = computed(() => {

    return expenses.value.reduce(

      (total, expense) => {

        return total + expense.amount

      },

      0

    )

  })

  return {

    expenses,

    addExpense,

    deleteExpense,

    totalExpense

  }

}