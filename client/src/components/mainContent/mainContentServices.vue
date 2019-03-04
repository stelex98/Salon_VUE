<template>
    <div>
        <v-container 
            fluid 
            ma-0 
            pa-0 
            grid-list-xl
        >
            <v-layout 
                row 
                wrap 
                justify-space-around
            >
                <v-flex 
                    class = "listServices"
                    style = "height: 67vh"
                    d-flex 
                    md3
                    sm7 
                    xs10  
                >
                    <v-layout 
                        class = "select-services"
                        column 
                    >
                        <h1>Услуги нашего салона</h1>
                        <v-flex 
                            v-for = "(item, i) in allService" 
                            :key  = "`services${i}`"
                        >
                            <v-select
                                :items  = "item.itemServices"
                                :id     = "`${i}`"
                                :label  = "item.globalName"
                                @change = "returnDescribe($event)"
                                v-model = "selected"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex 
                    d-flex 
                    md7 
                    sm12 
                    xs12
                >
                    <v-layout 
                        row 
                        justify-center 
                    >
                        <v-flex 
                            md7 
                            sm5 
                            xs8 
                            d-flex 
                            align-center
                        >
                            <v-card style = "margin-top: 10%; margin-bottom: 10%;">
                                <v-img
                                    class  = "white--text"
                                    height = "200px"
                                    :src   = "describe[0].img"
                                >
                                    <v-container 
                                        fill-height 
                                        fluid
                                    >
                                        <v-layout fill-height>
                                            <v-flex 
                                                xs12 
                                                align-end 
                                                flexbox
                                            >
                                                <span class = "headline">{{describe[0].title}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-img>
                                <v-card-title primary-title>
                                    <div>
                                        <span 
                                            class = "grey--text"
                                            v-if  = "describe[0].price.length !== 0"
                                        >
                                            Описание выбранной услуги</span>
                                        <br>
                                        <div>
                                            {{describe[0].describe}}
                                        </div>
                                        <br>
                                        <span 
                                            style = "font-weight: bold" 
                                            v-if  = "describe[0].price.length !== 0"
                                        >
                                            Цена: {{describe[0].price}}
                                        </span>
                                    </div>
                                </v-card-title>
                            </v-card>    
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapState } from "vuex";
import request from "../../../request/service"
import _ from 'lodash';


export default {
  data() {
    return {
      selected   : null,
      describe   : [
        {
          title    : '',
          describe : 'Современная женщина уделяет большое внимание своему внешнему виду: стрижка, модная прическа и укладка, натуральный маникюр или наращенные ногти - все это входит в арсенал прекрасного пола. Уход за телом, волосами, ногтями невозможен в домашних условиях, и нужно регулярно посещать салон красоты.',
          price    : '',
          img      : 'http://ix2hgw153.topstyle.me/uploads/s/b/w/i/bwitq7rl8ntj/img/full_vjH7QLsH.jpg'
        }
      ],
      allService : ''
    };
  },
    async created() {

        let services        = await request.readByGroup();
        let groupedServices = Object.values(_.groupBy(services.data, 'id_group'));
        let arrObj          = [];

        groupedServices.forEach( (item, i) => {
            groupedServices[i].push(this.globalNameServices[i])
        });

        groupedServices.forEach((item, i) => {
            let obj = {
                globalName   : '',
                itemServices : [],
                id_group     : ''
            };
            obj.globalName = item[item.length - 1];

            item.forEach( (item_2, i, array) => {
                typeof(item_2) === 'object' ? obj.itemServices.push(item_2.service) : '';
                typeof(item_2) === 'object' ? obj.id_group = item_2.id_group : '';
            });

            arrObj.push(obj);
        })
 
        this.allService = arrObj;
    },
  computed: {
    ...mapState("homeServices",{
      dataServices       : "servicesContent",
      describeServices   : "describeForItemServices",
      globalNameServices : "globalNameServices"
    }),
    
    servicesContent() {
      return this.dataServices;
    }
  },
  mounted(event) {
    this.selected = this.dataServices;
  },
  methods: {
    async returnDescribe(currentService) {
        let serviceDescribe = await request.readOne(currentService);
        
        this.describe[0].describe = serviceDescribe.data[0].about_service;
        this.describe[0].price    = serviceDescribe.data[0].price;
        this.describe[0].title    = serviceDescribe.data[0].service;
        this.describe[0].img      = serviceDescribe.data[0].picture;
    }
  }
};
</script>

<style scoped>
.container {
  background-image: none;
}

.listServices {
  margin: 10px 20px 90px 70px;
}

h1 {
  font-family: "Cormorant", serif;
  font-size: 2em;
  margin: 0 0px 0px 10px;
}
</style>