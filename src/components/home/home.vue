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
          <!-- 侧边栏，v-for遍历显示 -->
          <el-submenu
            :index="'' + item1.order"
            v-for="(item1, index) in menus"
            :key="index"
          >
            <template slot="title">
              <i :class="iconList[index]"></i>
              {{ item1.authName }}
            </template>

            <!-- 绑定路由 -->
            <el-menu-item
              v-for="(item2, index) in item1.children"
              :key="index"
              :index="item2.path"
            >
                <i class="el-icon-document"> </i>
                {{ item2.authName }}
            </el-menu-item>
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
  // beforeCreate() {
  //   // 获取token
  //   const token = localStorage.getItem("token");
  //   // 无token
  //   if (!token) {
  //     this.$router.push({ name: "login" });
  //   }
  // },

  // 以上代码在router.js中

  data() {
    return {
      menus: [],
      iconList: [
        // 角色
        {
          "el-icon-user": "el-icon-document"
        }, // 权限 角色 权限
        {
          "el-icon-warning-outline": ["el-icon-view", "el-icon-open"]
        }, // 商品管理
        {
          "el-icon-goods": [
            "el-icon-tickets",
            "el-icon-data-analysis",
            "el-icon-folder-opened"
          ]
        }, // 订单管理 列表 参数 分类
        { "el-icon-tickets": "el-icon-shopping-cart-2" },
        // 数据
        { "el-icon-pie-chart": "el-icon-data-line" }
      ]
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    // 动态 - 获取导航数据
    async getMenus() {
      const res = await this.$http.get(`menus`);
      this.menus = res.data.data;
      // console.log( this.menus);
      
    },
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
