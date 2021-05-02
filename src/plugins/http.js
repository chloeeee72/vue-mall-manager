import axios from "axios";

// 插件模块
const MyHttpServer = {};

MyHttpServer.install = Vue => {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

  // 在请求发起之前，除了登陆请求都需要设置请求头
  // const AUTH_TOKEN = localStorage.getItem("token");
  // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;


  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    console.log("触发拦截器");
    
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  // 添加实例方法
  Vue.prototype.$http = axios;
};

export default MyHttpServer;
