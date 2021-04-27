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

##### 数据库：（详见：[mall-manager-sever](https://github.com/chloeeee72/mall-manager-sever)）

- mysql + node.js

## todo:

##### Login Page:

- [√] 页面布局
- [√] 登陆请求 验证输入框字符串
- [√] 添加异步
- [√] 验证 token

##### Home Page:

- [√] 页面布局
- [√] 验证 token

###### Home Page 的各个子页面

- [√] header 退出功能：清除 token => 回到 login page
- [ ] 用户管理 -> 用户列表
  - [√] 引入表格组件->请求并渲染数据
    - 1.需要授权的 API=>设置请求头=>通过异步方法 this.\$http.get 获取数据
    - 2.一般数据的解构赋值 全局过滤器规范时间格式
    - 3.组件内显示数据
      - ①.Switch 开关
      - ③.编辑按钮
      - ②.编写分页器及其方法 size-change current-change
  - [√] 新建组件和配置路由
  - [ ] 搜索功能
  - [ ] 添加用户
  - [ ] 删除用户
  - [ ] 编辑用户
  - [ ] ...
- [ ] 权限管理
  - [ ] 角色列表
  - [ ] 权限列表
- [ ] 商品管理
  - [ ] 商品列表
  - [ ] 分类参数
  - [ ] 商品分类
- [ ] 订单管理
  - [ ] 订单列表
- [ ] 数据统计
  - [ ] 数据报表

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
