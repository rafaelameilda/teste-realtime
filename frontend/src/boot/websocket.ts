import { boot } from "quasar/wrappers";
import VueNativeSock from "vue-native-websocket-vue3";

export default boot(({ app }) => {
  app.use(VueNativeSock, "ws://10.69.6.101:3333", {
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
    format: "json",
  });
});

export { VueNativeSock };
