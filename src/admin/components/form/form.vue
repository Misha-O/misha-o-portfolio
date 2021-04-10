<template>
    <div class="form-component">
        <form class="form" @submit.prevent="handleSubmit">
            <card title="Добавление работы">
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
                        <div class="form-col">
                            <div class="form-row">
                                <app-input v-model="newProject.title" title="Название" />
                            </div>
                            <div class="form-row">
                                <app-input v-model="newProject.link" title="Ссылка" />
                            </div>
                            <div class="form-row">
                                <app-input v-model="newProject.description" field-type="textarea" title="Описание" />
                            </div>
                            <div class="form-row">
                                <tags-adder v-model="newProject.techs" />
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
import tagsAdder from "../tagsAdder/tagsAdder";
import { mapActions } from "vuex";

export default {
    name: "formProject",
    props: {
        newProject: {
            type: Object,
        },
    },
    components: { card, appButton, appInput, tagsAdder },
    data() {
        return {
            hovered: false,
            // newProject: {
            //     title: "",
            //     link: "",
            //     description: "",
            //     techs: "",
            //     photo: {},
            //     preview: "",
            // },
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

<style src="./form.pcss" lang="postcss" scoped></style>
