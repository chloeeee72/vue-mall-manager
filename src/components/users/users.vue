<template>
  <el-card class="card">
    <!-- Breadcrumb 面包屑 -->
    <!-- Element 提供了一个separator属性，在el-breadcrumb标签中设置它来决定分隔符，它只能是字符串，默认为斜杠/。 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/users">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索 添加-->
    <el-row class="search-row">
      <el-input
        clearable
        placeholder="请输入内容"
        v-model="query"
        class="input-with-select"
        @clear="loadUserList()"
      >
        <el-button
          slot="append"
          @click="search()"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        class="add-btn"
        plain
        type="success"
        @click="showAddUserDialog()"
        >添加按钮</el-button
      >
    </el-row>

    <!-- 表格 -->
    <!-- :data="userListData":给表格传数据 -->
    <el-table :data="userListData" style="width: 100%">
      <el-table-column label="#" width="100" type="index"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="150">
      </el-table-column>
      <el-table-column label="创建时间" width="100">
        <!-- prop="create_time" -->
        <!-- 如果单元格内显示的内容不是字符串，需要给被显示的内容外部包裹一个template -->
        <template slot-scope="scope">
          <!-- 在子组件中使用父组件的数据，作用域独立,数据不共享，需要传值操作 -->
          <!-- 需要设置父组件中slot-scope属性，该属性的值是要用数据create_time的数据源userlist -->
          <!-- 原理：将el-table绑定数据userlist.row，指的是数组中的每个对象 -->
          {{ scope.row.create_time | fmdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column prop="address" label="操作" mini>
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            @click="showEditUserMsgDialog(scope.row)"
            circle
          ></el-button>
          <!--  -->
          <el-button
            type="success"
            plain
            icon="el-icon-check"
            size="mini"
            circle
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            @click="showDeleteUserMsgBtn(scope.row.id)"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密 码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮 箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电 话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            :disabled="true"
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮 箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电 话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  created() {
    this.getUserList();
  },
  data() {
    return {
      // 输入框内容
      query: "",
      // 分页相关的数据
      // 总数据条数
      total: -1,
      // 当前pagenum
      pagenum: 1,
      // 页总数
      pagesize: 2,
      // 表格绑定的数据
      userListData: [],

      // 添加用户对话框的属性
      dialogFormVisibleAdd: false,
      // 添加用户的表单数据
      // | username | 用户名称 | 不能为空 |
      // | password | 用户密码 | 不能为空 |
      // | email    | 邮箱     | 可以为空 |
      // | mobile   | 手机号   | 可以为空 |
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 对话框表单width
      formLabelWidth: "100px",

      // 编辑用户对话框的属性
      dialogFormVisibleEdit: false
    };
  },
  methods: {
    // 获取数据方法
    // 1、query=""：获取全部数据
    // 2、（用于用户搜索）query有值时：根据query显示数据信息，当前页码，每页显示条数

    // query 查询参数 null
    // pagenum 当前页码 notnull
    // pagesize 每页显示条数 notnull
    async getUserList() {
      // 除了登陆的所有请求都需要授权
      // 需要授权的API，需要在请求头中使用 Authorization 字段提供 token 令牌
      // 设置请求头
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );

      console.log(res);

      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        // 给表格数据赋值
        this.userListData = users;
        // 给total 赋值
        this.total = total;
        // 提示
        // this.$message.success(msg);
      } else {
        // this.$message.warning(msg);
      }
    },

    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(`当前页: ${val}`);
      this.getUserList();
    },

    // 搜索方法
    search() {
      // 直接调用getUserList()方法，根据query的值获取数据
      // 之后重新渲染页面
      this.getUserList();
    },

    // 点击清除输入框，重新获取数据渲染页面
    loadUserList() {
      this.getUserList();
    },

    // 展示添加用户对话框的方法
    showAddUserDialog() {
      this.dialogFormVisibleAdd = true;
    },

    // 添加用户请求
    // | username | 用户名称 | 不能为空 |
    // | password | 用户密码 | 不能为空 |
    // | email    | 邮箱     | 可以为空 |
    // | mobile   | 手机号   | 可以为空 |
    // 弹框中点击确定按钮添加数据的方法
    async addUser() {
      // 授权
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // 发送请求
      const res = await this.$http.post(`users`, this.form);
      console.log(res);
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 201) {
        // 1、提示成功
        this.$message.success(msg);
        // 2、关闭对话框
        // 3、更新视图
        this.getUserList();
        // 4、清空文本框
        // this.form.username = ""
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },

    // 删除用户的方法
    showDeleteUserMsgBtn(userId) {
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          // 删除单个用户请求
          // 1、datalist中找userid
          // 2、把userid以showDeleteUserMsgBtn参数的形式传参
          // | id     | 用户 id  | 不能为空`参数是url参数:id` |
          const res = await this.$http.delete(`users/${userId}`);
          console.log(res);

          if (res.data.meta.status === 200) {
            // 当前分页跳转到第一页
            this.pagenum = 1;
            // 更新视图
            this.getUserList();
            // 提示
            this.$message({
              type: "success",
              message: res.data.meta.msg,
              center: true
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true
          });
        });
    },

    // 显示编辑用户对话框方法
    showEditUserMsgDialog(user) {
      // 获取用户数据
      // 显示对话框
      // console.log(user);
      // user = scope.row
      this.form = user;
      this.dialogFormVisibleEdit = true;
    },

    // 编辑用户发送请求的方法
    editUse() {}
  }
};
</script>

<style>
.input-with-select {
  background-color: #fff;
}

.search-row {
  margin-top: 25px;
}

.input-with-select {
  width: 50%;
}

.add-btn {
  height: 90%;
}
</style>
