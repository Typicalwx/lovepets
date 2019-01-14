<template>
    <div>
        <!-- <el-radio-group v-model="type" @change="showChart">
            <el-radio-button label="班级人数统计"></el-radio-button>
        </el-radio-group> -->
        <div class="total" id="myChartmonth" ref="myChartmonth"></div>
        <div class="total" id="myChartthress" ref="myChartthress"></div>
        <div class="total" id="myChartyear" ref="myChartyear"></div>
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
const { mapState:gession} = createNamespacedHelpers(
  "storeModule"
);
export default {
  data() {
    return {
      series:[], 
      Servename: [],
      serveyears:[]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChartline();
      this.showcicle();
    });
  },

  methods: {
      //月统计
    showChartline() {
      let myChartmonth = echarts.init(this.$refs.myChartmonth);
        axios({
            method:"get",
            url:"/storeservetongji",
             params:{
                storeId:this.storeId,
                year:"2019"
           }
        }).then(res=>{
           this.Servename = res.data[0]
           this.series = res.data[1]
           myChartmonth.setOption(this.ServerOptions, true);
        })
     
    },

    //年统计
    showcicle(){
       let myChartyear = echarts.init(this.$refs.myChartyear);
        myChartyear.setOption(this.yearOpitons, true);

          axios({
            method:"get",
            url:"/storeservetongji/years",
             params:{
                storeId:this.storeId,
                year:"2019"
           }
        }).then(res=>{
            console.log(res.data)
        //    this.Servename = res.data[0]
           this.serveyears = res.data
           myChartyear.setOption(this.yearOpitons, true);
        })           


    }
  },
  computed: {
    ...gession(["storeId"]),
    ServerOptions() {
      return {
        title: {
          text: "月统计"
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
          data: ["Jan", "Feb", "Mar", "Apr", "Apr", "June", "July","Aug","Sept",
          "Oct","Nov","Dec"]
        },
        yAxis: {
          type: "value"
        },
        series: this.series
      };
    },
    yearOpitons() {
       return {
           
    title: {
        text: '年统计销量',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
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
    
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:this.serveyears.sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'red'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
      };
    },
    mapOptions() {
      return {}
    }
  }
};
</script>
<style scoped>
.total {
  width: 100%;
  height: 200px;
}
</style>

