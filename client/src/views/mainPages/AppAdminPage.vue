<template>
  <v-app>
    <v-container ma-0 pa-0 fluid>
      <v-layout style = "height: 100%">
        <v-flex d-flex md3>
          <menuAdmin></menuAdmin>
        </v-flex>
        <v-flex 
          style = "margin-top: 50px; margin-left: 30px; padding: 30px; min-width: 70% "
          d-flex 
          md6 
          xs5
        >
            <listStockForCRUD v-if = "checkIsDiscount"></listStockForCRUD>
            <dataTableMasters v-if = 'checkIsTableMasters'></dataTableMasters>
            <formAddNewMaster v-if = 'checkIsAddMasters'></formAddNewMaster>
            <formAddNewService></formAddNewService>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import menuAdmin from "@/components/adminConfiguration/menuAdmin.vue";
import listStockForCRUD from "@/components/adminConfiguration/listStockForCRUD.vue";
import dataTableMasters from '@/components/forms/formTableAllMastersForAdmin.vue'
import formAddNewMaster from '@/components/forms/formAddNewMaster.vue'
import formAddNewService from '@/components/forms/formAddNewService.vue'
import {mapState, mapGetters} from 'vuex'

export default {
  components: {
    menuAdmin,
    listStockForCRUD,
    dataTableMasters,
    formAddNewMaster,
    formAddNewService
  },
  computed: {
    ...mapState('user', ['currentAction']),
    checkIsDiscount(){
      this.isDiscount = (this.currentAction  === 'Акции' ? true: false);

      return this.isDiscount;
    },
    checkIsTableMasters(){
      this.isTableMasters = (this.currentAction  === 'Просмотр' ? true: false);

      return this.isTableMasters;
    },
    checkIsAddMasters(){
      this.isAddMasters = (this.currentAction  === 'Добавить мастера' ? true: false);

      return this.isAddMasters;
    }
  },
  data() {
    
    return {
      check          : true,
      check2         : false,
      isDiscount     : this.currentAction,
      isServices     : this.currentAction,
      isTableMasters : this.currentAction,
      isAddMasters   : this.currentAction
    }
  }
};
</script>

<style scoped>
.container {
  background-image: none;
}
</style>