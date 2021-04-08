export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_PROJECT(state, newProject) {
            state.data.push(newProject);
        },
        SET_PROJECTS(state, projects) {
            state.data = projects;
        },
    },
    actions: {
        async add({ commit }, newProject) {
            try {
                const { data } = await this.$axios.post("/works");
                commit("ADD_PROJECT", data);
            } catch (error) {
                console.log("error");
            }
        },

        async fetch({ commit }) {
            try {
                const { data } = await this.$axios.get("/works/1");
                commit("SET_PROJECTS", data);
            } catch (error) {
                console.log("error");
            }
        },
    },
};
