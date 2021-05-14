import Vue from "vue";
import Router from "vue-router";
// 登陆页
import Login from "@/components/login/login.vue";
// home页
import Home from "@/components/home/home.vue";
// 用户管理
import Users from "@/components/users/users.vue"
// 权限管理
import Right from "@/components/rights/right.vue"
import Role from "@/components/rights/role.vue"
// 商品管理
import GoodsList from '@/components/goods/goodsList.vue'
import GoodsAdd from "@/components/goods/goodsAdd"
import CateParams from '@/components/goods/cateParams.vue'
import GoodsCategories from '@/components/goods/goodsCategories.vue'
// 订单管理
import Orders from "@/components/order/orders.vue"
// 数据管理
import Reports from "@/components/report/reports.vue"
import {
  Message
} from 'element-ui'

Vue.use(Router);

const router = new Router({
  routes: [
    // 根路径重定向到登陆页
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'right',
          component: Right
        },
        {
          path: '/roles',
          name: 'role',
          component: Role
        },
        {
          path: '/goods',
          name: 'goods',
          component: GoodsList,
        },
        {
          path: '/params',
          name: 'cateparams',
          component: CateParams
        },
        {
          path: '/categories',
          name: 'goodscategories',
          component: GoodsCategories
        },
        {
          path: '/goodsadd',
          name: 'goodsadd',
          component: GoodsAdd
        },
        {
          path: '/orders',
          name: 'orders',
          component: Orders
        },
        {
          path: '/reports',
          name: 'reports',
          component: Reports
        }
      ]
    },

  ]
});

// 路由/导航守卫 在路由配置生效之前触发统一判断token
router.beforeEach((to, from, next) => {
  // to -> 要去的路由配置
  // from -> 当前的路由配置
  // console.log(to,from);

  // 要去的是登陆页 -> next()
  // 要去的不是登陆页 -> 判断token
  //       没有token -> Login
  //       有token -> next()

  if (to.path === `/login`) {
    next()
  } else {
    // 获取token
    const token = localStorage.getItem("token");
    // 无token
    if (!token) {
      // this.$router.push({ name: "login" });
      // 提示消息
      Message.warning(
        "请先登录"
      )
      router.push({
        name: "login"
      })
      return
    }
    next()
  }
})
export default router


// // node中间件
// app.use((req.res.next) => {
//   // req.beforeDestroy() 
//   // res.render()
//   // next() 自动调用下一个中间件
//   next()
// })
// app.use((req.res.next) => {
//   // req.beforeDestroy() 
//   // res.render()
//   // next() 自动调用下一个中间件
//   res.send()
//   next()
// })
