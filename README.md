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

##### http.js:

- [√] 添加 baseUrl，使用 axios
- [√] 添加请求拦截器，在非登陆页设置请求头
- [√] 添加响应拦截器

##### router.js:

- [√] 导航守卫，在路由配置生效之前触发，统一判断 token，router.beforeEach

##### main.js:

- [√] 定义全局面包屑组件 src\components\coscom\myBread.vue
- [√] 定义全局过滤器 处理日期时间格式

##### Login Page:

- [√] 页面布局
- [√] 添加异步

##### Home Page:

- [√] 页面布局
- [√] 页面级权限控制

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
  - [√] 输入框清除功能，清除后重新获取并渲染数据
  - [√] Switch 开关操作用户状态码
  - [√] 数据操作 -> 添加用户
  - [√] 数据操作 -> 删除用户
  - [√] 数据操作 -> 编辑用户
  - [√] 数据角色 -> 分配角色
- [√] 权限管理
  - [√] 角色列表
    - 展开行 el-tag
    - 编辑权限对话框多选表单
  - [√] 权限列表
- [ ] 商品管理
  - [ ] 商品列表
    - [√] 商品列表
      - [√] 列表
    - [√] 添加商品
      - [√] 添加商品布局
      - [√] 添加商品 - 基本信息
      - [√] 添加商品 - 商品参数
      - [√] 添加商品 - 商品属性
      - [ ] 添加商品 - 商品照片
      - [ ] 添加商品 - 商品内容
  - [ ] 分类参数
  - [ ] 商品分类
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
