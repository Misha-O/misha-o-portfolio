import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

new Vue({
    el: "#reviews-component",
    template: "#reviews-container",
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            reviews: [],
            swiperOptions: {
                slidesPerView: 2,
                breakpoints: {
                    // when window width is >= 480px
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                },
            },
        };
    },
    methods: {
        slide(direction) {
            const swiper = this.$refs.swiper.$swiper;
            switch (direction) {
                case "next":
                    swiper.slideNext();
                    break;
                case "prev":
                    swiper.slidePrev();
                    break;
                default:
                    break;
            }
        },
        // requireImagesToArray(data) {
        //     return data.map(item => {
        //         const requiredImage = require(`../images/content/${item.pic}`).default;
        //         item.pic = requiredImage;
        //         return item;
        //     });
        // },
    },
    async created() {
        const { data } = await axios.get("/reviews/445");
        // this.reviews = this.requireImagesToArray(data);
        this.reviews = data;
    },
});
