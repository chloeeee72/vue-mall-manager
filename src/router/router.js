import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/login/login.vue";
import Home from "@/components/home/home.vue";
import Users from "@/components/users/users.vue"
import Right from "@/components/rights/right.vue"
import Role from "@/components/rights/role.vue"
// import Login from '@/components/login/login.vue'

Vue.use(Router);

export default new Router({
  routes: [{
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
        path: '/users',
        name: 'users',
        component: Users
      }, {
        path: '/right',
        name: 'right',
        component: Right
      }, {
        path: '/role',
        name: 'role',
        component: Role
      }]
    },

  ]
});
