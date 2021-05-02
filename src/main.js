// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
// 组件选项所在的对象
import MyBread from "@/components/coscom/myBread.vue";
import Router from "./router/router";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/reset.css";
import MyHttpServer from "./plugins/http";
import moment from "moment"

Vue.use(ElementUI);
Vue.use(MyHttpServer);
// this.$http.get()
Vue.config.productionTip = false;

// 全局过滤器 处理日期时间格式
Vue.filter('fmdate', (v) => {
  return moment(v).format("YYYY-MM-DD")
})

// 全局自定义组件
Vue.component(MyBread.name, MyBread)
new Vue({
  el: "#app",
  router: Router,
  render: h => h(App)
});
