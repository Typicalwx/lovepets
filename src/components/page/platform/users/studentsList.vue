<template>
  <el-table :data="students" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="age" label="年龄" width="180"></el-table-column>
    <el-table-column prop="gender" label="性别" width="180"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="updateBtn(scope.row._id)">修改</el-button>
        <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  computed: {
    ...mapState(["students"]),
  },
  methods: {
    ...mapActions(["setStudents"]),
    ...mapActions(["setStudent"]),
    ...mapMutations(["setVisible"]),
    updateBtn(id) {

      this.setStudent(id)
      this.setVisible(true)
    },
    del(id) {
      axios({
        method: "delete",
        url: "/students/" + id
      }).then(() => {
        this.setStudents();
      });
    }
  }
};
</script>

<style>
</style>
