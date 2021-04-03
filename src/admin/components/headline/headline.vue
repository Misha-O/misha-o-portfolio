<template>
    <header class="headline-component">
        <div class="headline-container">
            <slot />
            <div class="title">{{ title }}</div>
            <div class="buttons">
                <button type="button" class="btn">Выйти</button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Панель администрирования",
        },
    },
};
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>
