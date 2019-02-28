<template>
  <div>
    <v-container ma-0 pa-0 fluid grid-list-md>
      <v-layout row style="margin: 1% 0 0 5%" class="text-md-left">
        <v-flex md2 d-flex>
          <h1>Акции</h1>
        </v-flex>
      </v-layout>
      <v-divider style="margin: 0 0 5% 5%; width: 80%"></v-divider>
      <v-layout row wrap justify-space-between style="margin: 0px 10px 0px 10px" class="Mylayout">
        <v-flex
          xs10
          sm6
          md4
          d-flex
          v-for="(item, i) in allDiscountForUsers"
          :key="`stock${i}`"
          style="margin: 0 0 5% 0;"
        >
          <v-card hover @mouseover="currentStock(i)">
            <v-img :src="item.picture" height="200px"></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">Скидка {{item.discount}}% на {{item.service}}</div>
                <span class="grey--text">Воспользоваться можно до {{item.date.slice(0, 10)}}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <formSignUpService></formSignUpService>
              <v-spacer></v-spacer>
              <v-btn icon @click="item.show = !item.show">
                <v-icon>{{ item.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text v-show="item.show">{{item.about_service}}</v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import formSignUpService from "@/components/forms/formSignUpService.vue";
import request from '../../../request/discount'

export default {
    data(){
        return {
            allDiscountForUsers: {}
        }
    },
    components: {
        formSignUpService
    },
async created() {
    let allDiscount = await request.readDiscountForDiscountPage();

    let newAllDiscount = allDiscount.data.map((item, i) => {
        item.show = false;

        return allDiscount.data[i]
    })

    this.allDiscountForUsers = allDiscount.data;
    console.log(this.allDiscountForUsers);

},
  methods: {
    ...mapActions("stock", ["addNewCurrentStock"]),

    currentStock(index){
        this.addNewCurrentStock(index);
    }
  },
  computed: {
      ...mapState("stock",{
      dataOfStock: "stock"
    }),
  },
  watch: {
    a(){
      console.log('11111');
    }
  }
};
</script>

<style scoped>
.container {
  background-image: none;
}
.Mylayout {
  align-items: flex-start;
}
h1 {
  font-family: "Cormorant", serif;
  font-size: 3em;
}
</style>