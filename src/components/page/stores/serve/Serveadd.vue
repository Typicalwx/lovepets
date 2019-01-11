<template>
    <div class="haha">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="editVisible=true">增加服务</el-button>
        <el-dialog title="增加服务" :visible.sync="editVisible" width="38%">
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                   <el-form-item label="服务类型" style="width:180px">
                        <el-select v-model="form.servetype" @change="change">
                            <el-option key="bbk" label="洗护" value="洗护"></el-option>
                            <el-option key="xtc" label="寄养" value="寄养"></el-option>
                        </el-select>
                    </el-form-item>

                      <el-form-item label="宠物类型" style="width:180px">
                       <el-select v-model="form.pets">
                            <el-option key="bbk" label="猫" value="猫"></el-option>
                            <el-option key="xtc" label="狗" value="狗"></el-option>
                        </el-select>
                        </el-form-item>
                    <el-form-item label="服务名称"> 
                        <el-input v-model="form.severname" style="width:238px"></el-input>
                    </el-form-item>
                    <div class="kg">
                    <el-form-item label="适用规格">
                        <el-input v-model="form.guige" style="width:238px"></el-input>
                    </el-form-item>
                    <el-form-item  label="例:15kg">
                    </el-form-item>
                    </div>
                    <el-form-item label="预约时间">
                        <el-col :span="11">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-time-select
                          v-model="form.date2"
                             :picker-options="{
                              start: '08:30',
                              step: '00:15',
                           end: '18:30'
                               }"
                        placeholder="选择时间">
                          </el-time-select>
                    </el-form-item>
                    <el-form-item v-if="a" label="服务规格">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="普修"></el-radio>
                            <el-radio label="精修"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                     <el-form-item v-else label="服务规格">
                        <el-radio-group v-model="form.resource2">
                            <el-radio label="经济型"></el-radio>
                            <el-radio label="豪华型"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <div class="wawa">  
                    <el-form-item  label="价格：￥">
                        <el-input v-model="form.price" style="width:100px" ></el-input>
                    </el-form-item>
                    <el-form-item v-if="a" label="元 / 次">
                    </el-form-item>
                      <el-form-item v-else label="元 / 天">
                    </el-form-item>
                    </div>                  
                    <el-form-item label="服务描述">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button @click="editVisible=false">取消</el-button>
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
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "store"
);
export default {
  name: "baseform",
  data: function() {
    return {
      a: true,
      editVisible: false,
      form: {
        severname: "",
        servetype: "洗护",
        date1: "",
        date2: "",
        delivery: true,
        resource: "",
        desc: "",
        options: [],
        pets:"猫",
        guige:"",
        price:"",
        resource2:""
      }
    };
  },
  methods: {  
    ...mapActions(["show"]),
    onSubmit() {
      let servetime = this.form.date1 + " " +this.form.date2;
      let serveresource = this.a?this.form.resource:this.form.resource2
        axios({
            method:"post",
            url:"/servetime",
            data:{
                servetype:this.form.servetype,
                pets:this.form.pets,
                severname:this.form.severname,
                guige:this.form.guige,
                servetime,
                serveresource,
                price:this.form.price,
                desc:this.form.desc,
                goodState:2,
                storeId:"11"
            }
        }).then((res)=>{
          console.log(res.data)
          this.show();
           this.$message.success("提交成功！");
           this.editVisible = false
        })
    },
    change(){
     this.a=this.a?false:true;
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
.haha{
margin-left: 10px;
}
.kg{
    display: flex;
}
</style>
