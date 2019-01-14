<template>
  <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
  <div>
    <div class="total" id="myChart" ref="myChart"></div>
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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
      //   myChart.setOption(this.classesOptions, false);
      axios({
        url: "/stgoodssta/salesvolume",
        method: "get",
        params: {
          storeId: "5c358b2d100838196886b25c"
        }
      }).then(({ data }) => {
        console.log(data);
      });
    }
  },
  computed: {
    classesOptions() {
      return {
        title: {
          text: "及尼恩"
        },
        tooltip: {},
        legend: {
          data: this.goodsAxisData
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
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
  height: 500px;
}
</style>

