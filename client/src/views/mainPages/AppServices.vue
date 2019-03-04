 // Services component (page)
<template>
  <v-app>
    <AppHeader class="appHeaderServices"></AppHeader>
    <mainContentServices></mainContentServices>
    <AppReviewsSlider></AppReviewsSlider>
    <AppFooter></AppFooter> 
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppReviewsSlider from "@/components/AppReviewsSlider.vue";
import mainContentServices from "@/components/mainContent/mainContentServices.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    mainContentServices,
    AppReviewsSlider
  }
};
</script>

<style>
.appHeaderServices {
  height: 212px;
}
.appHeaderServices .container {
  max-height: 225px;
  background-image: url(https://pp.userapi.com/c852224/v852224481/c34d0/5_W6kqs_8so.jpg) !important;
  background-position: center 80%;
}
</style>