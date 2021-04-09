<template>
    <div class="form-component">
        <form class="form" @submit.prevent="handleSubmit">
            <card title="Новый отзыв">
                <div class="form-container" slot="content">
                    <div class="form-cols">
                        <div class="form-col">
                            <label
                                :style="{ backgroundImage: `url(${newProject.preview})` }"
                                :class="['uploader', { active: newProject.preview }, { hovered: hovered }]"
                                @dragover.prevent="handleDragOver"
                                @dragleave="hovered = false"
                                @drop="handleChange"
                            >
                                <div class="uploader-title">Перетащите или загрузите картинку</div>
                                <div class="uploader-btn">
                                    <app-button typeAttr="file" @change="handleChange"></app-button>
                                </div>
                            </label>
                        </div>
                        <div class="form-col form-col-data">
                            <div class="form-row-group">
                                <div class="form-row">
                                    <app-input v-model="newProject.title" title="Имя автора" />
                                </div>
                                <div class="form-row">
                                    <app-input v-model="newProject.link" title="Дефтельность" />
                                </div>
                            </div>
                            <div class="form-row">
                                <app-input v-model="newProject.description" field-type="textarea" title="Отзыв" />
                            </div>
                        </div>
                    </div>
                    <div class="form-btns">
                        <div class="btn">
                            <app-button title="Отмена" plain></app-button>
                        </div>
                        <div class="btn">
                            <app-button title="Сохранить" typeAttr="submit"></app-button>
                        </div>
                    </div>
                </div>
            </card>
        </form>
    </div>
</template>

<script>
import card from "../card/card";
import appButton from "../button/button";
import appInput from "../input/input";
import { mapActions } from "vuex";

export default {
    name: "formProject",
    props: ["newProject"],
    components: { card, appButton, appInput },
    data() {
        return {
            hovered: false,
            newProject: {
                title: "",
                link: "",
                description: "",
                techs: "",
                photo: {},
                preview: "",
            },
        };
    },
    methods: {
        ...mapActions({
            addNewProject: "projects/add",
        }),
        async handleSubmit() {
            await this.addNewProject(this.newProject);
        },
        handleChange(event) {
            event.preventDefault();
            console.log(event);
            const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
            this.newProject.photo = file;

            this.renderPhoto(file);
            this.hovered = false;
        },
        renderPhoto(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                this.newProject.preview = reader.result;
            };
        },
        handleDragOver(e) {
            // e.preventDefault();
            this.hovered = true;
        },
    },
};
</script>

<style src="./formReview.pcss" lang="postcss" scoped></style>
