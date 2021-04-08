<template>
    <div class="projects-page-component page-component">
        <div class="page-content">
            <div class="container">
                <div class="page-header">
                    <div class="page-title">
                        Блок "Работы"
                    </div>
                </div>
                <div class="form">
                    <app-form />
                </div>
                <ul class="cards">
                    <li class="item" v-for="project in projects" :key="project.id">
                        <project-card :project="project" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import appForm from "../../components/form/form";
import projectCard from "../../components/projectCard/projectCard";
import { mapState, mapActions } from "vuex";

export default {
    components: { appForm, projectCard },
    computed: {
        ...mapState("projects", {
            projects: state => state.data,
        }),
    },
    methods: {
        ...mapActions({
            fetchProjects: "projects/fetch",
        }),
    },
    mounted() {
        this.fetchProjects();
    },
};
</script>

<style scoped lang="postcss" src="./projects.pcss"></style>
