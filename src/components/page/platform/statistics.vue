<template>
  <div>
    <el-radio-group v-model="type" @change="showChart">
      <el-radio-button label="班级人数统计"></el-radio-button>
      <el-radio-button label="年龄分布统计"></el-radio-button>
      <el-radio-button label="地图分布"></el-radio-button>
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
      type: "地图分布"
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
      if(this.type == "地图分布"){
          
      }
    }
  }
};
</script>
    
<style>
</style>
