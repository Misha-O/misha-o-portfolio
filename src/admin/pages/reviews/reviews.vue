<template>
    <div class="reviews-page-component page-component">
        <main class="maincontent">
            <div class="admin__container">
                <div class="header">
                    <div class="title">
                        Блок "Отзывы"
                    </div>
                </div>
                <div class="form">
                    <app-form />
                </div>
                <ul class="cards">
                    <li class="item" v-for="review in reviews" :key="review.id">
                        <review-card :review="review" @remove="removeReview(review.id)" @edit="editReview" />
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
import appForm from "../../components/formReview/formReview";
import reviewCard from "../../components/reviewCard/reviewCard";
import { mapState, mapActions } from "vuex";

export default {
    name: "Reviews",
    components: { appForm, reviewCard },
    data() {
        return {
            edittedReview: {
                author: "",
                occ: "",
                text: "",
                photo: {},
                preview: "",
            },
        };
    },
    computed: {
        ...mapState("reviews", {
            reviews: state => state.data,
        }),
    },
    methods: {
        ...mapActions({
            fetchReviews: "reviews/fetch",
            removeReviewAction: "reviews/remove",
            editReviewAction: "reviews/edit",
        }),
        removeReview(reviewID) {
            this.removeReviewAction(reviewID);
        },
        editReview(reviewToEdit) {
            this.edittedReview = reviewToEdit;
            console.log(this.edittedReview);
            // this.editReviewAction(reviewToEdit);
        },
    },
    mounted() {
        this.fetchReviews();
    },
};
</script>

<style scoped lang="postcss" src="./reviews.pcss"></style>
