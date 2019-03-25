<template>
    <div>
        <v-dialog 
            v-model   = "dialog" 
            max-width = "600px"
        >
            <v-btn 
                slot   = "activator" 
                color  = "lighten-2" 
                @click = "resetData"
                flat 
                icon
                >
                <v-icon 
                    color = "yellow darken-2"
                >
                    add
                </v-icon>
            </v-btn>
            <v-card>
                <v-card-title>
                    <span 
                        class = "headline"
                    >
                        Добавление акции
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    label      = "Тип услуги"
                                    v-model    = "idService"
                                    :items     = "allServices"
                                    item-value = "id" 
                                    item-text  = "group"
                                    @input     = "checkIdService()"
                                >
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    label      = "Услуга"
                                    v-model    = "idTypeOfService"
                                    :items     = "allTypeOfServices"
                                    item-value = "id" 
                                    item-text  = "service"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field
                                    label   = "Скидка"
                                    hint    = "Используйте только цифровые значения"
                                    v-model = "discount"
                                    required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-menu
                                    ref                     = "menu"
                                    :close-on-content-click = "false"
                                    transition              = "scale-transition"
                                    v-model                 = "menu"
                                    :nudge-right            = "40"
                                    min-width               = "290px"
                                    :return-value.sync      = "date"
                                    lazy
                                    offset-y
                                    full-width
                                >
                                    <v-text-field
                                        slot    = "activator"
                                        v-model = "date"
                                        label   = "Выберите дату"
                                        readonly
                                    ></v-text-field>
                                    <v-date-picker 
                                        v-model = "date" 
                                        no-title 
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn  
                                            color  = "primary" 
                                            @click = "menu = false"
                                            flat
                                        >   
                                            Cancel
                                        </v-btn>
                                        <v-btn  
                                            color  = "primary" 
                                            @click = "$refs.menu.save(date)"
                                            flat
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    color  = "blue darken-1"  
                    @click = "dialog = false"
                    flat
                >
                    Закрыть
                </v-btn>
                <v-btn 
                    color  = "blue darken-1"  
                    @click = "saveNewInf(newStockObg)"
                    flat
                >
                    Сохранить
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import fileUploadButton from "@/components/forms/fileUploadButton.vue";
import { mapActions } from "vuex";
import request from '../../../request/service'
import requsetDiscount from '../../../request/discount'

export default {
    async created() {
        let res  = await request.readServiceType();
        
        this.allServices = res.data;
    },
    data() {
        return {
            dialog    : false,
            menu      : false,

            /*Data for create new stock */
            idService       : 0,
            idTypeOfService : 0,
            date            :new Date().toISOString().substr(0, 10),
            discount        : "",
            show            : "flase",

            /*Data for all v-select */
            allServices: [],
            allTypeOfServices: [],

            newStockObg : {
                date        : new Date().toISOString().substr(0, 10),
                discount    : "",
                service     : "",
                show        : "flase",
                typeService : "",
            }
        };
    },
    components: {
        fileUploadButton
    },
    methods: {
        ...mapActions("stock", ["addNewStock"]),

        async saveNewInf() {
            let reqObjStock = {
                // idService       : this.idService,
                id_service      : this.idTypeOfService,
                discount        : this.discount,
                date            : this.date
            };

            let a = await requsetDiscount.add(reqObjStock);

            this.dialog = false;

            console.log(reqObjStock, a);
            
            //this.addNewStock(this.reqObjStock);
        },
        async checkIdService(){
            let res = await request.readServiceByType(this.idService);

            this.allTypeOfServices = res.data;
        },
        resetData() {
            this.newStockObg.price = "";
            this.newStockObg.service = "";
            this.newStockObg.title = "";
            this.newStockObg.typeService = "";
            this.newStockObg.describe = "";
        }
    }
};
</script>

<style scoped>
    .container {
        background-image: none;
    }
</style>