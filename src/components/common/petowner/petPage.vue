  
  <template>
  <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="20">
    </el-pagination>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
    computed: {
    ...mapState(["petowners"])
  },
  methods: {
     ...mapActions(["setPetowners"]),
    handleSizeChange(val) {
      // this.setPetowners()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.setPetowners(val)
      console.log(`当前页: ${val}`);
    },
    //     showPage(e) {
    //   this.setStudents(e);
    // },
    // showNext() {
    //   let curpage = parseInt(this.students.curpage);
    //   curpage++;
    //   this.setStudents(curpage);
    // },
    // showPer() {
    //   let curpage = parseInt(this.students.curpage);
    //   curpage--;
    //   this.setStudents(curpage);
    // }
  },
  data() {
    return {
      currentPage4: 4
    };
  }
};
</script>