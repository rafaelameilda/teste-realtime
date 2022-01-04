<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="enviarMensagem">enviar mensagem</q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

let self: any;
export default defineComponent({
  name: "PageIndex",

  setup() {
    const escutaMensagem = () => {
      self.$options.sockets.onmessage = (event: any) => {
        const obj = JSON.parse(event.data);

        console.log(obj);
      };
    };

    const enviarMensagem = () => {
      setTimeout(() => {
        self.$socket.sendObj({
          mensagem: "enviando dados do front",
          broadcast: true,
        });
      }, 1000);
    };

    return { escutaMensagem, enviarMensagem };
  },

  created() {
    self = this;
    this.escutaMensagem();
  },
});
</script>
