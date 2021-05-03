<template>
  <div>
    <el-card class="card">
      <!-- 面包屑 -->
      <my-bread level1="权限管理" level2="权限列表"></my-bread>

      <!-- 表格 -->
      <el-table
        border
        stripe
        height="580"
        style="width: 100%"
        class="table"
        :data="rightlist"
        :header-cell-style="centerTableData"
        :cell-style="centerTableData"
      >
        <el-table-column label="#" type="index" :width="tableColumWidth">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          :width="tableColumWidth"
        >
        </el-table-column>
        <el-table-column prop="path" label="路径" :width="tableColumWidth">
        </el-table-column>

        <el-table-column label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level === '0'">一级</span>
            <span v-if="scope.row.level === '1'">二级</span>
            <span v-if="scope.row.level === '2'">三级</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getRightlist();
  },
  data() {
    return {
      // 表格数据列表
      rightlist: [],
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
    async getRightlist() {
      const res = await this.$http.get(`rights/list`);
      // console.log(res);
      this.rightlist = res.data.data;
      // console.log(this.rightlist);
    }
  }
};
</script>

<style>
.table {
  margin-top: 25px;
}
</style>
