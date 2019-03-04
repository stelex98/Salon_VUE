<template>
  <v-app>
    <AppHeader class="appHeaderServices"></AppHeader>
    <mainContentPrices></mainContentPrices>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import mainContentPrices from "@/components/mainContent/mainContentPrices.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    mainContentPrices
  }
};
</script>

<style scoped>
.appHeaderServices .container {
  max-height: 225px;
  background-image: url(https://pp.userapi.com/c846220/v846220368/1b16b8/oKVkgVio79c.jpg) !important;
  background-position: center 80%;
}
</style>