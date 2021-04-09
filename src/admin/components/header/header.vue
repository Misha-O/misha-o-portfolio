<template>
    <div class="header-component">
        <headline title="Панель администрирования">
            <user />
        </headline>
        <navigation />
    </div>
</template>

<script>
import headline from "../../components/headline/headline";
import user from "../../components/user/user";
import navigation from "../../components/navigation/navigation";
export default {
    components: {
        headline,
        user,
        navigation,
    },
};
</script>
