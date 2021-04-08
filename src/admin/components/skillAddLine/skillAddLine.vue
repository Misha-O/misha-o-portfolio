<template>
    <div :class="['skill-add-line-component', { blocked: blocked }]">
        <div class="title">
            <app-input :errorText="validation.firstError('skill.title')" v-model="skill.title" placeholder="Новый навык" />
        </div>
        <div class="percent">
            <app-input :errorText="validation.firstError('skill.percent')" v-model="skill.percent" type="number" min="0" max="100" maxlength="3" />
        </div>
        <div class="button">
            <round-button type="round" @click="handleClick" />
        </div>
    </div>
</template>

<script>
import input from "../input/input";
import button from "../button/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
    mixins: [ValidatorMixin],
    validators: {
        "skill.title": value => {
            return Validator.value(value).required("Can not be empty");
        },
        "skill.percent": value => {
            return Validator.value(value)
                .integer("Must be a number")
                .between(0, 100, "Invalid value")
                .required("Can not be empty");
        },
    },
    props: {
        blocked: Boolean,
    },
    components: {
        appInput: input,
        roundButton: button,
    },
    data() {
        return {
            skill: {
                title: "",
                percent: "",
            },
        };
    },
    methods: {
        async handleClick() {
            if ((await this.$validate()) === false) return;
            this.$emit("approve", this.skill);
        },
    },
};
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>
