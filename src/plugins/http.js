import axios from "axios";

// 插件模块
const MyHttpServer = {};

MyHttpServer.install = Vue => {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  // 添加实例方法
  Vue.prototype.$http = axios;
};

export default MyHttpServer;
