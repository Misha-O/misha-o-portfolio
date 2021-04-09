<template>
    <div class="login-page-component">
        <div class="content">
            <form class="form" @submit.prevent="handleSubmit">
                <div class="form-title">Авторизация</div>
                <div class="row">
                    <app-input title="Логин" v-model="user.name" icon="user" :errorText="validation.firstError('user.name')" />
                </div>
                <div class="row">
                    <app-input title="Пароль" v-model="user.password" type="password" icon="key" :errorText="validation.firstError('user.password')" />
                </div>
                <div class="btn">
                    <app-button :disabled="isSubmitDisabled" title="Отправить" typeAttr="submit" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import $axios from "../../requests.js";
import { mapActions } from "vuex";

export default {
    name: "Login",
    components: { appButton, appInput },
    mixins: [ValidatorMixin],
    validators: {
        "user.name": value => {
            return Validator.value(value).required("Enter username");
        },
        "user.password": value => {
            return Validator.value(value).required("Enter password");
        },
    },
    data() {
        return {
            user: {
                name: "",
                password: "",
            },
            isSubmitDisabled: false,
        };
    },
    methods: {
        ...mapActions({
            showTooltip: "tooltips/show",
            login: "user/login",
        }),
        async handleSubmit() {
            if ((await this.$validate()) === false) return;
            this.isSubmitDisabled = true;
            try {
                const response = await $axios.post("/login", this.user);

                const token = response.data.token;
                localStorage.setItem("token", token);
                $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

                const userResponse = await $axios.get("/user");
                this.login(userResponse.data.user);
                this.$router.replace("/about");
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error",
                });
            } finally {
                this.isSubmitDisabled = false;
            }
        },
    },
};
</script>

<style lang="postcss" scoped src="./login.pcss"></style>
