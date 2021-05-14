<template>
  <el-card>
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <!-- 表格 -->
    <el-table class="table" :data="tableData" style="width: 100%">
      <el-table-column label="#" type="index" width="60"> </el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="220">
      </el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="200">
      </el-table-column>
      <el-table-column prop="pay_status" label="是否付款" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.pay_status === '0'">否</span>
          <span v-else-if="scope.row.pay_status === '1'">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="120">
      </el-table-column>
      <el-table-column label="下单时间" width="180">
        <template slot-scope="scope">
          <!-- 在子组件中使用父组件的数据，作用域独立,数据不共享，需要传值操作 -->
          <!-- 需要设置父组件中slot-scope属性，该属性的值是要用数据create_time的数据源userlist -->
          <!-- 原理：将el-table绑定数据userlist.row，指的是数组中的每个对象 -->
          {{ scope.row.update_time | fmdate }}
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
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 5,
      total: 1
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // - 请求路径：orders
    // - 请求方法：get
    // - 请求参数
    // | 参数名               | 参数说明        | 备注     |
    // | -------------------- | --------------- | -------- |
    // | query                | 查询参数        | 可以为空 |
    // | pagenum              | 当前页码        | 不能为空 |
    // | pagesize             | 每页显示条数    | 不能为空 |
    // | user_id              | 用户 ID         | 可以为空 |
    // | pay_status           | 支付状态        | 可以为空 |
    // | is_send              | 是否发货        | 可以为空 |
    // | order_fapiao_title   | ['个人','公司'] | 可以为空 |
    // | order_fapiao_company | 公司名称        | 可以为空 |
    // | order_fapiao_content | 发票内容        | 可以为空 |
    // | consignee_addr       | 发货地址        | 可以为空 |
    async getTableData() {
      const res = await this.$http.get(
        `orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      this.total = res.data.data.total;
      this.tableData = res.data.data.goods;
      console.log(this.tableData);
      console.log(res);
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(`当前页: ${val}`);
      this.getTableData();
    },
    // 操作按钮 - 编辑按钮
    showEditDialog() {}
  }
};
</script>

<style>
.table {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
