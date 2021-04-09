<template>
    <card simple>
        <div class="projects-wrapper">
            <div class="pic">
                <img class="image" :src="cover" />
                <div class="tag">
                    <tags-list :tags="project.techs" />
                </div>
            </div>
            <div class="data">
                <div class="title">{{ project.title }}</div>
                <div class="text">
                    <p>{{ project.description }}</p>
                </div>
                <a :href="project.link" class="link">{{ project.link }}</a>
                <div class="btns">
                    <icon @click="$emit('edit', project)" symbol="pencil" title="Править"></icon>
                    <icon @click="$emit('remove', $event)" symbol="trash" title="Удалить"></icon>
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
    name: "projectCard",
    components: { card, icon, tagsList },
    props: {
        project: Object,
    },
    computed: {
        cover() {
            return `https://webdev-api.loftschool.com/${this.project.photo}`;
        },
    },
};
</script>

<style scoped lang="postcss" src="./projectCard.pcss"></style>
