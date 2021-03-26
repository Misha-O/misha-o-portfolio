<template>
    <div class="user-component">
        <avatar size="2.7" :src="userPicture" />
        <div class="username">Михаил Олейниченко</div>
    </div>
</template>

<script>
import avatar from "../avatar/avatar.vue";
export default {
    components: { avatar },
    computed: {
        userPicture() {
            return require("../../../images/content/user-3.jpg").default;
        },
    },
};
</script>

<style lang="postcss">
.user-component {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
}
.username {
    margin-left: 10px;
}
</style>
