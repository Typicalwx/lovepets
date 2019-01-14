<template>
  <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-select v-model="type" placeholder="搜索属性" class="handle-select mr10">
          <el-option v-for="item in  storesData" :key="item._id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <div class="total" id="myChart" ref="myChart"></div>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
import axios from "axios";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeModule"
);
export default {
  data() {
    return {
      type: "班级人数统计",
      goodsAxisData: [], //前六个的横坐标
      goodsSeriesData: [], //前六个月的纵坐标
      ageAxisData: [],
      ageSeriesData: [],
      shopsCountData: [],
      shopsData: [],
      zoom: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  methods: {
    showChart() {
      console.log("chart");
      let myChart = echarts.init(this.$refs.myChart);
      //
      // console.log()
      axios({
        url: "/stgoodssta/salesvolume",
        method: "get",
        params: {
          storeId: "5c358b2d100838196886b25c"
        }
      }).then(({ data }) => {
        console.log(data);
        data.reverse();
        let xarr = [];
        let yarr = [];
        let obj = {};
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          xarr.push(data[i].date);
          yarr.push((obj.total = data[i].total));
        }
        this.goodsAxisData = xarr;
        this.goodsSeriesData = yarr;
        myChart.setOption(this.classesOptions, false);
      });
    }
  },
  computed: {
    ...mapState(["storesData"]),
    classesOptions() {
      return {
        title: {
          text: "商品近六个月销量"
        },
        tooltip: {},
        legend: {
          data: this.goodsSeriesData
        },
        xAxis: {
          data: this.goodsAxisData
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.goodsSeriesData
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.total {
  width: 100%;
  height: 300px;
}
</style>

