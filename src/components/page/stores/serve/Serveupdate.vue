<template>
    <div class="haha">
        <el-dialog title="修改服务" :visible.sync="updateeditVisible" width="38%">
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="updateserveitem" label-width="80px">
                    <el-form-item label="服务类型" style="width:180px">
                        <el-select v-model="servetype" @change="change">
                            <el-option key="bbk" label="洗护" value="洗护"></el-option>
                            <el-option key="xtc" label="寄养" value="寄养"></el-option>
                        </el-select>
                    </el-form-item>

                      <el-form-item label="宠物类型" style="width:180px">
                       <el-select v-model="pets">
                            <el-option key="bbk" label="猫" value="猫"></el-option>
                            <el-option key="xtc" label="狗" value="狗"></el-option>
                        </el-select>
                        </el-form-item>
                    <el-form-item label="服务名称"> 
                        <el-input v-model="severname" style="width:238px"></el-input>
                    </el-form-item>
                    <div class="kg">
                    <el-form-item label="适用规格">
                        <el-input v-model="guige" style="width:238px"></el-input>
                    </el-form-item>
                    <el-form-item  label="例:15kg">
                    </el-form-item>
                    </div>
                    <el-form-item label="预约时间">
                        <el-col :span="11">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="data" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-time-select
                          v-model="datatwo"
                             :picker-options="{
                              start: '08:30',
                              step: '00:15',
                           end: '18:30'
                               }"
                        placeholder="选择时间">
                          </el-time-select>
                    </el-form-item>
                    <el-form-item v-if="a" label="服务规格">
                        <el-radio-group v-model="serveresource">
                            <el-radio label="普修"></el-radio>
                            <el-radio label="精修"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                     <el-form-item v-else label="服务规格">
                        <el-radio-group v-model="serveresource">
                            <el-radio label="经济型"></el-radio>
                            <el-radio label="豪华型"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <div class="wawa">  
                    <el-form-item  label="价格：￥">
                        <el-input v-model="price" style="width:100px" ></el-input>
                    </el-form-item>
                    <el-form-item v-if="a" label="元 / 次">
                    </el-form-item>
                      <el-form-item v-else label="元 / 天">
                    </el-form-item>
                    </div>                  
                    <el-form-item label="服务描述">
                        <el-input type="textarea" rows="5" v-model="desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">修改</el-button>
                        <el-button @click="onquxiao">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
         </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("store");
export default {
  name: "baseform",
  data: function() {
    return {
  
    };
  },
  computed: {
    ...mapState(["updateserveitem", "pagenation", "updateeditVisible","a","data1","data2"]),
    updateeditVisible: {
      get() {
        return this.$store.state.store.updateeditVisible;
      },
      set(updateeditVisible) {
        this.$store.commit("store/setupdateeditVisible", updateeditVisible);
      }
    },

    servetype: {
      get() {
        return this.updateserveitem.servetype;
      },
      set(servetype) {
        this.$store.commit("store/setupdateserveitem", {
          ...this.updateserveitem,
          servetype
        });
      }
    },
    pets: {
      get() {
        return this.updateserveitem.pets;
      },
      set(pets) {
        this.$store.commit("store/setupdateserveitem", {
          ...this.updateserveitem,
          pets
        });
      }
    },
    severname: {
      get() {
        return this.updateserveitem.severname;
      },
      set(severname) {
        this.$store.commit("store/setupdateserveitem", {
          ...this.updateserveitem,
          severname
        });
      }
    },
     guige:{
      get() {
        return this.updateserveitem.guige;
      },
      set(guige) {
        this.$store.commit("store/setupdateserveitem", {
          ...this.updateserveitem,
          guige
        });
      }
    },

  price:{
      get() {
        return this.updateserveitem.price;
      },
      set(price) {
        this.$store.commit("store/setupdateserveitem", {
          ...this.updateserveitem,
          price
        });
      }
    },


  serveresource:{
      get() {
        return this.updateserveitem.serveresource;
      },
      set(serveresource) {
        this.$store.commit("store/setupdateserveitem", {
          ...this.updateserveitem,
          serveresource
        });
      }
    },



  desc:{
      get() {
        return this.updateserveitem.desc;
      },
      set(desc) {
        this.$store.commit("store/setupdateserveitem", {
          ...this.updateserveitem,
          desc
        });
      }
    },




  data:{
      get() {
        return this.data1;
      },
      set(data1) {
        this.$store.commit("store/setdata1",data1);
      }
    },
  datatwo:{
      get() {
        return this.data2;
      },
      set(data2) {
        this.$store.commit("store/setdata2",data2);
      }
    },






  },
  methods: {
    ...mapMutations(["setupdateeditVisible", "setupdateserveitem","seta"]),
    ...mapActions(["show"]),
    onquxiao() {
      this.setupdateeditVisible(false);
    },
    onSubmit() {
        console.log(this.updateserveitem)
        console.log(this.data1+" "+this.data2)
   axios({
            method:"put",
            url:"/servetime/"+this.updateserveitem._id,
            data:{
                servetype:this.updateserveitem.servetype,
                pets:this.updateserveitem.pets,
                severname:this.updateserveitem.severname,
                guige:this.updateserveitem.guige,
                servetime:this.data1+" "+this.data2,
                serveresource:this.updateserveitem.serveresource,
                price:this.updateserveitem.price,
                desc:this.updateserveitem.desc,
            }
        }).then((res)=>{
           this.show();
           this.$message.success("修改成功!");
           this.setupdateeditVisible(false);
        })
    },
    change() {

      let a = this.a ? false : true;
      this.seta(a);
    }
  }
};
</script>
<style>
.price {
  width: 200px;
}
.wawa {
  display: flex;
}
.haha {
  margin-left: 10px;
}
.kg {
  display: flex;
}
</style>
