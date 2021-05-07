<template>
  <el-card class="card">
    <my-bread level1="商品管理" level2="商品列表"> </my-bread>

    <!-- 步骤条 -->
    <el-steps
      :active="active"
      align-center
      class="step"
      finish-status="success"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },

  methods: {
    next() {
      if (this.active++ > 4) this.active = 0;
    }
  }
};
</script>

<style>
.step {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
