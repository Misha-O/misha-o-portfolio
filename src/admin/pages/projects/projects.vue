<template>
    <div class="projects-page-component page-component">
        <main class="maincontent">
            <div class="admin__container">
                <div class="header">
                    <div class="title">
                        Блок "Работы"
                    </div>
                </div>
                <div class="form">
                    <app-form :newProject="edittedProject" />
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
import appForm from "../../components/form/form";
import projectCard from "../../components/projectCard/projectCard";
import { mapState, mapActions } from "vuex";

export default {
    name: "Projects",
    components: { appForm, projectCard },
    data() {
        return {
            edittedProject: {
                title: "",
                link: "",
                description: "",
                techs: "",
                photo: {},
                preview: "",
            },
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
            this.edittedProject = projectToEdit;
            console.log(this.edittedProject);
            // this.editProjectAction(projectToEdit);
        },
    },
    mounted() {
        this.fetchProjects();
        console.log("vue:", this.projects);
    },
};
</script>

<style scoped lang="postcss" src="./projects.pcss"></style>
