<template>
  <div>
    <h1>统计</h1>
    <el-radio-group
      style="display: flex;justify-content: space-around;"
      @change="showChart"
    >
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
          text: "月销售额的统计图"
        },
        tooltip: {},
        xAxis: {
          data: ["1月", "2月", "3月", "4月", "5月", "6月","7月","8月","9月","10月","11月","12月"]
        },
        yAxis: {},
        series: [
          {
            name: "月销售额",
            type: "bar",
            data: [
              { name: "1月", value: 5 },
              { name: "2月", value: 10 },
              { name: "3月", value: 3 },
              { name: "4月", value: 6 },
              { name: "5月", value: 5 },
              { name: "6月", value: 8 },
              { name: "7月", value: 3 },
              { name: "8月", value: 4 },
              { name: "9月", value: 8 },
              { name: "10月", value: 3 },
              { name: "11月", value: 1},
              { name: "12月", value: 3.2 },
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
