<template>
    <el-form  label-width="50px">
      <el-form-item label="宠物名">
         <el-input :value="pet.name" @input="$emit('input',$event.target.value)"></el-input>
     </el-form-item>
     <el-form-item label="品类">
         <el-input :value="pet.variety"></el-input>
     </el-form-item>
     <el-form-item label="种类">
         <el-input :value="pet.type"></el-input>
     </el-form-item>
    <el-form-item label="颜色">
         <el-input :value="pet.color"></el-input>
    </el-form-item>
       <el-form-item label="出生日期">
         <el-input :value="pet.birth"> </el-input>
    </el-form-item>
       <el-form-item label="性格">
         <el-input :value="pet.character"></el-input>
    </el-form-item>
    </el-form>
</template>
<script>
export default {
  props: ["pet"],
  created: function() {
    //  console.log(aaaa)
  }
};
</script>

<style>
</style>
