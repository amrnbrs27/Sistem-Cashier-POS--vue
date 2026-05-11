import {
  ref,
  watch
} from "vue";

const storeSettings = ref(

  JSON.parse(

    localStorage.getItem("storeSettings")

  ) || {

    name: "SRBN POS",

    address: "Yogyakarta",

    phone: "08123456789",

    logo: "",

  }

);

watch(

  storeSettings,

  (newValue) => {

    localStorage.setItem(

      "storeSettings",

      JSON.stringify(newValue)

    );

  },

  {
    deep: true
  }

);

export function useStoreSettings(){

  return {

    storeSettings

  }

}