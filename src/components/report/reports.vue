<template>
  <el-card>
    <my-bread level1="数据管理" level2="数据报表"></my-bread>
    <!-- 表格 -->

    <!-- 分页器 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total,sizes,prev,pager,next,jumper"
      :total="total"
    ></el-pagination> -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style>
.table {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
