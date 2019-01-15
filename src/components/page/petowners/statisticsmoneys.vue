<template>
  <div>
       <el-select v-model="value" placeholder="请选择城市" class="qw" @change="changeCity">
    <el-option
      v-for="item in citys"
      :key="item"
      :value="item"
      >
    </el-option>
  </el-select>
       <!-- <el-select v-model="value1"  placeholder="请选择年份" class="qw" @change="changeYear">
    <el-option
      v-for="item in mouth"
      :key="item"
      :value1="item"
      >
    </el-option>
  </el-select> -->
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
      options: [],
      value: [],
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      value5: [],
      value6: [],
      value7: [],
      value8: [],
      value9: [],
      value10: [],
      value11: [],
      value12: [],
      type: "商品销售额占比统计",
      classAxisData: [],
      SeriesData: [],
      zoom: 0,
      data: "",
      citys: "",
      years: "",
      mouth: "",
      mouthType: "商品"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  methods: {
    handDate(date) {
      return (date = date.substr(0, 9));
    },
    handYears(date) {
      return (date = date.substr(0, 4));
    },
    handMonth(date) {
      if (date.length < 18) {
        return (date = parseInt(date.substr(5, 1)));
      }
      return (date = parseInt(date.substr(5, 2)));
    },
    // 数组去重
    distinctAry(ary) {
      var newAry = [];
      for (var i = 0; i < ary.length; i++) {
        var flag = false;
        for (var j = 0; j < newAry.length; j++) {
          if (ary[i] == newAry[j]) {
            flag = true;
          }
        }
        if (!flag) {
          newAry.push(ary[i]);
        }
      }
      return newAry;
    },

    changeCity() {
      // console.log(this.value);
      this.showChart();
    },
    changeYear() {},
    showChart() {
      let myChart = echarts.init(this.$refs.myChart);
      let myMounthChart = echarts.init(this.$refs.myMounthChart);
      if (this.type == "商品销售额占比统计") {
        this.mouthType = "商品";

        axios({
          url: "/storeAdministrator/orderbuied",
          method: "get"
        }).then(res => {
          // console.log(res.data);
          let dataArry = [];
          let goodsArry = [];
          let cityArr = [];

          let yearArr = [];
          let monthArr = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].stores.city) {
              cityArr.push(res.data[i].stores.city);
            }
            if (res.data[i].buytime && res.data[i].ordergoodarr.length > 0) {
              let m = this.handMonth(res.data[i].buytime);
              // console.log(m);
              switch (m) {
                case 1:
                  this.value1.push(res.data[i].ordergoodarr);
                  break;
                case 2:
                  this.value2.push(res.data[i].ordergoodarr);
                  break;
                case 3:
                  this.value3.push(res.data[i].ordergoodarr);
                  break;
                case 4:
                  this.value4.push(res.data[i].ordergoodarr);
                  break;
                case 5:
                  this.value5.push(res.data[i].ordergoodarr);
                  break;
                case 6:
                  this.value6.push(res.data[i].ordergoodarr);
                  break;
                case 7:
                  this.value7.push(res.data[i].ordergoodarr);
                  break;
                case 8:
                  this.value8.push(res.data[i].ordergoodarr);
                  break;
                case 9:
                  this.value9.push(res.data[i].ordergoodarr);
                  break;
                case 10:
                  this.value10.push(res.data[i].ordergoodarr);
                  break;
                case 11:
                  this.value11.push(res.data[i].ordergoodarr);
                  break;
                case 12:
                  this.value12.push(res.data[i].ordergoodarr);
                  break;
              }
              // yearArr.push(this.handYears(res.data[i].buytime));
              // monthArr.push(this.handMonth(res.data[i].buytime));
            }
          }

          // this.years = this.distinctAry(yearArr);
          // this.mouth = this.distinctAry(monthArr);
          // console.log(this.value3);
          // console.log(this.mouth);
          this.citys = this.distinctAry(cityArr);
          // console.log(this.citys);
          if (this.value) {
            for (let i = 0; i < res.data.length; i++) {
              if (
                res.data[i].stores.city == this.value &&
                res.data[i].ordergoodarr
              ) {
                for (let j = 0; j < res.data[i].ordergoodarr.length; j++) {
                  dataArry.push(res.data[i].ordergoodarr[j]);
                }
              }
            }
          } else {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].ordergoodarr) {
                for (let j = 0; j < res.data[i].ordergoodarr.length; j++) {
                  dataArry.push(res.data[i].ordergoodarr[j]);
                }
              }
            }
          }

          // for()

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
        this.mouthType = "服务";
        axios({
          url: "/storeAdministrator/orderbuied",
          method: "get"
        }).then(res => {
          // console.log(res.data);
          let dataArry = [];
          let servesArry = [];
           for (let i = 0; i < res.data.length; i++) {
          
            if (res.data[i].buytime && res.data[i].orderservearr.length > 0) {
              let m = this.handMonth(res.data[i].buytime);
              // console.log(m);
              switch (m) {
                case 1:
                  this.value1.push(res.data[i].orderservearr);
                  break;
                case 2:
                  this.value2.push(res.data[i].orderservearr);
                  break;
                case 3:
                  this.value3.push(res.data[i].orderservearr);
                  break;
                case 4:
                  this.value4.push(res.data[i].orderservearr);
                  break;
                case 5:
                  this.value5.push(res.data[i].orderservearr);
                  break;
                case 6:
                  this.value6.push(res.data[i].orderservearr);
                  break;
                case 7:
                  this.value7.push(res.data[i].orderservearr);
                  break;
                case 8:
                  this.value8.push(res.data[i].orderservearr);
                  break;
                case 9:
                  this.value9.push(res.data[i].orderservearr);
                  break;
                case 10:
                  this.value10.push(res.data[i].orderservearr);
                  break;
                case 11:
                  this.value11.push(res.data[i].orderservearr);
                  break;
                case 12:
                  this.value12.push(res.data[i].orderservearr);
                  break;
              }
              // yearArr.push(this.handYears(res.data[i].buytime));
              // monthArr.push(this.handMonth(res.data[i].buytime));
            }
          }
          if (this.value) {
            for (let i = 0; i < res.data.length; i++) {
              if (
                res.data[i].stores.city == this.value &&
                res.data[i].orderservearr
              ) {
                for (let j = 0; j < res.data[i].orderservearr.length; j++) {
                  dataArry.push(res.data[i].orderservearr[j]);
                }
              }
            }
          } else {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].orderservearr) {
                for (let j = 0; j < res.data[i].orderservearr.length; j++) {
                  dataArry.push(res.data[i].orderservearr[j]);
                }
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
          // console.log(arry);
          for (let i = 0; i < arry.length; i++) {
            servesArry.push(arry[i]);
          }
          // console.log(servesArry);
          this.SeriesData = servesArry;
           myMounthChart.setOption(this.showServesMounth, true);
          myChart.setOption(this.serveOptions, true);
        });
      }
    }
  },
  computed: {
    goodaOptions() {
      return {
        title: {
          text: this.value + "商品销售额占比统计",
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
          text: this.value + "服务总销售额占比统计",
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
        title: {
          text: "月总销售额占比统计",
          // subtext: "纯属虚构",
          x: "center"
        },
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              parseInt(this.value1.length * 30),
              parseInt(this.value2.length * 30),
              parseInt(this.value3.length * 30),
              parseInt(this.value4.length * 30),
              parseInt(this.value5.length * 30),
              parseInt(this.value6.length * 30),
              parseInt(this.value7.length * 30),
              parseInt(this.value8.length * 30),
              parseInt(this.value9.length * 30),
              parseInt(this.value10.length * 30),
              parseInt(this.value11.length * 30),
              parseInt(this.value12.length * 30)
            ],
            type: "line"
          }
        ]
      };
    },
      showServesMounth() {
      return {
        title: {
          text: "月总销售额占比统计",
          // subtext: "纯属虚构",
          x: "center"
        },
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              parseInt(this.value1.length * 30),
              parseInt(this.value2.length * 30),
              parseInt(this.value3.length * 30),
              parseInt(this.value4.length * 30),
              parseInt(this.value5.length * 1130),
              parseInt(this.value6.length * 130),
              parseInt(this.value7.length * 1130),
              parseInt(this.value8.length * 1130),
              parseInt(this.value9.length * 130),
              parseInt(this.value10.length * 30),
              parseInt(this.value11.length * 30),
              parseInt(this.value12.length * 30)
            ],
            type: "line"
          }
        ]
      };
    }
  }
};
</script>
    
<style>
.qw {
  margin-right: 30px;
  width: 150px;
}
.total {
  width: 100%;
  height: 300px;
}
</style>

