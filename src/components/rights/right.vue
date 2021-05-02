<template>
  <div>
    <el-card class="card">
      <!-- 面包屑 -->
      <my-bread level1="权限管理" level2="权限列表"></my-bread>

      <!-- 表格 -->
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
      rightlist: []
    };
  },
  methods: {
    async getRightlist() {
      const res = await this.$http.get(`rights/list`);
      // console.log(res);
      this.rightlist = res.data.data;
    }
  }
};
</script>

<style></style>
