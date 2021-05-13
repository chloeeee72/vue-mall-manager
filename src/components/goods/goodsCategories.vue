<template>
  <el-card class="card">
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 添加-->
    <el-row class="add-row">
      <el-button class="add-btn" @click="addGoodsCate()" type="success" plain
        >添加分类</el-button
      >
    </el-row>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 级联选择器 -->
        <el-form-item label="分类" :label-width="formLabelWidth">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
        <el-button type="primary" @click="addCate()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table height="480" :data="list" style="width:100%">
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>

      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted === false">有效</span>
          <span v-else-if="scope.row.cat_deleted === true">无效</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="showEditDialog(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="showEditDialog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total,sizes,prev,pager,next,jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pagenum: 1,
      pagesize: 10,
      total: 1,
      dialogFormVisibleAdd: false,
      form: {
        cat_pid: -1,
        cat_name: "",
        cat_level: -1
      },
      formLabelWidth: "140px",
      // 级联选择器选中数据
      selectedOptions: [],
      options: [],
      defalutProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      }
    };
  },
  created() {
    // 获取数据
    // 列表数据
    this.getGoodsCate();
    // 三级分类下拉选项数据
    this.getGoods();
  },
  methods: {
    // 添加分类按钮
    // 显示对话框
    async addGoodsCate() {
      this.dialogFormVisibleAdd = true;
    },
    // 发送请求
    async addCate() {},

    // 获取三级分类数据 - 添加分类 - 下拉列表
    async getGoods() {
      const res = await this.$http.get(`categories?type=3`);
      // console.log(res);
      this.options = res.data.data;
    },

    async handleChange() {
      console.log(this.selectedOptions);
      console.log(this.options);
    },
    // 获取列表数据
    async getGoodsCate() {
      const res = await this.$http.get(
        `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      this.list = res.data.data.result;
      console.log(this.list);
      this.total = res.data.data.total;
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getGoodsCate();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(`当前页: ${val}`);
      this.getGoodsCate();
    }
  }
};
</script>

<style>
.add-row {
  margin-top: 25px;
  margin-bottom: 25px;
}

.add-btn {
  height: 90%;
}
</style>
