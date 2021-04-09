<template>
    <header class="headline-component">
        <div class="headline-container">
            <slot />
            <div class="title">{{ title }}</div>
            <div class="buttons">
                <button type="button" @click="logout" class="btn">Выйти</button>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Headline",
    props: {
        title: {
            type: String,
            default: "Панель администрирования",
        },
    },
    methods: {
        ...mapActions({
            logout: "user/logout",
        }),
    },
};
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>
