<template>
    <nav class="navigation-component">
        <div class="container">
            <ul class="list">
                <li v-for="link in links" :class="['item', { active: link.active }]" :key="link.id">
                    <router-link :to="{ path: link.title }" class="link">{{ link.title }}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
const links = [
    { id: 0, title: "About" },
    { id: 1, title: "Projects" },
    { id: 2, title: "Reviews" },
];
export default {
    data() {
        return {
            links,
        };
    },
};
</script>

<style lang="postcss" scoped src="./navigation.pcss"></style>
