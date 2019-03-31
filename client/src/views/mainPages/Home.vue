// Default page (main)
<template>
    <v-app>
        <AppHeader class = "appHeader"></AppHeader>
        <AppHomeServices class = "appHomeServices"></AppHomeServices>
        <AppReviewsSlider></AppReviewsSlider>
        <AppShares></AppShares>
        <AppFooter></AppFooter>
    </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppHomeServices from "@/components/AppHomeServices.vue";
import AppReviewsSlider from "@/components/AppReviewsSlider.vue";
import AppShares from "@/components/AppShares";
import { mapActions } from "vuex";

export default {
    components: {
        AppHeader,
        AppFooter,
        AppHomeServices,
        AppReviewsSlider,
        AppShares
    },

    created() {
        let arrayLocalStorage = Object.values(localStorage);

        /*add to storage status user from localStorage*/
        arrayLocalStorage.forEach((item, i) => {
            localStorage.key(i) === 'userIsAuth:' ? this.addUser(localStorage.getItem(localStorage.key(i)))
                                                  : ''
        });
    },
    methods: {
     ...mapActions('user', ['addUser'])
    },
};
</script>

<style>
    .appHeader .container {
        height : 100vh;
    }
    .appHomeServices .container{
        background-color : #fff;
        background-image : none;
    }

    .appHomeServices .container .flex{
        margin-top    : 20px;
        margin-bottom : 20px;
    }
</style>

