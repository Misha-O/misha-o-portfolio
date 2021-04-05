<template>
    <card slim>
        <editLine slot="title" v-model="categoryTitle" :editModeByDefault="empty" @remove="$emit('remove', $event)" @approve="$emit('approve', $event)" />
        <template slot="content">
            <ul class="skills" v-if="empty === false">
                <li class="item" v-for="skill in skills" :key="skill.id">
                    <skill :skill="skill" @remove="$emit('remove-skill', $event)" @approve="$emit('edit-skill', $event)" />
                </li>
            </ul>
            <div class="bottom-line">
                <skill-add-line @approve="$emit('create-skill', $event)" :blocked="empty" />
            </div>
        </template>
    </card>
</template>

<script>
import card from "../card/card";
import editLine from "../editLine/editLine";
import skill from "../skill/skill";
import skillAddLine from "../skillAddLine/skillAddLine";

export default {
    components: { card, editLine, skill, skillAddLine },
    props: {
        empty: {
            type: Boolean,
        },
        title: {
            type: String,
            default: "",
        },
        skills: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            categoryTitle: this.title,
        };
    },
};
</script>

<style lang="postcss" scoped src="./category.pcss"></style>
