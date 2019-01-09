<template>
  <div>
    <div>
      <studentsAdd></studentsAdd>
      <studentsSearch></studentsSearch>
    </div>
    <studentsUpdate></studentsUpdate>
    <studentsList></studentsList>
    <studentsPage></studentsPage>
  </div>
</template>

<script>
import studentsAdd from "./studentsAdd.vue";
import studentsList from "./studentsList.vue";
import studentsUpdate from "./studentsUpdate.vue";
import studentsPage from "./studentsPage.vue";
import studentsSearch from "./studentsSearch";
import { mapActions , mapMutations} from "vuex";
export default {
  created() {
    this.setStudents();
  },
  components: {
    studentsList,
    studentsAdd,
    studentsUpdate,
    studentsPage,
    studentsSearch
  },
  methods: {
    ...mapMutations(["setPagination"]),
    ...mapActions(["setStudents"])
  }
};
</script>

<style>
</style>
