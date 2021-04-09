<template>
    <div class="about-page-component">
        <main class="maincontent">
            <section class="admin__container" v-if="categories.length">
                <div class="header">
                    <h2 class="title">Блок "Обо мне"</h2>
                    <iconed-btn @click="emptyCatIsShown = true" v-if="emptyCatIsShown === false" type="iconed" title="Добавить группу" />
                </div>
                <ul class="skills">
                    <li class="item" v-if="emptyCatIsShown">
                        <category @remove="emptyCatIsShown = false" @approve="createCategory" empty />
                    </li>
                    <li class="item" v-for="category in categories" :key="category.id">
                        <category
                            :title="category.category"
                            :skills="category.skills"
                            @create-skill="createSkill($event, category.id)"
                            @edit-skill="editSkill"
                            @remove-skill="removeSkill"
                            @remove="removeCategory(category.id)"
                            @approve="approveEditCategory($event, category)"
                        />
                    </li>
                </ul>
            </section>
            <section class="admin__container" v-else>
                Loading...
            </section>
        </main>
    </div>
</template>

<script>
import iconedBtn from "../../components/button/types/iconedBtn/iconedBtn";
import category from "../../components/category/category";
import { mapActions, mapState } from "vuex";

export default {
    name: "About",
    components: {
        iconedBtn,
        category,
    },
    data() {
        return {
            emptyCatIsShown: false,
            tempEdditedValue: ",",
        };
    },
    computed: {
        ...mapState("categories", {
            categories: state => state.data,
        }),
    },
    methods: {
        ...mapActions({
            createCategoryAction: "categories/create",
            fetchCategoriesAction: "categories/fetch",
            removeCategoryAction: "categories/remove",
            editCategoryAction: "categories/edit",
            addSkillAction: "skills/add",
            removeSkillAction: "skills/remove",
            editSkillAction: "skills/edit",
        }),
        async createCategory(categoryTitle) {
            try {
                await this.createCategoryAction(categoryTitle);
                this.emptyCatIsShown = false;
            } catch (error) {
                console.log(error.message);
            }
        },
        removeCategory(categoryID) {
            this.removeCategoryAction(categoryID);
        },
        approveEditCategory(event, category) {
            category = { ...category, category: event };
            this.tempEdditedValue = event;
            this.editCategoryAction(category);
        },
        async createSkill(skill, categoryId) {
            const newSkill = {
                ...skill,
                category: categoryId,
            };
            await this.addSkillAction(newSkill);
            (skill.title = ""), (skill.percent = "");
        },
        removeSkill(skill) {
            this.removeSkillAction(skill);
        },
        async editSkill(skill) {
            await this.editSkillAction(skill);
            skill.editmode = false;
        },
    },
    created() {
        this.fetchCategoriesAction();
    },
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>
