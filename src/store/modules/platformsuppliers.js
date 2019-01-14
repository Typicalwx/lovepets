import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
export default {
    strict: true,
    namespaced: true,
    state: {
        suppliers: [],
        platpagination: [],
        search: { type: "", value: "" },
    },
    mutations: {
        setPlatformsuppliers(state, suppliers) {
            state.suppliers = suppliers;
        },
        setPlatformsuppliespagination(state, platpagination) {
            state.platpagination = platpagination;
        },
        setType(state, type) {
            state.search.type = type;
        },
        setValue(state, value) {
            state.search.value = value;
        }
    },
    actions: {
        setShowsuppliers(context) {
            let { platpagination, search } = context.state;
            axios({
                url: "/platformsuppliers",
                method: "get",
                params: {
                    page: platpagination.curpage || 1,
                    rows: platpagination.eachpage || 3,
                    type: search.type || "",
                    value: search.value || "",
                }
            }).then(({ data }) => {
                context.commit("setPlatformsuppliers", data.rows)
                context.commit("setPlatformsuppliespagination", {
                    curpage: data.curpage,
                    maxpage: data.maxpage,
                    total: data.total
                });
            });
        },
    }
}