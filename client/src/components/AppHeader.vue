// Component Header
<template>
  <div>
    <v-navigation-drawer 
        class="hidden-md-and-up"
        absolute 
        temporary 
        v-model="drawer" 
    >
      <v-list>
        <v-list-tile 
            v-for="(item, i) in menuItems" 
            :key="`navDrawer${i}`" 
            :to="item.route"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-container 
        fluid 
        ma-0 
        pa-0
    >
      <v-layout 
          row 
          align-center 
          justify-center 
          wrap
      >
        <v-flex 
            
            md4 
            sm4
        >
            <p
                class="list-adress-phone text-md-left white--text hidden-xs-only"
                v-for="(item, i) in listAdressPhone"
                :key="`indexPhoneAdress${i}`"
            >
            <v-icon>place</v-icon>
            {{item.street}}
            <br>
            <v-icon>smartphone</v-icon>
            {{item.phone}}
            </p>
        </v-flex>
        <v-flex 
          md4 
          sm4 
          xs6 
          class="text-md-center"
        >
            <router-link to="/">
                <img
                    src="https://visavis.by/sites/default/files/logo3x.png"
                    style="width: 220px; height: 120px;"
                >
          </router-link>
        </v-flex>
        <v-flex 
            class="text-md-center"
            md4 
            sm4 
            xs6 
            align-center  
            wrap
        >
            <v-layout 
                row 
                wrap
            >
            <formReg></formReg>
            <formAuth></formAuth>
          </v-layout>
        </v-flex>
      </v-layout>

    <v-layout>
        <v-toolbar class="transparent">
            <v-toolbar-side-icon 
                class="white hidden-md-and-up"
                @click.stop="drawer=!drawer" 
            ></v-toolbar-side-icon>
            <v-toolbar-items class="toolbar-items hidden-sm-and-down text-md-center">
                <v-btn
                    class="white--text"
                    flat
                    v-for="(item, i) in menuItems"
                    :key="`menuItems${i}`"
                    :to="item.route"
                >
                {{item.title}}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import formReg      from "@/components/forms/formRegistration";
import formAuth     from "@/components/forms/formAuthorization";
import { mapState } from "vuex";
import apiService   from "../../request/service"
import apiReview    from "../../request/review"
import apiAuthe     from "../../request/authentication"

export default {
  components: {
    formReg,
    formAuth
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    ...mapState("header",{
      menuItems       : 'dataMenuItems',
      listAdressPhone : 'dataListAdressPhone'
    }),
  }
};
</script>

<style>
.container {
  background-image: url(https://visavis.by/sites/all/themes/visavis2/images/top1.jpg);
  background-size: cover;
  background-position: center;
  max-width: 1300px;
}
.toolbar-items {
  margin-left: 31%;
}
p {
  margin: 0 0 0 20%;
}

div .list-adress-phone:nth-child(1){
    margin-top: 15px;
}

.list-adress-phone .theme--light.v-icon {
    color: #FFFFFF !important;
    font-size: 16px;
}
</style>