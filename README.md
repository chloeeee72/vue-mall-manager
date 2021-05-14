# mallmanager

> 电商后台管理系统，基于 vue.js 开发

## 技术栈：

- vue.js
- element ui
- router
- axios

##### 前端项目工程化与模块化：

- webpack
- npm
- ...

##### 后台数据库：（详见：[mall-manager-sever](https://github.com/chloeeee72/mall-manager-sever)）

- mysql + node.js

## todo:

- 鉴权
- 每个页面都会跳转到 home page，在 home page 中进行页面级权限控制
  - 其他做法：
  - 在路由守卫中拦截，针对没有权限的模块进行重定向
  - （不足：每次访问模块都需要鉴权，模块数量过多时会影响系统性能）
  - 也可以用 vue-router 2.x 版本新加的 API addRouters 动态添加路由信息
  - （不足：首次加载须有解析和添加，多跳转一次路由）
- API 封装
  - 环境的切换 ×
  - 响应拦截 -> 拦截器返回响应数据 axios.interceptors.response.use http.js
  - 封装 ajax 请求方法 http.js
  - api 的统一管理 api.js -> import http.js

##### http.js:

- [√] 添加 baseUrl，使用 axios
- [√] 设置请求超时
- [√] 添加请求拦截器，添加请求头
- [√] 添加响应拦截器
- [ ] 封装 ajax 请求方法

##### router.js:

- [√] 导航守卫，在路由配置生效之前触发，统一判断 token，router.beforeEach

##### api.js:

- [ ] api 的统一管理

##### main.js:

- [√] 定义全局面包屑组件 src\components\coscom\myBread.vue
- [√] 定义全局过滤器 处理日期时间格式

##### Login Page:

- [√] 页面布局
- [√] 添加异步

##### Home Page:

- [√] 页面布局
- [√] 页面级权限控制，根据登陆角色动态获取导航数据

###### Home Page 的各个子页面

- [√] header 退出功能
- [√] 用户管理-用户列表
  - [√] 新建组件和配置路由
  - [√] 引入表格组件 -> 请求并渲染数据
    - 一般数据的解构赋值 全局过滤器规范时间格式
    - 组件内显示数据
      - ①.Switch 开关
      - ③.操作按钮：删除（弹窗）、添加、编辑、分配角色（对话框）
      - ②.编写分页器及其方法
  - [√] 搜索功能
  - [√] Switch 开关操作用户状态码
  - [√] 操作按钮 - 添加用户
  - [√] 操作按钮 - 删除用户
  - [√] 操作按钮 - 编辑用户
  - [√] 操作按钮 - 分配角色
- [√] 权限管理
  - [√] 角色列表
    - [√] 展开行
    - [ ] 添加角色对话框
    - [ ] 操作按钮 - 删除角色
    - [ ] 操作按钮 - 编辑角色
    - [√] 编辑权限对话框 - 多选表单
  - [√] 权限列表
- [ ] 商品管理
  - [√] 商品列表
    - [√] 商品列表
      - [√] 搜索
      - [√] 列表
      - [√] 添加商品页面
        - [√] 添加商品布局
        - [√] 添加商品 - 基本信息
        - [√] 添加商品 - 商品参数
        - [√] 添加商品 - 商品属性
        - [√] 添加商品 - 商品照片
        - [√] 添加商品 - 商品内容
  - [ ] 分类参数
    - [√] 三级分类
    - [√] 动态参数列表
      - [√] 列表
      - [ ] 设置动态参数对话框
      - [√] 展开行 - 添加参数
      - [√] 展开行 - 删除参数
      - [ ] 操作按钮 - 编辑属性
      - [ ] 操作按钮 - 删除属性
    - [√] 静态参数列表
      - [√] 列表
      - [ ] 设置静态参数对话框
      - [ ] 操作按钮 - 编辑属性
      - [ ] 操作按钮 - 删除属性
  - [ ] 商品分类
    - [√] 添加分类对话框
    - [√] 列表
    - [√] 展开列表 - 树形结构
    - [ ] 操作按钮 - 编辑分类
    - [ ] 操作按钮 - 删除分类
- [ ] 订单管理
  - [ ] 订单列表
- [ ] 数据统计
  - [ ] 数据报表

<!-- 代码行数： -->
<!-- ^b*[^:b#/]+.*$ -->

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
