<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="店名" width="180"></el-table-column>
    <el-table-column prop="addr" label="地址"></el-table-column>
    <el-table-column prop="tel" label="电话" width="180"></el-table-column>
    <el-table-column prop="web" label="网址" width="180"></el-table-column>
    <el-table-column prop="supImages" label="营业执照"></el-table-column>
    <el-table-column prop="remark" label="备注"></el-table-column>
  </el-table>
</template>

<script>
export default {};
</script>

<style>
</style>
