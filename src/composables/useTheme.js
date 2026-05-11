import {
  ref,
  watch
} from 'vue'

const isDark = ref(

  JSON.parse(

    localStorage.getItem('darkMode')

  ) || false

)

// APPLY THEME

const applyTheme = () => {

  if(isDark.value){

    document.documentElement.classList.add(

      'dark'

    )

  }else{

    document.documentElement.classList.remove(

      'dark'

    )

  }

}

// INITIAL

applyTheme()

watch(

  isDark,

  (value) => {

    localStorage.setItem(

      'darkMode',

      JSON.stringify(value)

    )

    applyTheme()

  }

)

export function useTheme(){

  const toggleTheme = () => {

    isDark.value = !isDark.value

  }

  return {

    isDark,

    toggleTheme

  }

}