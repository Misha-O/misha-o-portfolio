<template>
    <div class="form-component">
        <form class="form" @submit.prevent="handleSubmit">
            <card title="Добавление работы">
                <div class="form-container" slot="content">
                    <div class="form-cols">
                        <div class="form-col">
                            <label :style="{ backgroundImage: `url(${newProject.preview})` }" :class="['uploader', { active: newProject.preview }]">
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
    components: { card, appButton, appInput, tagsAdder },
    data() {
        return {
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
            const file = event.target.files[0];
            this.newProject.photo = file;

            this.renderPhoto(file);
        },
        renderPhoto(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                this.newProject.preview = reader.result;
            };
        },
    },
};
</script>

<style src="./form.pcss" lang="postcss" scoped></style>
