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

##### Login Page:

- [√] 页面布局
- [√] 登陆请求 验证输入框字符串
- [√] 添加异步
- [√] 验证 token => 将 token 存储到 localStorage 中

##### Home Page:

- [√] 页面布局
- [√] 验证 token

###### Home Page 的各个子页面

- [√] header 退出功能：清除 token => 回到 login page
- [ ] 用户管理-用户列表
  - [√] 新建组件和配置路由
  - [√] 引入表格组件->请求并渲染数据
    - 1.需要授权的 API => 设置请求头 => 通过异步方法 this.\$http.get 获取数据
    - 2.一般数据的解构赋值 全局过滤器规范时间格式
    - 3.组件内显示数据
      - ①.Switch 开关
      - ③.操作按钮：添加、删除、编辑
      - ②.编写分页器及其方法 size-change current-change
  - [√] 搜索 => 根据双向绑定获取输入框输入的值 => 重新获取数据并渲染
  - [√] 输入框清除功能，清除后重新获取并渲染数据
  - [ ] Switch 开关操作用户状态码
  - [√] 数据操作-添加用户
    - 点击按钮 => 打开添加弹框 => 清除 form 表单中的数据
      - ①.输入数据 => 点击确定 => 判断数据是否符合规则 => 向后台发送添加请求，将数据添加到列表中 => 更新视图 => 清空文本框
      - ②.点击取消 => 弹框关闭
  - [√] 数据操作-删除用户
    - 点击按钮 => 打开删除弹框 =>
      - ①.点击确定 => 删除用户请求 => 更新视图列表 => 分页跳转到第一页 => 提示消息
      - ②.点击取消 => 弹框关闭 => 提示消息
  - [√] 数据操作-编辑用户
    - 点击按钮 => 打开编辑弹框 =>
      - ①.输入数据 => 点击确定 => 向后台发送添加请求，加入数据列表 => 提示消息 => 更新视图
      - ②.点击取消 => 弹框关闭
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
