import Vue from "vue";
import App from "./App.vue";
import VueFuse from "vue-fuse";

Vue.use(VueFuse);
import "./assets/main.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
