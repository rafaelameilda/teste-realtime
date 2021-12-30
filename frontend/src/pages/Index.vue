<template>
  <q-page class="row items-center justify-evenly"> </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageIndex",

  setup() {
    const $q = useQuasar();

    return {};
  },

  created() {
    this.$options.sockets.onmessage = (event: any) => {
      const obj = event.data; //JSON.parse(event.data);

      console.log(obj);
    };
  },

  mounted() {
    setTimeout(() => {
      this.$socket.sendObj({
        dados: "enviando dados do front",
      });
    }, 1000);
  },
});
</script>
