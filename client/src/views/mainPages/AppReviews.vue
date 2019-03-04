<template>
  <v-app>
    <AppHeader class="appHeaderServices"></AppHeader>
    <mainContentReviews></mainContentReviews>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import mainContentReviews from "@/components/mainContent/mainContentReviews.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    mainContentReviews
  }
};
</script>

<style scoped>
.appHeaderServices .container {
  max-height: 225px;
  background-image: url(https://pp.userapi.com/c852224/v852224481/c34d0/5_W6kqs_8so.jpg) !important;
  background-position: center 80%;
}
</style>