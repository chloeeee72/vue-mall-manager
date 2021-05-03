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
      :expand-change="expandChangeTransition"
    >
      <el-table-column type="expand" :width="tableColumWidth">
        <template slot-scope="scope">
          <!-- 有权限显示 -->
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <!-- 一级权限 -->
            <el-col :span="4">
              <el-tag closable>{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 二三级权限 -->
            <el-col :span="20">
              <el-row v-for="(item2, i) in item1.children" :key="i">
                <!-- 二级权限 -->
                <el-col :span="4">
                  <el-tag closable type="success">{{ item2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="20">
                  <el-tag
                    closable
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

          <!-- 删除按钮 -->
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            @click="showDeleteUserMsgBtn(scope.row.id)"
            size="mini"
            circle
          ></el-button>

          <!-- 修改用户角色 -->
          <el-button
            type="success"
            plain
            icon="el-icon-check"
            @click="showSetUserRoleDialog(scope.row)"
            size="mini"
            circle
          ></el-button>
        </template>
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
      tableColumWidth: 1 / 4,
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
    // 添加用户
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
