<template>
  <div>
    <el-radio-group v-model="type" @change="showChart">
      <el-radio-button label="商品销售额统计"></el-radio-button>
    </el-radio-group>
    <div class="total" id="myChart" ref="myChart"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
import axios from "axios";
export default {
  data() {
    return {
      type: "班级人数统计",
      classAxisData: [],
      classSeriesData: [],
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
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type == "商品销售额统计") {
        axios({
          url: "/orderbuy/orderbuied",
          method: "get"
        }).then(res => {
          console.log(res);
          // this.classAxisData = res.data.axisData;
          // this.classSeriesData = res.data.seriesData;
          // myChart.setOption(this.classesOptions, true);
        });
      }
    }
  },
  computed: {
    classesOptions() {
      return {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.classAxisData
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.classSeriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],

        // title: {
        //   text: "班级人数的统计图"
        // },
        // tooltip: {},
        // xAxis: {
        //   data: this.classAxisData
        // },
        // yAxis: {},
        // series: [
        //   {
        //     name: "人数",
        //     type: "bar",
        //     data: this.classSeriesData
        //   }
        // ]
      };
    }
  }
};
</script>
    
<style>
.total {
  width: 100%;
  height: 500px;
}
</style>

