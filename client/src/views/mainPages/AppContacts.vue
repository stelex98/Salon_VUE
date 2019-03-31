<template>
    <v-app>
        <AppHeader class = "appHeaderServices"></AppHeader>
        <mainContentContacts></mainContentContacts>
        <AppFooter></AppFooter>
    </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import mainContentContacts from "@/components/mainContent/mainContentContacts.vue";
import { mapState, mapActions } from "vuex";

export default {
    components: {
        AppHeader,
        AppFooter,
        mainContentContacts
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
    }
};
</script>

<style scoped>
.appHeaderServices .container {
  max-height          : 225px;
  background-image    : url(https://pp.userapi.com/c846220/v846220368/1b16b8/oKVkgVio79c.jpg) !important;
  background-position : center 80%;
}


</style>