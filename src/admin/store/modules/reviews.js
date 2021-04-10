export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_REVIEW(state, newReview) {
            state.data.push(newReview);
        },
        SET_REVIEWS(state, reviews) {
            state.data = reviews;
        },
        REMOVE_REVIEW(state, reviewId) {
            state.data = state.data.filter(review => review.id !== reviewId);
        },
        EDIT_REVIEW(state, reviewToEdit) {
            console.log("store mutation", reviewToEdit);
        },
    },
    actions: {
        async add({ commit }, newReview) {
            // to collect data in needed format
            const formData = new FormData();
            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            });

            try {
                const { data } = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
            } catch (error) {
                console.log("error");
            }
        },

        async fetch({ commit }) {
            try {
                const { data } = await this.$axios.get("/reviews/445");
                console.log(data);
                commit("SET_REVIEWS", data);
            } catch (error) {
                console.log("error");
            }
        },
        async remove({ commit }, reviewId) {
            try {
                const { data } = await this.$axios.delete(`/reviews/${reviewId}`);
                console.log(data);
                commit("REMOVE_REVIEW", reviewId);
            } catch (error) {
                console.log(error);
                throw new Error("Error remove actions");
            }
        },
        async edit({ commit }, reviewToEdit) {
            try {
                const { data } = await this.$axios.post(`/reviews/${reviewToEdit.id}`, {
                    title: reviewToEdit.title,
                    techs: reviewToEdit.techs,
                    photo: reviewToEdit.photo,
                    link: reviewToEdit.link,
                    description: reviewToEdit.description,
                });
                console.log("IN STORE: !", data);
                commit("EDIT_REVIEW", data);
            } catch (error) {
                console.log(error);
                throw new Error("Error edit actions");
            }
        },
    },
};
