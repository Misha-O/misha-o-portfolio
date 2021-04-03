<template>
    <div class="input__error-tooltip-container">{{ text }}</div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: "Input can not be empty !",
        },
    },
};
</script>

<style lang="postcss" scoped src="./tooltip.pcss"></style>
