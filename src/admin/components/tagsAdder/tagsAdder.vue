<template>
    <div class="tags-adder-component">
        <input title="Добавление тега" v-model="currentTags" @input="$emit('change', currentTags)" />
        <ul class="tags">
            <li class="tag" v-for="(tag, index) in tagsArray" :key="`${tag}${index}`" v-if="tag.trim()">
                <tag @click="removeTag(tag)" interactive :title="tag" />
            </li>
        </ul>
    </div>
</template>

<script>
import input from "../input/input";
import tag from "../tag/tag";
export default {
    props: {
        tags: {
            type: String,
            default: "",
        },
    },
    components: {
        input,
        tag,
    },
    data() {
        return {
            currentTags: this.tags,
        };
    },
    model: {
        prop: "tags",
        event: "change",
    },
    computed: {
        tagsArray() {
            return this.currentTags.trim().split(",");
        },
    },
    methods: {
        removeTag(tag) {
            const tags = [...this.tagsArray];
            const tagNdx = tags.indexOf(tag);
            if (tagNdx < 0) return;
            tags.splice(tagNdx, 1);
            this.currentTags = tags.join(", ");
            this.$emit("change", this.currentTags);
        },
    },
};
</script>

<style lang="postcss" scoped>
.tags {
    display: flex;
    margin-top: 20px;
}
.tag {
    margin-right: 10px;
}
</style>
