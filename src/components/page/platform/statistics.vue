<template>
  <div>
    <el-radio-group v-model="type" @change="showChart">
      <el-radio-button label="地图分布"></el-radio-button>
    </el-radio-group>
    <div class="total" id="myChart" ref="myChart" @click="showInfo"></div>
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
  created() {
    this.showCount();
  },
  data() {
    return {
      type: "地图分布",
      shopsCountData: [],
      shopsData: [],
      zoom: 0,
      coordinate: [104.072259, 30.663403]
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
      if (this.type == "地图分布") {
        axios({
          url: "/showstores/counts",
          method: "get"
        }).then(res => {
          console.log(res.data);
          this.shopsCountData = res.data;
          myChart.setOption(this.mapOptions, true);
        });
        myChart.on("finished", () => {
          // 从echarts对象中获取bmap对象
          var bmap = myChart
            .getModel()
            .getComponent("bmap")
            .getBMap();

          // 设置最小缩放值
          bmap.setMinZoom(5);
          // 设置最大缩放值
          // bmap.setMaxZoom(15);
          // 缩放结束后的事件
          bmap.addEventListener("zoomend", e => {
            let zoom = this.zoom;
            this.zoom = bmap.getZoom();
            // 打印出当前缩放值
            if (zoom < bmap.getZoom() && bmap.getZoom() == 10) {
              this.coordinate = [bmap.getCenter().lng, bmap.getCenter().lat];
              console.log(this.coordinate);
              axios({
                url: "/shops",
                method: "get",
                params: {
                  lng: bmap.getCenter().lng,
                  lat: bmap.getCenter().lat
                }
              }).then(res => {
                this.shopsData = res.data;
                let options = this.mapOptions;
                options.bmap.zoom = 10;
                myChart.setOption(this.mapOptions, false);
              });
            } else if (zoom > bmap.getZoom() && bmap.getZoom() <= 10) {
              this.shopsData = [];
              let options = this.mapOptions;
              myChart.setOption(this.mapOptions, false);
            }
          });
        });
      }
    },
    showCount() {
      axios({
        method: "get",
        url: "/showstores/counts"
      }).then(data => {
        console.log(data);
      });
    },
    showInfo(e) {
      console.log(e);
    }
  },
  computed: {
    mapOptions() {
      return {
        title: {
          text: "全国门店统计",
          left: "center",
          textStyle: {
            color: "black"
          }
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: this.coordinate,
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "background",
                elementType: "geometry",
                stylers: {
                  // visibility: "on",
                  color: "#f8e2e2ff"
                }
              },
              {
                featureType: "land",
                elementType: "geometry",
                stylers: {
                  color: "#fff4f4ff"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#064f85"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#ec1111ff"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#00508b"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#1a5787"
                }
              },
              {
                featureType: "city",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "district",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "town",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "门店数",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.shopsCountData,
            symbolSize: function(val) {
              return val[2] * 2;
            },
            // label: {
            //     show: true,
            //     formatter: function(params) {
            //         return params.data[3];
            //     }
            // },
            itemStyle: {
              normal: {
                color: "#ddb926"
              }
            },
            tooltip: {
              formatter: function(params, ticket, callback) {
                return (
                  "城市：" + params.data[3] + "<br>门店数：" + params.data[2]
                );
              }
            }
          },
          {
            name: "门店位置",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.shopsData,
            symbol: "pin",
            symbolSize: 20,
            itemStyle: {
              normal: {
                color: "red"
              }
            },
            tooltip: {
              formatter: function(params, ticket, callback) {
                return (
                  "店铺名称：" + params.data[2] + "<br>地址：" + params.data[3]
                );
              }
            }
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
  height: 500px;
}
.BMap_mask{
  height: 500px;
}
</style>
