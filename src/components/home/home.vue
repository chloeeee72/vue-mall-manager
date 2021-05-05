<template>
  <el-container class="container">
    <!-- header -->
    <!-- 开启路由模式 :rules="true" -->
    <!-- el-menu-item index属性值为router -->
    <el-header class="el-header">
      <el-row>
        <!-- dropdown -->
        <!-- <el-col :span="4" class="el-header-dropdown">
          <el-dropdown>
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
            <span>{{ username }}</span>
          </el-dropdown>
        </el-col> -->
        <!-- title -->
        <el-col :span="18" class="el-header-title">
          电商管理系统
        </el-col>
        <!-- signout -->
        <el-col :span="2" class="el-header-signout">
          <a href="#" class="singout" @click.prevent="handleSignout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <!-- main & aside -->
    <el-container class="el-adide-main-container">
      <!-- aside -->
      <el-aside class="el-aside">
        <el-menu :unique-opened="true" :router="true">
          <!-- :router="true" => 开启路由模式 -->
          <!-- :unique-opened="true"  =>  只保存一个子菜单的展开 -->
          <!-- :default-openeds="['1']" => 默认打开第一个子菜单 -->
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              用户管理
            </template>

            <el-menu-item-group>
              <!-- 绑定路由 -->
              <el-menu-item :index="router.user">
                <i class="el-icon-document"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              权限管理
            </template>

            <el-menu-item-group>
              <el-menu-item index="role">
                <i class="el-icon-postcard"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="right">
                <i class="el-icon-warning-outline"></i>
                权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              商品管理
            </template>

            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-shopping-cart-2"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-paperclip"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-more-outline"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              订单管理
            </template>

            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              数据统计
            </template>

            <el-menu-item-group>
              <el-menu-item index="5-1">
                <i class="el-icon-pie-chart"></i>
                数据报表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 获取token
  // if token 有 => 继续渲染组件
  // if token 无 => 登陆页
  beforeCreate() {
    // 获取token
    const token = localStorage.getItem("token");
    // 无token
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },

  mounted() {
    this.res = this.$route.params.res;
    this.username = this.res.data.data.username;
  },
  data() {
    return {
      res: "",
      username: "",
      router: {
        user: "/users"
      }
    };
  },

  methods: {
    handleSignout() {
      // 清除token => 提示 => 回到login page
      localStorage.clear();
      this.$message({
        type: "success",
        message: "退出成功"
      });
      console.log("退出成功 => to login page");
      this.$router.push({ name: "login", params: { res: this.res } });
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  width: 100%;
  padding: 0%;
  margin: 0%;
}

.el-header {
  height: 100%;
  width: 100%;
  background-color: #b1c4db;
  color: #333;
  display: inline-block;
  /* text-align: center;
  align-items: center; */
  line-height: 60px;
}

/* .el-header-dropdown {
  font-size: 16px;
} */

.el-header-title {
  /* display: flex;
  text-align: center; */
  font-size: 22px;
  font-weight: bold;
}

/* .el-icon-setting {
  margin-right: 10px;
} */
.el-header-signout {
  position: absolute;
  right: 0px;
}
.el-header-signout > a {
  text-decoration: none;
  color: #f00;
}

.el-adide-main-container {
  height: 500px;
  border: 1px solid #eee;
}

.el-aside {
  width: 160px;
  background-color: rgb(208, 217, 233);
}

.el-main {
  background-color: rgb(238, 241, 246);
}
</style>
