<template>
  <el-card class="card">
    <my-bread level1="商品管理" level2="商品列表"></my-bread>

    <!-- 搜索 添加-->
    <el-row class="search-row">
      <el-input
        clearable
        placeholder="请输入内容"
        v-model="query"
        class="input-with-select"
        @clear="loadGoodsList()"
      >
        <el-button
          slot="append"
          @click="search()"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        class="add-btn"
        @click="$router.push({ name: 'goodsadd' })"
        type="success"
        plain
        >添加商品</el-button
      >
    </el-row>

    <!-- 表格 -->
    <el-table
      height="480"
      border
      :header-cell-style="centerTableData"
      :cell-style="centerTableData"
      :data="goodsListData"
      style="width: 100%"
    >
      <el-table-column label="#" width="60" type="index"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="410">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价值（元）" width="180">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="180">
      </el-table-column>
      <el-table-column label="创建日期" width="180">
        <!-- prop="create_time" -->
        <!-- 如果单元格内显示的内容不是字符串，需要给被显示的内容外部包裹一个template -->
        <template slot-scope="scope">
          <!-- 在子组件中使用父组件的数据，作用域独立,数据不共享，需要传值操作 -->
          <!-- 需要设置父组件中slot-scope属性，该属性的值是要用数据create_time的数据源userlist -->
          <!-- 原理：将el-table绑定数据userlist.row，指的是数组中的每个对象 -->
          {{ scope.row.add_time | fmdate }}
        </template>
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column prop="address" label="操作" mini width="120">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            @click="showEditGoodsDialog(scope.row)"
            circle
          ></el-button>

          <!-- 删除按钮 -->
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            @click="showDeleteGoodsBtn(scope.row.id)"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 输入框内容
      query: "",
      // 分页相关的数据
      // 总数据条数
      total: -1,
      // 当前pagenum
      pagenum: 1,
      // 页总数
      pagesize: 10,
      // 表格绑定的数据
      goodsListData: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 表格居中
    centerTableData() {
      return "text-align:center";
    },
    // - 请求路径：goods
    // - 请求方法：get
    // - 请求参数
    // | 参数名   | 参数说明     | 备注     |
    // | -------- | ------------ | -------- |
    // | query    | 查询参数     | 可以为空 |
    // | pagenum  | 当前页码     | 不能为空 |
    // | pagesize | 每页显示条数 | 不能为空 |
    async getGoodsList() {
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );

      // console.log(res);

      const {
        meta: { status, msg },
        data: { goods, total }
      } = res.data;
      if (status === 200) {
        // 给表格数据赋值
        this.goodsListData = goods;
        // console.log(this.goodsListData);

        // 给total 赋值
        this.total = total;
        // 提示
        // this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    // 搜索方法
    search() {
      // 调用getGoodsList()方法，根据query的值获取数据
      // 之后重新渲染页面
      this.getGoodsList();
    },
    // 点击清除输入框，重新获取数据渲染页面
    loadGoodsList() {
      this.getGoodsList();
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(`当前页: ${val}`);
      this.getGoodsList();
    },
    showEditGoodsDialog() {},
    showDeleteGoodsBtn() {}
  }
};
</script>

<style>
.input-with-select {
  background-color: #fff;
  width: 50%;
}

.search-row {
  margin-top: 25px;
  margin-bottom: 25px;
}

.add-btn {
  height: 90%;
}
</style>
