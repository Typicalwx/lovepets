<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
      <el-select v-model="type" slot="prepend" placeholder="请选择" class="selectbox">
        <el-option label="姓名" value="name"></el-option>
        <el-option label="年龄" value="age"></el-option>
        <el-option label="性别" value="gender"></el-option>
      </el-select>
      <el-button slot="append" @click="cliBtn" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    computed:{
        ...mapState(["search"]),
        ...mapMutations(["setType","setValue"]),
        type:{
            get(){
                return this.search.type
            },
            set(value){
                this.$store.commit("setType",value)
            }
        },
        value:{
            get(){
                return this.search.value
            },
            set(value){
                this.$store.commit("setValue",value)
            }
        },
    },
    methods:{
        ...mapActions(["setStudents"]),
        cliBtn(type,value){
            this.setStudents({type,value})
        }
    }
};
</script>

<style>
   .selectbox{
       width: 100px;
   }
</style>
