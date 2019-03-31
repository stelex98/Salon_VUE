<template>
    <div>
        <v-dialog 
            v-model   = "dialog" 
            max-width = "600px"
        >
            <v-btn 
                slot   = "activator" 
                color  = "lighten-2" 
                @click = "editStock"
                flat 
                icon
                >
                <v-icon 
                    color = "yellow darken-2"
                >
                    edit
                </v-icon>
            </v-btn>
            <v-card>
                <v-card-title>
                    <span 
                        class = "headline"
                    >
                        Редактирование акции
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :label     = "currentService"
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
                                    :label     = "currentTypeService"
                                    v-model    = "idTypeOfService"
                                    :items     = "allTypeOfServices"
                                    item-value = "id" 
                                    item-text  = "service"
                                    @input     = 'updateTitle'
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
import { mapActions, mapState } from "vuex";
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
            allDiscountForUsers : {},

            /*Data for create new stock */
            idService       : 0,
            idTypeOfService : 0,
            date            : new Date().toISOString().substr(0, 10),
            discount        : '',
            show            : 'flase',

            currentService: '',
            currentTypeService: '',
            currentId: '',
            currentDiscount : '',
            currentIdItems: '', 

            /*Data for all v-select */
            allServices: [],
            allTypeOfServices: [],

            newStockObg : {
                date        : new Date().toISOString().substr(0, 10),
                discount    : '',
                service     : '',
                show        : 'flase',
                typeService : '',
            }
        };
    },
    components: {
        fileUploadButton
    },
    computed: {
        ...mapState('stock', {
            arrayOfStock     : 'currentStockForAdmin',
            currentIdForEdit : 'currentIdForEdit'
        })
    },
    methods: {
        ...mapActions('stock', ['addNewStock', 'addNewCurrentStockAdmin', 'deleteCurrentStock']),
        async editStock(){
            let currentDiscount = await requsetDiscount.readOne(this.currentIdForEdit);
            console.log(currentDiscount.data)
            this.currentService     = currentDiscount.data.group;
            this.currentTypeService = currentDiscount.data.service;
            this.idTypeOfService    = currentDiscount.data.id_service;
            this.discount           = currentDiscount.data.discount;
            this.date               = currentDiscount.data.date.substr(0, 10);

            let res = await request.readServiceByType(currentDiscount.data.id_group);

            this.allTypeOfServices = res.data;
        },
        async saveNewInf() {
            let reqObjStock = {
                id_service      : this.idTypeOfService,
                discount        : this.discount,
                date            : this.date
            };

            console.log('Client:', this.currentIdForEdit, reqObjStock);
            let a = await requsetDiscount.update(this.currentIdForEdit, reqObjStock);

            this.dialog = false;

            //this.addNewStock(a.data);

            this.getAllStock();
            this.resetData();
        },
        async checkIdService(){
            let res = await request.readServiceByType(this.idService);
            this.allTypeOfServices = res.data;
            this.currentService = 'Тип услуги';
            this.currentTypeService = 'Услуга';
        },
        updateTitle(){
             this.currentTypeService = 'Услуга';
             console.log(this.idTypeOfService)
        },
        async getAllStock(){
            let allDiscount = await requsetDiscount.readDiscountForDiscountPage();
            let difference  = 0;
        
            let newAllDiscount = allDiscount.data.map((item, i) => {
                item.show      = false;
                difference     = (item.price * item.discount) / 100;
                item.new_price = item.price - difference;

                return allDiscount.data[i]
            });

            this.allDiscountForUsers = allDiscount.data;
            this.addNewCurrentStockAdmin(this.allDiscountForUsers);
        },

        resetData() {
            this.newStockObg.price       = "";
            this.newStockObg.service     = "";
            this.newStockObg.title       = "";
            this.newStockObg.typeService = "";
            this.newStockObg.describe    = "";
        }
    }
};
</script>

<style scoped>
    .container {
        background-image: none;
    }
</style>