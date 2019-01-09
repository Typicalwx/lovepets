<template>
  <!-- <el-pagination
    background
    layout="total,prev, pager, next"
    :page-size="pagination.eachpage"
    :total="pagination.total"
    @current-change="changePage"
    @size-change="changeSize"
  ></el-pagination>-->
  <div class="block">
    <span class="demonstration"></span>
    <el-pagination
      background
      @size-change="changeSize"
      @current-change="changePage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setPagination"]),
    ...mapActions(["setStudents"]),
    changePage(page) {
      this.setPagination({...this.pagination,curpage:page})
      this.setStudents({ page, rows: this.pagination.eachpage });
    },
    changeSize(size) {
      this.setPagination({...this.pagination,eachpage:size})
      this.setStudents({ page: 1, rows: size });
    }
  },
  computed: {
    ...mapState(["pagination"])
  }
};
</script>

<style>
</style>
