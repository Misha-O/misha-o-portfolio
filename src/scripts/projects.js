import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

const tags = {
    template: "#projects-tags",
    props: ["tags"],
};
const info = {
    template: "#projects-info",
    props: ["currentProject"],
    components: {
        tags,
    },
    computed: {
        tagsArray() {
            return this.currentProject.skills.split(",");
        },
    },
};

const thumbs = {
    template: "#projects-thumbs",
    props: ["projects", "currentProject"],
};
const btns = {
    template: "#projects-btns",
};
const display = {
    template: "#projects-display",
    props: ["currentProject", "projects", "currentIndex"],
    components: {
        thumbs,
        btns,
    },
    computed: {
        reversedProjects() {
            const projects = [...this.projects];
            return projects.splice(0, 3).reverse();
        },
    },
};

new Vue({
    el: "#projects-component",
    template: "#projects-container",
    components: {
        display,
        info,
    },
    data() {
        return {
            projects: [],
            currentIndex: 0,
        };
    },
    computed: {
        currentProject() {
            return this.projects[0];
        },
    },
    watch: {
        currentIndex(value) {
            console.log(value);
            this.infiniteIndexLoop(value);
        },
    },
    methods: {
        requireImagesToArray(data) {
            return data.map(item => {
                const requiredImage = item.photo;
                item.photo = requiredImage;
                return item;
            });
        },
        slideChange(direction) {
            const lastItem = this.projects[this.projects.length - 1];
            switch (direction) {
                case "next":
                    this.projects.push(this.projects[0]);
                    this.projects.shift();
                    this.currentIndex++;
                    break;
                case "prev":
                    this.projects.unshift(lastItem);
                    this.projects.pop();
                    this.currentIndex--;
                    break;
                default:
                    break;
            }
        },
        infiniteIndexLoop(index) {
            const projectsNumber = this.projects.length - 1;
            if (index < 0) this.currentIndex = projectsNumber;
            if (index > projectsNumber) this.currentIndex = 0;
        },
    },
    async created() {
        const { data } = await axios.get("/works/445");
        this.projects = this.requireImagesToArray(data);
    },
});
