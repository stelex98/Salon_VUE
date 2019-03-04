<template>
  <v-app>
    <AppHeader class="appHeaderServices"></AppHeader>
    <mainContentStock></mainContentStock>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import mainContentStock from "@/components/mainContent/mainContentStock.vue";

export default {
  components: {
    AppHeader,
    mainContentStock,
    AppFooter
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