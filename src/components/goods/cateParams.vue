<template>
  <el-card>
    <my-bread level1="商品管理" level2="分类参数"></my-bread>

    <!-- 提示消息 -->
    <el-alert :title="alertTitle" type="error" class="alert" show-icon>
    </el-alert>

    <!-- 级联选择器 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:430px;overflow:auto"
    >
      <el-form-item>
        <span>商品名称：</span>
        <el-cascader
          :show-all-levels="false"
          props.expandTrigger="hover"
          v-model="selectedOptions"
          :options="options"
          @change="handleChange"
          :props="defalutProp"
          clearable
        ></el-cascader>
      </el-form-item>

      <!-- 遍历渲染动态 静态数据 -->
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      alertTitle: "只允许为第三级分类设置参数",
      // 数据表单
      form: {},
      // 级联选择器
      selectedOptions: [1, 3, 6],
      options: [],
      defalutProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数的数据数组
      arrDyparams: [],
      // 静态参数的数据数组
      arrStaticparams: []
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 获取三级分类信息
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      this.options = res.data.data;
    },
    // 级联选择器 @change 当选中节点变化时触发 选中节点的值
    async handleChange() {
      if (this.selectedOptions.length !== 3) {
        // 提示
        this.$message.warning("请先选择三级分类");
        return;
      } else if (this.selectedOptions.length === 3) {
        // 获取动态参数
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        // console.log(res);
        this.arrDyparams = res.data.data;
        // this.arrDyparams 每个对象.attr_vals 字符串 -> 数组 -> v-for渲染
        this.arrDyparams.forEach(item => {
          // 商品没有动态参数，v-for遍历空数组不报错
          item.attr_vals =
            item.attr_vals.length == 0 ? [] : item.attr_vals.trim().split(",");
        });

        // 获取静态数据
        //   if (this.selectedOptions.length !== 3) {
        //     // 提示
        //     this.$message.warning("请先选择三级分类");
        //     return;
        //   }
        //   const res = await this.$http.get(
        //     `categories/${this.selectedOptions[2]}/attributes?sel=only`
        //   );
        //   this.arrStaticparams = res.data.data;
      }
    }
  }
};
</script>

<style>
.alert {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
