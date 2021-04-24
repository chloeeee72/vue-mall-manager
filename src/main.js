// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import Router from "./router/router";
import MyServerHttp from "./plugins/http"

import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/reset.css";
import MyHttpServer from "./plugins/http";

Vue.use(ElementUI);
Vue.use(MyHttpServer);
// this.$http.get()
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router: Router,
  render: h => h(App)
});
