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
      :active="parseInt(active)"
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

    <!-- 表单 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height:430px;overflow:auto"
    >
      <!-- tabs -->
      <el-tabs
        :tab-position="tabPosition"
        v-model="active"
        @tab-click="tabChange()"
      >
        <el-tab-pane name="1" label="基本信息">
          <!-- 表单title -->
          <el-form-item label="商品名称"
            ><el-input v-model="form.goods_name"></el-input
          ></el-form-item>
          <el-form-item label="商品价格"
            ><el-input v-model="form.goods_price"></el-input
          ></el-form-item>
          <el-form-item label="商品重量"
            ><el-input v-model="form.goods_weight"></el-input
          ></el-form-item>
          <el-form-item label="商品数量"
            ><el-input v-model="form.goods_number"></el-input
          ></el-form-item>

          <!-- 级联选择器 -->
          <el-form-item label="商品分类">
            <el-cascader
              props.expandTrigger="hover"
              v-model="selectedOptions"
              :options="options"
              @change="handleChange"
              :props="defalutProp"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <!-- 该三级分类的商品参数 动态参数-->
        <el-tab-pane name="2" label="商品参数">
          <el-form-item
            :label="item1.attr_name"
            v-for="(item1, i) in arrDyparams"
            :key="i"
          >
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox
                border
                :label="item2"
                v-for="(item2, i) in item1.attr_vals"
                :key="i"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>

        <!-- 静态参数 -->
        <el-tab-pane name="3" label="商品属性">
          <!-- 表单title -->
          <el-form-item
            v-for="(item, i) in arrStaticparams"
            :key="i"
            :label="item.attr_name"
            ><el-input v-model="item.attr_vals"></el-input
          ></el-form-item>
        </el-tab-pane>

        <!-- 点击上传图片 -->
        <el-tab-pane name="4" label="商品照片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      //
      active: 0,
      titleList: ["基本信息", "商品参数", "商品属性", "商品照片", "商品内容"],
      // tabs 显示位置
      tabPosition: "left",
      // 添加商品的表单数据
      // - 请求路径：goods
      // - 请求方法：post
      // - 请求参数
      // | 参数名          | 参数说明                                          | 备注     |
      // | --------------- | ------------------------------------------------- | -------- |
      // | goods_name      | 商品名称                                          | 不能为空 |
      // | goods_cat       | 以为','分割的分类列表                             | 不能为空 |
      // | goods_price     | 价格                                              | 不能为空 |
      // | goods_number    | 数量                                              | 不能为空 |
      // | goods_weight    | 重量                                              | 不能为空 |
      // | goods_introduce | 介绍                                              | 可以为空 |
      // | pics            | 上传的图片临时路径（对象）                        | 可以为空 |
      // | attrs           | 商品的参数（数组），包含 `动态参数` 和 `静态属性` | 可以为空 |
      form: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        //  goods_cat = selectedOptions.tostring
        goods_cat: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
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
      arrStaticparams: [],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 级联选择器 @change
    handleChange() {},
    // 获取三级分类信息
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      this.options = res.data.data;
    },
    // 选择不同tabs触发
    async tabChange() {
      // 点击第二个tabs，如果之前有选择三级分类，请求数据
      // 没有选择三级分类，提示“去选择”消息
      if (this.active == 2) {
        if (this.selectedOptions.length !== 3) {
          // 提示
          this.$message.warning("请先选择三级分类");
          return;
        }
        // 获取数据
        // - 请求路径：categories/:id/attributes
        // - 请求方法：get
        // - 请求参数
        // | 参数名 | 参数说明    | 备注                                                      |
        // | ------ | ----------- | --------------------------------------------------------- |
        // | :id    | 分类 ID     | 不能为空`携带在url中`                                     |
        // | sel    | [only,many] | 不能为空,通过 only 或 many 来获取分类静态参数还是动态参数 |
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
      } else if (this.active == 3) {
        // 点击第三个tab 数组长度=3，可以获取静态参数的数据
        if (this.selectedOptions.length !== 3) {
          // 提示
          this.$message.warning("请先选择三级分类");
          return;
        }
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        this.arrStaticparams = res.data.data;
        console.log(this.arrStaticparams);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
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
