<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="权限列表" level2="角色列表"></my-bread>
    <!-- 按钮 -->
    <el-row class="addRoleBtn">
      <el-col>
        <el-button type="info" @click="addRole()">添加角色</el-button>
      </el-col>
    </el-row>

    <el-table
      border
      stripe
      height="580"
      style="width: 100%"
      class="table"
      :data="roleList"
      :header-cell-style="centerTableData"
      :cell-style="centerTableData"
    >
      <el-table-column label="#" type="index" :width="tableColumWidth">
      </el-table-column>
      <el-table-column prop="id" label="id" :width="tableColumWidth">
      </el-table-column>
      <el-table-column prop="roleName" label="name" :width="tableColumWidth">
      </el-table-column>
      <el-table-column prop="roleDesc" label="Desc" :width="tableColumWidth">
      </el-table-column>
    </el-table>
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
      tableColumWidth: 1 / 4
    };
  },

  methods: {
    // 表格数据居中方法
    centerTableData() {
      return "text-align:center";
    },
    // 获取表格数据
    async getRoleList() {
      const res = await this.$http.get(`roles`);
      // console.log(res);
      this.roleList = res.data.data;
      console.log(this.roleList);
    },
    addRole() {}
  }
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
