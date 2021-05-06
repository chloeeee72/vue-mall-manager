<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="权限列表" level2="角色列表"></my-bread>
    <!-- 添加角色按钮 -->
    <el-row class="addRoleBtn">
      <el-col>
        <el-button type="info" @click="addRole()">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      style="width: 100%"
      class="table"
      :data="roleList"
      :header-cell-style="centerTableData"
      :cell-style="centerTableData"
    >
      <el-table-column type="expand" :width="tableColumWidth">
        <!-- 每个角色拥有的权限展开行 -->
        <template slot-scope="scope">
          <!-- 有权限显示 -->
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <!-- 一级权限 -->
            <el-col :span="4">
              <el-tag closable @close="deleRight(scope.row, item1.id)">{{
                item1.authName
              }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 二三级权限 -->
            <el-col :span="20">
              <el-row v-for="(item2, i) in item1.children" :key="i">
                <!-- 二级权限 -->
                <el-col :span="4">
                  <el-tag
                    closable
                    @close="deleRight(scope.row, item2.id)"
                    type="success"
                    >{{ item2.authName }}</el-tag
                  >
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="20">
                  <el-tag
                    closable
                    @close="deleRight(scope.row, item3.id)"
                    type="warning"
                    v-for="(item3, i) in item2.children"
                    :key="i"
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 无权限提示 -->
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>

      <!-- 标题 每一列数据prop-->
      <el-table-column
        label="#"
        type="index"
        :width="tableColumWidth"
      ></el-table-column>

      <el-table-column
        prop="roleName"
        label="角色名称"
        :width="tableColumWidth"
      >
      </el-table-column>

      <el-table-column
        prop="roleDesc"
        label="角色描述"
        :width="tableColumWidth"
      >
      </el-table-column>

      <!-- 编辑按钮 -->
      <el-table-column prop="address" label="操作" mini>
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            circle
          ></el-button>

          <!-- 删除按钮 -->
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            circle
          ></el-button>

          <!-- 修改用户角色权限 -->
          <el-button
            type="success"
            plain
            icon="el-icon-check"
            @click="showSetUserRightDialog(scope.row)"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <!-- 对话框 - 修改用户角色权限 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!-- 树形 多选表单 
        data 数据源
        show-checkbox 显示多选框
        lazy 懒加载
        node-key 每个节点唯一的表示 通常是data数据源key名中的id
        default-expanded-keys 默认展开
        default-checked-keys 默认选中的节点
        props 配置项{label，children}
        label 节点的文字标题和children节点的子节点，来源于data数据源的key名
        -->
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        default-expand-all
        :default-checked-keys="arrcheck"
        node-key="id"
        :props="defaultProps"
      >
        <!-- :default-expanded-keys="arrexpand" -->
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  created() {
    this.getRoleList();
  },
  data() {
    return {
      // 表格数据列表
      roleList: [],
      // 表格宽度
      tableColumWidth: 1 / 4,

      // 对话框visi
      // 修改对话框权限对话框
      dialogFormVisibleRight: false,
      // 树形结构的数据
      treelist: [],
      defaultProps: {
        label: "authName",
        children: "children",
      },
      // arrexpand: [],
      // 存储该角色有权限的id
      arrcheck: [],
      currRoleId: -1,
    };
  },

  methods: {
    // 表格数据居中方法
    centerTableData() {
      return "text-align:center";
    },
    // 点击角色列表 -> 获取表格数据
    async getRoleList() {
      const res = await this.$http.get(`roles`);
      // console.log(res);
      this.roleList = res.data.data;
      // console.log(this.roleList);
    },

    // 取消某个角色的某个权限
    // - 请求路径：roles/:roleId/rights/:rightId
    // - 请求方法：delete
    //   | :roleId  | 角色 ID  | 不能为空`携带在url中` |
    //   | :rightId | 权限 ID  | 不能为空`携带在url中` |
    async deleRight(role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      // console.log(res);
      // 删除成功更新当前角色权限列表
      role.children = res.data.data;
    },

    // 操作按钮 - 修改用户角色
    async showSetUserRightDialog(role) {
      // 获取树形结构的全部权限数据
      const res = await this.$http.get(`rights/tree`);
      this.treelist = res.data.data;
      this.currRoleId = role.id;
      // 获取当前角色拥有的权限数据 id 存在arrcheck中
      let arrtemp2 = [];
      role.children.forEach((item1) => {
        // arrtemp2.push(item1.id);
        item1.children.forEach((item2) => {
          // arrtemp2.push(item2.id);
          item2.children.forEach((item3) => {
            arrtemp2.push(item3.id);
          });
        });
      });
      // console.log(arrtemp2);
      this.arrcheck = arrtemp2;
      // 获取全部id，用于展开树形结构数据
      // var arrtemp1 = [];
      // this.treelist.forEach((item1) => {
      //   arrtemp1.push(item1.id);
      //   item1.children.forEach((item2) => {
      //     arrtemp1.push(item2.id);
      //     item2.children.forEach((item3) => {
      //       arrtemp1.push(item3.id);
      //     });
      //   });
      // });
      // console.log(arrtemp1);

      this.dialogFormVisibleRight = true;
    },

    // 表单确定按钮设置用户权限
    // - 请求路径：roles/:roleId/rights
    // - 请求方法：post
    // | :roleId | 角色 ID                | 不能为空`携带在url中`                                        |
    // | rids    | 权限 ID 列表（字符串） | 以 `,` 分割的权限 ID 列表
    // （获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点） |
    async setRoleRight() {
      // 获取全选的id的数组 arr1 getCheckedKeys()
      // el-tree标签的js方法 el-tree.get
      let arr1 = this.$refs.tree.getCheckedKeys();
      // 获取单选的id的数组 arr2 getHalfCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      // arr1.concat(arr2)
      // let arr = arr1 + arr2
      // ES6展开运算符 ...数组或者对象
      // 表单勾选的权限数组列表
      let arr = [...arr1, ...arr2];
      // console.log("arr", arr);
      // 发起请求
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(","),
      });
      // console.log("res", res);

      // 更新数据
      this.getRoleList();
      // 关闭对话框
      this.dialogFormVisibleRight = false;
      // 提示信息
      if (res.data.meta.status === 200) {
        this.$message({ message: res.data.meta.msg, type: "success" });
      } else {
        this.$message({ message: res.data.meta.msg, type: "warning" });
      }
    },
    // 添加用户
    addRole() {},
  },
};
</script>

<style>
.addRoleBtn {
  margin-top: 25px;
}
.table {
  margin-top: 25px;
}
</style>
