// Forces TS to apply `@quasar/app` augmentations of `quasar` package
// Removing this would break `quasar/wrappers` imports as those typings are declared
//  into `@quasar/app`
// As a side effect, since `@quasar/app` reference `quasar` to augment it,
//  this declaration also apply `quasar` own
//  augmentations (eg. adds `$q` into Vue component context)
/// <reference types="@quasar/app" />
import VueNativeSock from "vue-native-websocket-vue3";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $socket: any;
  }
}
