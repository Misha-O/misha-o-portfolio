<template>
    <div class="edit-line-component" :class="{ blocked: blocked }">
        <div class="title" v-if="editmode === false">
            <div class="text">{{ value }}</div>
            <div class="icon">
                <icon symbol="pencil" grayscale @click="editmode = true"></icon>
            </div>
        </div>
        <div v-else class="title">
            <div class="input">
                <app-input
                    placeholder="Название новой группы"
                    :value="value"
                    :errorText="errorText"
                    required
                    @input="$emit('input', $event)"
                    @keydown.native.enter="onApprove"
                    autofocus="autofocus"
                    no-side-paddings="no-side-paddings"
                ></app-input>
                <tooltip v-if="validation.hasError('value')" />
            </div>
            <div class="buttons">
                <div class="button-icon">
                    <icon symbol="tick" @click="onApprove"></icon>
                </div>
                <div class="button-icon">
                    <icon symbol="cross" @click="$emit('remove', value)"></icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Validator } from "simple-vue-validator";
import appInput from "../input/input";
import icon from "../icon/icon";
import tooltip from "../tooltip/tooltip";

export default {
    components: { appInput, icon, tooltip },
    mixins: [require("simple-vue-validator").mixin],
    validators: {
        value(value) {
            return Validator.value(value).required(this.errorText);
        },
    },
    props: {
        value: {
            type: String,
            default: "",
        },
        errorText: {
            type: String,
            default: "",
        },
        editModeByDefault: Boolean,
        blocked: Boolean,
    },
    data() {
        return {
            editmode: this.editModeByDefault,
            title: this.value,
        };
    },
    methods: {
        onApprove() {
            if (this.value.trim() === "") return false;
            if (this.title.trim() === this.value.trim()) {
                this.editmode = false;
            } else {
                this.$emit("approve", this.value);
                this.editmode = false;
            }
        },
    },
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>
<style lang="postcss">
.input {
    position: relative;
}
.input .valid-error {
    border: 1px solid firebrick;
}
.input .error {
    position: absolute;
    top: -70%;
    left: 0;
    color: firebrick;
}
</style>
