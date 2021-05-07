<template>
  <el-card class="card">
    <my-bread level1="商品管理" level2="商品列表"> </my-bread>

    <!-- 提示消息 -->
    <el-alert
      title="添加物品信息"
      type="success"
      class="alert"
      show-icon
      center
    >
    </el-alert>
    <!-- 步骤条 -->
    <el-steps
      :active="active"
      align-center
      class="step"
      finish-status="success"
    >
      <el-step
        v-for="(title, index) in titleList"
        :key="index"
        :title="title"
      ></el-step>
    </el-steps>

    <!-- tabs -->
    <el-tabs
      :tab-position="tabPosition"
      style="height: 200px;"
      v-model="active"
    >
      <el-tab-pane
        :name="index + 1"
        v-for="(title, index) in titleList"
        :key="index"
        :label="title"
        >{{ index }}</el-tab-pane
      >
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      //
      active: 0,
      // title list
      titleList: ["基本信息", "商品参数", "商品属性", "商品图片", "商品内容"],
      // tabs 显示位置
      tabPosition: "left"
    };
  },

  methods: {
    changeTitle() {}
  }
};
</script>

<style>
.alert {
  margin-top: 25px;
  margin-bottom: 25px;
}
.step {
  margin-bottom: 25px;
}
</style>
