<template>
    <div class="wrapper admin-wrapper">
        <headline title="Панель администрирования">
            <user />
        </headline>
        <navigation />
        <main class="maincontent">
            <section class="admin__container">
                <div class="header">
                    <h2 class="title">Блок "Обо мне"</h2>
                    <iconed-btn @click="emptyCatIsShown = true" v-if="emptyCatIsShown === false" type="iconed" title="Добавить группу" />
                </div>
                <ul class="skills">
                    <li class="item" v-if="emptyCatIsShown">
                        <category @remove="emptyCatIsShown = false" empty />
                    </li>
                    <li class="item" v-for="category in categories" :key="category.id">
                        <category :title="category.category" :skills="category.skills" />
                    </li>
                </ul>
            </section>
        </main>
    </div>
</template>

<script>
import headline from "./components/headline/headline";
import user from "./components/user/user";
import navigation from "./components/navigation/navigation";
import iconedBtn from "./components/button/types/iconedBtn/iconedBtn";
import category from "./components/category/category";
export default {
    components: {
        headline,
        user,
        navigation,
        iconedBtn,
        category,
    },
    data() {
        return {
            categories: [],
            emptyCatIsShown: false,
        };
    },
    created() {
        this.categories = require("./data/categories.json");
    },
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
</style>
<style lang="postcss" scoped src="./app.pcss"></style>
