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
            props.expandTrigger="hover"
            :show-all-levels="false"
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
    <el-table
      height="480"
      :data="list"
      style="width:100%"
      row-key="cat_id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column label="分类名称" prop="cat_name"> </el-table-column>

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
  },
  methods: {
    // 添加分类按钮
    // 显示对话框
    async addGoodsCate() {
      // 获取所有二级分类数据 - 添加分类 - 下拉列表
      const res = await this.$http.get(`categories?type=2`);
      this.options = res.data.data;
      this.dialogFormVisibleAdd = true;
    },
    // 对话框 - 确定按钮发送请求
    async addCate() {
      // - 请求路径：categories
      // - 请求方法：post
      // - 请求参数
      // | 参数名    | 参数说明  | 备注                                                        |
      // | --------- | --------- | ----------------------------------------------------------- |
      // | cat_pid   | 分类父 ID | 不能为空，如果要添加1级分类，则父分类Id应该设置为  `0`      |
      // | cat_name  | 分类名称  | 不能为空                                                    |
      // | cat_level | 分类层级  | 不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类 |
      //  一级分类 selectedOptions.length==0 cat_pid=0 cat_level=0
      //  二级分类 selectedOptions.length==1 cat_pid=selectedOptions[0] cat_level=1
      //  三级分类 selectedOptions.length==2 cat_pid=selectedOptions[1] cat_level=2
      if (this.selectedOptions.length === 0) {
        this.form.cat_pid = 0;
        this.form.cat_level = 0;
      } else if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0];
        this.form.cat_level = 1;
      } else if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1];
        this.form.cat_level = 2;
      }
      const res = await this.$http.post(`categories`, this.form);
      console.log(res);
      if (res.data.meta.status === 201) {
        // 清空数据
        (this.form = {
          cat_pid: -1,
          cat_name: "",
          cat_level: -1
        }),
          (this.selectedOptions = [])(
            // 关闭对话框
            (this.dialogFormVisibleAdd = false)
          );
        // 提示消息
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.warning(res.data.meta.msg);
      }
    },

    async handleChange() {},
    // 获取列表数据
    async getGoodsCate() {
      const res = await this.$http.get(
        `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      this.list = res.data.data.result;
      // console.log(this.list);
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
