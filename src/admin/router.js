import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import about from "./pages/about/about.vue";
import login from "./pages/login/login.vue";
import header from "./components/header/header.vue";
const routes = [
    {
        path: "/",
        components: {
            default: about,
            header: header,
        },
    },
    {
        path: "/login",
        component: login,
    },
];

export default new VueRouter({ routes });
