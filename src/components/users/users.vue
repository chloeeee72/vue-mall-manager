<template>
  <el-card class="card">
    <!-- Breadcrumb 面包屑 -->
    <!-- Element 提供了一个separator属性，在el-breadcrumb标签中设置它来决定分隔符，它只能是字符串，默认为斜杠/。 -->
    <my-bread level1="用户管理"
              level2="用户列表"></my-bread>

    <!-- 搜索 添加-->
    <el-row class="search-row">
      <el-input clearable
                placeholder="请输入内容"
                v-model="query"
                class="input-with-select"
                @clear="loadUserList()">
        <el-button slot="append"
                   @click="search()"
                   icon="el-icon-search"></el-button>
      </el-input>
      <el-button class="add-btn"
                 plain
                 type="success"
                 @click="showAddUserDialog()">添加按钮</el-button>
    </el-row>

    <!-- 表格 -->
    <!-- :data="userListData":给表格传数据 -->
    <el-table :header-cell-style="centerTableData"
              :cell-style="centerTableData"
              :data="userListData"
              style="width: 100%">
      <el-table-column label="#"
                       width="100"
                       type="index"> </el-table-column>
      <el-table-column prop="username"
                       label="姓名"
                       width="100">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       width="150"> </el-table-column>
      <el-table-column prop="mobile"
                       label="电话"
                       width="150">
      </el-table-column>
      <el-table-column label="创建时间"
                       width="100">
        <!-- prop="create_time" -->
        <!-- 如果单元格内显示的内容不是字符串，需要给被显示的内容外部包裹一个template -->
        <template slot-scope="scope">
          <!-- 在子组件中使用父组件的数据，作用域独立,数据不共享，需要传值操作 -->
          <!-- 需要设置父组件中slot-scope属性，该属性的值是要用数据create_time的数据源userlist -->
          <!-- 原理：将el-table绑定数据userlist.row，指的是数组中的每个对象 -->
          {{ scope.row.create_time | fmdate }}
        </template>
      </el-table-column>
      <!-- switch 开关 -->
      <el-table-column label="用户状态"
                       width="100">
        <template slot-scope="scope">
          <el-switch @change="changeMgState(scope.row)"
                     v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column prop="address"
                       label="操作"
                       mini>
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button type="primary"
                     plain
                     icon="el-icon-edit"
                     size="mini"
                     @click="showEditUserMsgDialog(scope.row)"
                     circle></el-button>

          <!-- 删除按钮 -->
          <el-button type="danger"
                     plain
                     icon="el-icon-delete"
                     @click="showDeleteUserMsgBtn(scope.row.id)"
                     size="mini"
                     circle></el-button>

          <!-- 修改用户角色 -->
          <el-button type="success"
                     plain
                     icon="el-icon-check"
                     @click="showSetUserRoleDialog(scope.row)"
                     size="mini"
                     circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagenum"
                   :page-sizes="[2, 5, 10, 20]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名"
                      :label-width="formLabelWidth">
          <el-input v-model="form.username"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密 码"
                      :label-width="formLabelWidth">
          <el-input v-model="form.password"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮 箱"
                      :label-width="formLabelWidth">
          <el-input v-model="form.email"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电 话"
                      :label-width="formLabelWidth">
          <el-input v-model="form.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户"
               :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名"
                      :label-width="formLabelWidth">
          <el-input :disabled="true"
                    v-model="form.username"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮 箱"
                      :label-width="formLabelWidth">
          <el-input v-model="form.email"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电 话"
                      :label-width="formLabelWidth">
          <el-input v-model="form.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary"
                   @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户角色对话框 -->
    <el-dialog title="分配角色"
               :visible.sync="dialogFormVisibleSetUserRole">
      <el-form :model="form">
        <el-form-item label="用户名"
                      :label-width="formLabelWidth">
          {{ currUsername }}
        </el-form-item>
        <el-form-item label="角色"
                      :label-width="formLabelWidth">
          <!-- {{currRoleId}} -->
          <!-- 在下拉列表中动态显示所有的角色名 role_id-->
          <el-select v-model="currRoleId">
            <el-option label="请选择"
                       :value="-1"></el-option>
            <el-option :label="item.roleName"
                       :value="item.id"
                       v-for="(item, i) in roles"
                       :key="i"></el-option>
            <!-- 如果外层select的绑定是数据的值 和 option的value一样，就会显示option的label值 -->
            <!-- 在data中声明currRoleId = -1：当角色没有角色名的时候显示"请选择"-->
            <!-- item：遍历roles i：下标-->
            <!-- 当选择下拉框的值的时候 -> 改变label的值 -> 显示该label -> 改变了value的值-->
            <!-- 外层select v-model绑定的值 与 option的value值会自动关联  -> currRoleId = value = i -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisibleSetUserRole = false">取 消</el-button>
        <el-button type="primary"
                   @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  created () {
    this.getUserList();
  },
  data () {
    return {
      // 输入框内容
      query: "",
      // 分页相关的数据
      // 总数据条数
      total: -1,
      // 当前pagenum
      pagenum: 1,
      // 页总数
      pagesize: 5,
      // 表格绑定的数据
      userListData: [],

      // 显示添加用户对话框的属性
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
      formLabelWidth: "120px",

      // 显示编辑用户对话框的属性
      dialogFormVisibleEdit: false,

      // 显示分配角色对话框的属性
      dialogFormVisibleSetUserRole: false,
      // 分配角色对话框 下拉选项的绑定值
      currRoleId: -1,
      // 下拉选要显示的username
      currUsername: "",
      // 用户角色名列表
      roles: [],

      // 修改用户角色 - 发送请求属性
      currUserId: -1
    };
  },
  methods: {
    // 表格居中
    centerTableData () {
      return "text-align:center";
    },
    // 获取数据方法
    // 1、query=""：获取全部数据
    // 2、（用于用户搜索）query有值时：根据query显示数据信息，当前页码，每页显示条数

    // query 查询参数 null
    // pagenum 当前页码 notnull
    // pagesize 每页显示条数 notnull
    async getUserList () {
      // 除了登陆的所有请求都需要授权
      // 需要授权的API，需要在请求头中使用 Authorization 字段提供 token 令牌
      // 在http.js的拦截器里设置请求头

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );

      // console.log(res);

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
        this.$message.warning(msg);
      }
    },

    // 分页方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange (val) {
      this.pagenum = val;
      console.log(`当前页: ${val}`);
      this.getUserList();
    },

    // 搜索方法
    search () {
      // 直接调用getUserList()方法，根据query的值获取数据
      // 之后重新渲染页面
      this.getUserList();
    },

    // 点击清除输入框，重新获取数据渲染页面
    loadUserList () {
      this.getUserList();
    },

    // 展示添加用户对话框的方法
    showAddUserDialog () {
      // 清空form表单中的数据
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },

    // 添加用户请求
    // | username | 用户名称 | 不能为空 |
    // | password | 用户密码 | 不能为空 |
    // | email    | 邮箱     | 可以为空 |
    // | mobile   | 手机号   | 可以为空 |
    // 弹框中点击确定按钮添加数据的方法
    async addUser () {
      // 授权
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // 发送请求
      const res = await this.$http.post(`users`, this.form);
      // console.log(res);
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
      this.dialogFormVisibleAdd = false;
    },

    // 删除用户的方法
    showDeleteUserMsgBtn (userId) {
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
          // console.log(res);

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

    // 编辑用户 - 显示对话框方法
    showEditUserMsgDialog (user) {
      // 用户点击编辑按钮 => 获取用户数据显示在对话框中
      // console.log(user);
      // user = scope.row
      this.form = user;
      this.dialogFormVisibleEdit = true;
    },

    // 编辑用户 - 发送请求的方法
    async editUser () {
      // 用户输入信息 => 点击确定按钮 => 发送请求 => 关闭对话框 => 显示提示消息 => 更新列表
      // 在打开对话框时。this.form已经被赋值
      const res = await this.$http
        .put(`users/${this.form.id}`, this.form)
        .then(res => {
          this.$message.success(res.data.meta.msg);
        });
      this.dialogFormVisibleEdit = false;
      this.getUserList();
      // 在点击添加按钮，添加弹框的表单会显示数据，
      // 此时，与添加按钮的方法使用同一个form，需要在add方法中清空form数据
    },

    // switch - 修改状态
    // | uId    | 用户 ID  | 不能为空`携带在url中`                       |
    // | type   | 用户状态 | 不能为空`携带在url中`，值为 true 或者 false |
    async changeMgState (user) {
      const res = await this.$http
        .put(`users/${user.id}/state/${user.mg_state}`)
        .then(res => {
          this.$message.success(res.data.meta.msg);
        });
      // console.log(res);
    },

    // 编辑用户 - 修改用户角色 - 打开对话框显示数据
    // - 请求路径：users/:id
    // - 请求方法：get
    // | id     | 用户 ID  | 不能为空`携带在url中` |
    // - 请求路径：users/:id/role
    // - 请求方法：put
    // | id     | 用户 ID  | 不能为空`参数是url参数:id` |
    // | rid    | 角色 id  | 不能为空`参数body参数`     |
    async showSetUserRoleDialog (user) {
      // 赋值要显示的username
      this.currUsername = user.username;
      // 在打开对话框时。给currUserId赋值
      this.currUserId = user.id;
      // 获取所有的角色,动态显示下拉框的所有角色名
      const res1 = await this.$http.get(`roles`);
      this.roles = res1.data.data;
      // 获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`);
      // console.log(res1);
      // 当前角色的roleName 接口文档中role_id其实是rid
      this.currRoleId = res.data.data.rid;
      // console.log(res);
      // 打开对话框
      this.dialogFormVisibleSetUserRole = true;
    },

    // 修改用户角色 - 发送请求
    // - 请求路径：roles/:id
    // - 请求方法：put
    // | :id      | 角色 ID  | 不能为空`携带在url中` |
    // | roleName | 角色名称 | 不能为空              |
    // | roleDesc | 角色描述 | 可以为空              |
    async setRole () {
      // 在打开对话框时。给currUserId赋值
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId
      });
      console.log(res);
      this.dialogFormVisibleSetUserRole = false;
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(res.data.meta.msg);
      }
    }
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
