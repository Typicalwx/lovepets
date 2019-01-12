<template>
    <div>
            <el-dialog title="购买商品展示" :visible.sync="weigoummai" width="38%">
                  <el-table
      :data="contactarr"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">

      <el-table-column
        prop="goodState"
        label="类型"
        width="180">
      </el-table-column>



      <el-table-column
        prop="shangpingname"
        label="名称">
      </el-table-column>



       <el-table-column
        prop="num"
        label="数量">
      </el-table-column>


      <el-table-column
        prop="price"
        label="单价（元）">
      </el-table-column>

      <el-table-column
        prop="total"
        label="总额（元）">
      </el-table-column>

    </el-table>
            </el-dialog>
    </div>
</template>



<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("store");
export default {
  
  data() {
      return {
        spanArr:[],
        position:0,
      };
    },
  
    beforeUpdate(){
       this.rowspan();
    },
    methods:{ 
      rowspan(){
        this.spanArr = [];//在data里面定义
        this.position = 0; //在data里面定义
        this.contactarr.forEach((item,index) => {
          if( index === 0){
            this.spanArr.push(1);
            this.position = 0;
            // item.sequence=index+1;//设置序号
          }else{
            if(this.contactarr[index].goodState === this.contactarr[index-1].goodState ){
              this.spanArr[this.position] += 1;//连续有几行项目名名称相同
              this.spanArr.push(0); // 名称相同后往数组里面加一项0
              console.log(this.spanArr)
              //当项目名称相同时，设置当前序号和前一个相同
              // this.tableData1[index].sequence = this.tableData1[index-1].sequence;
            }else{
              this.spanArr.push(1);
              this.position = index;
              //当项目名称不同时，将当前序号设置为前一个序号+1
              // this.tableData1[index].sequence = this.tableData1[index-1].sequence+1;
            }
          }
        })
      },



      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
     if(columnIndex === 0){  //序号列也进行合并(第一列)
          //this.spanArr这个数组里面存的是table里面连续的有几条数据相同
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row, //行
            colspan: _col  //列
          }


        }
        // if(columnIndex === 1){ //项目列也进行合并(第二列)
        //   const _row = this.spanArr[rowIndex];
        //   const _col = _row>0 ? 1 : 0;
        //   return {
        //     rowspan: _row,
        //     colspan: _col
        //   }
        // } 
      }


    },
    computed:{
         ...mapState(["weigoummai","contactarr"]),
    weigoummai: {
      get() {
        return this.$store.state.store.weigoummai;
      },
      set(weigoummai) {
        this.$store.commit("store/setweigoummai", weigoummai);
      }
    },
    }
    


};
</script>

<style>
</style>
