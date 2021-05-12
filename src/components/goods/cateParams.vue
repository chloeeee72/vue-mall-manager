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
      <el-tabs v-model="active" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="1">
          <!-- 按钮 -->
          <el-button type="danger">设置动态参数</el-button>
          <!-- 表格 -->
          <el-table :data="arrDyparams" style="width: 100%">
            <!-- 展开行 -->
            <el-table-column type="expand" label="#">
              <template slot-scope="scope">
                <!-- 展开行内tag -->
                <el-tag
                  v-for="(tag, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="
                    handleClose(
                      scope.row.attr_vals,
                      scope.row.attr_id,
                      scope.row.attr_name,
                      tag
                    )
                  "
                >
                  {{ tag }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row.attr_vals)"
                  @blur="handleInputConfirm(scope.row.attr_vals)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 属性名称 -->
            <el-table-column label="属性名称" prop="attr_name">
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column label="操作" mini>
              <template>
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
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="2">静态参数</el-tab-pane>
      </el-tabs>
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
      selectedOptions: [],
      options: [],
      defalutProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数的数据数组
      arrDyparams: [],
      // 静态参数的数据数组
      arrStaticparams: [],
      active: "1",
      // 展开行数据
      inputVisible: false,
      inputValue: ""
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
        console.log(this.arrDyparams);

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
    },

    // tabs切换时触发
    handleClick() {},

    // 展开行内tag
    // 点击x按钮
    // - 请求路径：categories/:id/attributes/:attrId
    // - 请求方法：put
    async handleClose(attr_vals, attr_id, attr_name, tag) {
      // attr_vals, attr_id, attr_name,tag
      attr_vals.splice(attr_vals.indexOf(tag), 1);
      // 发送请求
      // | :id       | 分类 ID                | 不能为空`携带在url中`      |
      // | :attrId   | 属性 ID                | 不能为空`携带在url中`      |
      // | attr_name | 新属性的名字           | 不能为空，携带在`请求体`中 |
      // | attr_sel  | 属性的类型[many或only] | 不能为空，携带在`请求体`中 |
      // | attr_vals | 参数的属性值           | 可选参数，携带在`请求体`中 |
      let putData = {
        attr_name: attr_name,
        attr_sel: "many",
        attr_vals: attr_vals.join(",")
      };
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${attr_id}`,
        putData
      );
      console.log(res);
    },
    // 点击 +newtag 按钮
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 回车键 or 失去焦点
    handleInputConfirm(attr_vals) {
      let inputValue = this.inputValue;
      if (inputValue) {
        attr_vals.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style>
.alert {
  margin-top: 25px;
  margin-bottom: 25px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
