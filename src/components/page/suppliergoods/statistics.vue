<template>
  <div>
    <h1>统计</h1>
    <el-radio-group style="display: flex;justify-content: space-around;" @change="showChart">
      <span class="total" id="suppliergoods" ref="suppliergoods"></span>
      <span class="total" id="suppliers" ref="suppliers"></span>
    </el-radio-group>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import axios from "axios";

// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";

// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
export default {
  created() {
    axios({
      url: "/getsession",
      method: "get"
    }).then(({ data }) => {
      if (data.phone) {
        axios({
          url: "/supplier",
          method: "get",
          params: { usersId: data._id }
        }).then(({ data }) => {
          axios({
            url: "/suppliergoods/buytongji",
            method: "get",
            params: { supplierId: data[0]._id }
          }).then(({ data }) => {
            console.log("数据", data);
            //处理名字一样的商品。将value整合
            function parseArr(arr) {
              var nameArr = [];
              var result = [];
              arr.forEach(function(item) {
                var i;
                if ((i = nameArr.indexOf(item.name)) > -1) {
                  result[i].value =
                    Number(result[i].value) + Number(item.value);
                } else {
                  nameArr.push(item.name);
                  result.push({
                    name: item.name,
                    value: item.value
                  });
                }
              });
              return result;
            }
            // ``````````````````````````````````````````````````````
            // console.log("11111111", parseArr(data.seriesData));
            this.suppliergoodsBuyShow = parseArr(data.seriesData);
            for (let i of parseArr(data.seriesData)) {
              this.suppliergoodsBuy.push(i.name);
              console.log("数组", data.seriesData);
            }
            this.showChart();
          });
        });
      }
    });
  },

  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  data() {
    return {
      //   type: "班级人数统计",
      suppliergoodsBuy: [],
      suppliergoodsBuyShow: []
    };
  },
  methods: {
    showChart() {
      let myChart = echarts.init(this.$refs.suppliergoods);
      myChart.setOption(this.classesOptions, true);

      let yourChart = echarts.init(this.$refs.suppliers);
      yourChart.setOption(this.stuOptions, true);
    }
  },
  computed: {
    classesOptions() {
      //   console.log("fdsgdsfds", this.suppliergoodsBuy);
      return {
        title: {
          text: "货品采购量的统计图"
        },
        tooltip: {},
        legend: {
          data: ["采购量"]
        },
        xAxis: {
          data: this.suppliergoodsBuy
        },
        yAxis: {},
        series: [
          {
            name: "采购量",
            type: "bar",
            data: this.suppliergoodsBuyShow
          }
        ]
      };
    },
    stuOptions() {
      return {
        title: {
          text: "货品销售量的统计图"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: [
              { name: "衬衫", value: 5 },
              { name: "羊毛衫", value: 10 },
              { name: "雪纺衫", value: 3 },
              { name: "裤子", value: 6 },
              { name: "高跟鞋", value: 5 },
              { name: "袜子", value: 5 }
            ]
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.total {
  width: 700px;
  /* background-color: darkgrey; */
  height: 500px;
}
</style>
