<template>
    <card simple>
        <div class="reviews-wrapper">
            <div class="title-wrap">
                <div class="pic">
                    <img class="image" :src="cover" />
                </div>
                <div class="user-info">
                    <div class="title">{{ review.author }}</div>
                    <div class="occ">{{ review.occ }}</div>
                </div>
            </div>
            <div class="review-wrap">
                <div class="text">
                    <p>{{ review.text }}</p>
                </div>
                <div class="btns">
                    <icon @click="$emit('edit', review)" symbol="pencil" title="Править"></icon>
                    <icon @click="$emit('remove', $event)" symbol="cross" title="Удалить"></icon>
                </div>
            </div>
        </div>
    </card>
</template>

<script>
import card from "../card/card";
import icon from "../icon/icon";
import tagsList from "../tagList/tagList";

export default {
    name: "reviewCard",
    components: { card, icon, tagsList },
    props: {
        review: Object,
    },
    computed: {
        cover() {
            return `https://webdev-api.loftschool.com/${this.review.photo}`;
        },
    },
};
</script>

<style scoped lang="postcss" src="./reviewCard.pcss"></style>
