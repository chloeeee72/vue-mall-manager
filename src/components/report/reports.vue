<template>
  <el-card>
    <my-bread level1="数据管理" level2="数据报表"></my-bread>
    <!-- 图表 -->
    <div class="main" style="width:700px;height:400px;" ref="main"></div>
  </el-card>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {};
  },
  mounted(){
    this.useEcharts();
  },
  methods: {
    async useEcharts() {
      var myChart = echarts.init(this.$refs.main);
      const res = await this.$http.get(`reports/type/1`);
      let option2 = res.data.data;
      let option1 = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
      let option = { ...option1, ...option2 };
      myChart.setOption(option);
    }
  }
};
</script>

<style>
.main {
  margin-top: 25px;
  margin-bottom: 25px;
}

</style>
