export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_PROJECT(state, newProject) {
            console.log("projects", state.data);
            state.data.push(newProject);
        },
        SET_PROJECTS(state, projects) {
            state.data = projects;
        },
        REMOVE_PROJECT(state, projectId) {
            state.data = state.data.filter(project => project.id !== projectId);
        },
        EDIT_PROJECT(state, projectToEdit) {
            console.log("store mutation", projectToEdit);
        },
    },
    actions: {
        async add({ commit }, newProject) {
            // to collect data in needed format
            const formData = new FormData();
            Object.keys(newProject).forEach(item => {
                formData.append(item, newProject[item]);
            });

            try {
                const { data } = await this.$axios.post("/works", formData);
                console.log("STORE ADD PROJCT:", data);
                commit("ADD_PROJECT", data);
            } catch (error) {
                console.log("error");
            }
        },

        async fetch({ commit }) {
            try {
                const { data } = await this.$axios.get("/works/445");
                commit("SET_PROJECTS", data);
            } catch (error) {
                console.log("error");
            }
        },
        async remove({ commit }, projectId) {
            try {
                const { data } = await this.$axios.delete(`/works/${projectId}`);
                console.log(data);
                commit("REMOVE_PROJECT", projectId);
            } catch (error) {
                console.log(error);
                throw new Error("Error remove actions");
            }
        },
        async edit({ commit }, projectToEdit) {
            try {
                const { data } = await this.$axios.post(`/works/${projectToEdit.id}`, {
                    title: projectToEdit.title,
                    techs: projectToEdit.techs,
                    photo: projectToEdit.photo,
                    link: projectToEdit.link,
                    description: projectToEdit.description,
                });
                console.log("IN STORE: !", data);
                commit("EDIT_PROJECT", data);
            } catch (error) {
                console.log(error);
                throw new Error("Error edit actions");
            }
        },
    },
};
