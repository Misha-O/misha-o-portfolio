import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";

Vue.use(VueRouter);

import about from "./pages/about/about.vue";
import login from "./pages/login/login.vue";
import projects from "./pages/projects/projects.vue";
import reviews from "./pages/reviews/reviews.vue";
import header from "./components/header/header.vue";
const routes = [
    {
        path: "/about",
        name: "About",
        components: {
            default: about,
            header: header,
        },
    },
    {
        path: "/projects",
        name: "Projects",
        components: {
            default: projects,
            header: header,
        },
    },
    {
        path: "/reviews",
        name: "Reviews",
        components: {
            default: reviews,
            header: header,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: login,
        meta: {
            public: true,
        },
    },
];

const router = new VueRouter({ routes });

const guard = axios.create({
    baseURL: "https://webdev-api.loftschool.com/",
});

router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["user/userIsLoggedIn"];

    next();

    if (isPublicRoute === false && isUserLoggedIn === false) {
        const token = localStorage.getItem("token");

        guard.defaults.headers["Authorization"] = `Bearer ${token}`;

        try {
            const response = await guard.get("/user");
            store.dispatch("user/login", await response.data.user);
            next();
        } catch (error) {
            router.replace("/login");
            localStorage.removeItem("token");
        }
    } else {
        next();
    }
});

export default router;
