<template>
  <div>
    <el-radio-group v-model="type" @change="showChart">
      <el-radio-button label="商品销售额占比统计" ></el-radio-button>
      <el-radio-button label="服务销售额占比统计"></el-radio-button>
    </el-radio-group>
    <div class="total"  id="myChart" ref="myChart"></div>
    <div class="total" id="myMounthChart" ref="myMounthChart"></div>
  
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
      type: "商品销售额占比统计",
      classAxisData: [],
      SeriesData: [],
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

      if (this.type == "商品销售额占比统计") {
        let myMounthChart = echarts.init(this.$refs.myMounthChart);
        axios({
          url: "/storeAdministrator/orderbuied",
          method: "get"
        }).then(res => {
          // console.log(res.data);
          let dataArry = [];
          let goodsArry = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].ordergoodarr) {
              for (let j = 0; j < res.data[i].ordergoodarr.length; j++) {
                dataArry.push(res.data[i].ordergoodarr[j]);
              }
            }
          }
          // console.log(dataArry);
          // 统计函数
          function parseArr(arr) {
            var nameArr = [];
            var result = [];
            arr.forEach(function(item) {
              var i;
              if ((i = nameArr.indexOf(item.shangpingname)) > -1) {
                result[i].total = Number(result[i].total) + Number(item.num);
              } else {
                nameArr.push(item.shangpingname);
                result.push({
                  name: item.shangpingname,
                  total: item.num,
                  price: item.price,
                  value: ""
                });
              }
            });
            for (let i = 0; i < result.length; i++) {
              result[i].value = result[i].total * result[i].price;
            }
            return result;
          }

          let arry = parseArr(dataArry);
          for (let i = 0; i < arry.length; i++) {
            goodsArry.push(arry[i]);
          }
          // console.log(goodsArry);
          this.SeriesData = goodsArry;
          myChart.setOption(this.goodaOptions, true);
          myMounthChart.setOption(this.showGoodsMounth, true);
        });
      } else if (this.type == "服务销售额占比统计") {
        axios({
          url: "/storeAdministrator/orderbuied",
          method: "get"
        }).then(res => {
          console.log(res.data);
          let dataArry = [];
          let servesArry = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].orderservearr) {
              for (let j = 0; j < res.data[i].orderservearr.length; j++) {
                dataArry.push(res.data[i].orderservearr[j]);
              }
            }
          }
          // console.log(dataArry);
          // 统计函数
          function parseArr(arr) {
            var nameArr = [];
            var result = [];
            arr.forEach(function(item) {
              var i;
              if ((i = nameArr.indexOf(item.servetype)) > -1) {
                result[i].total =
                  Number(result[i].total) + Number(item.goodState / 2);
              } else {
                nameArr.push(item.servetype);
                result.push({
                  name: item.servetype,
                  total: item.goodState / 2,
                  price: item.price,
                  value: ""
                });
              }
            });
            for (let i = 0; i < result.length; i++) {
              result[i].value = result[i].total * result[i].price;
            }
            return result;
          }
          // console.log(servesArry);
          let arry = parseArr(dataArry);
          console.log(arry);
          for (let i = 0; i < arry.length; i++) {
            servesArry.push(arry[i]);
          }
          // console.log(servesArry);
          this.SeriesData = servesArry;
          myChart.setOption(this.serveOptions, true);
        });
      }
    }
  },
  computed: {
    goodaOptions() {
      return {
        title: {
          text: "商品销售额占比统计",
          // subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left"
          // data: this.classAxisData
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.SeriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    },
    serveOptions() {
      return {
        title: {
          text: "服务总销售额占比统计",
          // subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left"
          // data: this.classAxisData
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.SeriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    },
    showGoodsMounth() {
      return {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      };
    }
  }
};
</script>
    
<style>
.total {
  width: 100%;
  height: 300px;
}
</style>

