<template>
    <div class="projects-page-component page-component">
        <main class="maincontent">
            <div class="admin__container">
                <div class="header">
                    <div class="title">
                        Блок "Отзывы"
                    </div>
                </div>
                <div class="form">
                    <app-form :newProject="tempProject" />
                </div>
                <ul class="cards">
                    <li class="item" v-for="project in projects" :key="project.id">
                        <project-card :project="project" @remove="removeProject(project.id)" @edit="editProject" />
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
import appForm from "../../components/formReview/formReview";
import projectCard from "../../components/reviewCard/reviewCard";
import { mapState, mapActions } from "vuex";

export default {
    name: "Reviews",
    components: { appForm, projectCard },
    data() {
        return {
            tempProject: {},
        };
    },
    computed: {
        ...mapState("projects", {
            projects: state => state.data,
        }),
    },
    methods: {
        ...mapActions({
            fetchProjects: "projects/fetch",
            removeProjectAction: "projects/remove",
            editProjectAction: "projects/edit",
        }),
        removeProject(projectID) {
            this.removeProjectAction(projectID);
        },
        editProject(projectToEdit) {
            this.tempProject = projectToEdit;
            console.log(this.tempProject);
            // this.editProjectAction(projectToEdit);
        },
    },
    mounted() {
        this.fetchProjects();
    },
};
</script>

<style scoped lang="postcss" src="./reviews.pcss"></style>
