<template>
  <!-- 封装面包屑组件 并命名 -->
  <el-breadcrumb separator="〉">
    <el-breadcrumb-item to="/users">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ level1 }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ level2 }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // 给组件命名
  name: "my-bread",
  data() {
    return {
      // level1: "",
      // level2: ""
    };
  },
  // props：值为字符串数组，用法和data中中值用法一样，来源于使用组件时的传值
  // props中的数据是该组件的属性，<child-a :msg="abc">

  props: ["level1", "level2"]
};
</script>

<style></style>
