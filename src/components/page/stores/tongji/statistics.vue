<template>
    <div>
        <!-- <el-radio-group v-model="type" @change="showChart">
            <el-radio-button label="班级人数统计"></el-radio-button>
        </el-radio-group> -->

    <div class="block">
 <el-radio-group v-model="type" @change="showChart">
            <el-radio-button label="商品统计"></el-radio-button>
            <el-radio-button label="服务统计"></el-radio-button>
        </el-radio-group>


             <div>
              <span class="demonstration"></span>
               <el-date-picker
                  v-model="value5"
                    type="year"
                    @change="change"
                    value-format="yyyy"
                   placeholder="选择年">
                  </el-date-picker>
          </div>
    </div>
        

        <div class="total" id="myChartmonth" ref="myChartmonth"></div>
        <h1 class="h1">{{this.value5}}季度销售量统计</h1>
         <div class="total2" id="myChartthress" ref="myChartthress"></div>
        <div class="total3" id="myChartyear" ref="myChartyear"></div>
        
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
const { mapState: gession } = createNamespacedHelpers("storeModule");
export default {
  data() {
    return {
      value5: "2019",
      type: "商品统计",
      series: [],
      Servename: [],
      serveyears: [],
      servejidu: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },

  methods: {
    change(){
      console.log(this.value5)
       this.showChart();
    },
    showChart() {
      this.showChartline();
      this.showcicle();
      this.showzhuzhuang();
    },
    //月统计
    showChartline() {
      let myChartmonth = echarts.init(this.$refs.myChartmonth);

      if (this.type == "商品统计") {
        axios({
          method: "get",
          url: "/storegoodtongji",
          params: {
            storeId: this.storeId,
            year: this.value5
          }
        }).then(res => {
          console.log("112312313", res.data[0]);
          this.Servename = res.data[0];
          this.series = res.data[1];
          myChartmonth.setOption(this.ServerOptions, true);
        });
      } else if (this.type == "服务统计") {
        axios({
          method: "get",
          url: "/storeservetongji",
          params: {
            storeId: this.storeId,
            year: this.value5
          }
        }).then(res => {
          this.Servename = res.data[0];
          this.series = res.data[1];
          myChartmonth.setOption(this.ServerOptions, true);
        });
      }
    },

    //年统计
    showcicle() {
      let myChartyear = echarts.init(this.$refs.myChartyear);

      if (this.type == "商品统计") {
        axios({
          method: "get",
          url: "/storegoodtongji/years",
          params: {
            storeId: this.storeId,
            year: this.value5
          }
        }).then(res => {
          this.serveyears = res.data;
          myChartyear.setOption(this.yearOpitons, true);
        });
      } else if (this.type == "服务统计") {
        axios({
          method: "get",
          url: "/storeservetongji/years",
          params: {
            storeId: this.storeId,
            year: this.value5
          }
        }).then(res => {
          this.serveyears = res.data;
          myChartyear.setOption(this.yearOpitons, true);
        });
      }
    },
    //柱状
    showzhuzhuang() {
      let myChartthress = echarts.init(this.$refs.myChartthress);

      if (this.type == "商品统计") {
        axios({
          method: "get",
          url: "/storegoodtongji/jidu",
          params: {
            storeId: this.storeId,
            year: this.value5
          }
        }).then(res => {
          this.servejidu = res.data;
          myChartthress.setOption(this.jiduOptions, true);
        });
      } else if (this.type == "服务统计") {
        axios({
          method: "get",
          url: "/storeservetongji/jidu",
          params: {
            storeId: this.storeId,
            year: this.value5
          }
        }).then(res => {
          this.servejidu = res.data;
          myChartthress.setOption(this.jiduOptions, true);
        });
      }
    }
  },
  computed: {
    ...gession(["storeId"]),
    //月统计
    ServerOptions() {
      return {
        title: {
          text: `${this.value5}月销售量统计`,
          textStyle:{
            fontSize:30
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.Servename
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Apr",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: this.series
      };
    },
    //年度
    yearOpitons() {
      return {
        title: {
          text: `${this.value5}年销售量统计`,
          left: "center",
          top: 20,
          textStyle: {
            color: "black",
            fontSize:30
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },

        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.serveyears.sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "red"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
    },
    //季度
    jiduOptions() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.Servename
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          data: ["第一季度", "第二季度", "第三季度", "第四季度"]
        },
        series: this.servejidu
      };
    }
  }
};
</script>
<style scoped>
.total {
  width: 100%;
  height: 300px;
  margin-top: 30px;
}
.total2 {
  width: 100%;
  height: 700px;
   margin-top: 30px;
}
.total3 {
  width: 100%;
  height: 700px;
   margin-top: 30px;
}
.block{
  display: flex;
}
.h1{
  margin-top: 40px;
}
</style>

