<template>
    <div>
        <v-container 
            ma-0 
            pa-0 
            fluid 
            grid-list-md
        >
            <v-layout  
                style = "margin: 1% 0 0 5%" 
                class = "text-md-left"
                row
            >
                <v-flex 
                    md2 
                    d-flex
                >
                    <h1>Акции</h1>
                </v-flex>
            </v-layout>
            <v-divider style = "margin: 0 0 5% 5%; width: 80%"></v-divider>
            <v-layout 
                class = "Mylayout"
                style = "margin: 0px 10px 0px 10px" 
                row 
                wrap 
                justify-space-between 
            >
                <v-flex
                    v-for = "(item, i) in returnDataOfStock"
                    :key  = "`stock${i}`"
                    style = "margin: 0 0 5% 0;"
                    xs10
                    sm6
                    md4
                    d-flex
                >
                    <v-card 
                        hover 
                        @mouseover = "currentStock(i)"
                    >
                    <v-img 
                        :src   = "item.picture" 
                        height = "200px"
                    ></v-img>

                    <v-card-title primary-title>
                        <div>
                            <div class = "headline">
                                <v-layout row>
                                    <v-flex xs6>Скидка {{item.discount}}% на {{item.service}}</v-flex>
                                    <v-flex 
                                        class = "headline__price" 
                                        text-xs-left
                                    > Цена:
                                        <span class = "price__old-price">{{item.price}}</span>
                                        <span 
                                            class = "price__new-price" 
                                            text-xs-left
                                        >
                                            &nbsp;{{item.new_price}} руб
                                        </span>
                                    </v-flex>
                                </v-layout>
                            </div>
                            <span class = "grey--text">Воспользоваться можно до {{item.date.slice(0, 10)}}</span>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <formSignUpService></formSignUpService>
                        <v-flex 
                            style = "color: red; font-size: 0.8rem"
                            v-if  = "returnDataCheckAuthorization"
                            ml-3 
                        >
                            Для записи на услугу пожалуйста авторизируйтесь
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-btn 
                            @click    = "item.show = !item.show"
                            :disabled = "returnDataCheckAuthorization"
                            icon 
                        >
                            <v-icon>{{ item.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-slide-y-transition>
                        <v-card-text v-show = "item.show">{{item.about_service}}</v-card-text>
                    </v-slide-y-transition>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import formSignUpService from "@/components/forms/formSignUpService.vue";
import request from '../../../request/discount'

export default {
    data(){
        return {
            new_price : 0
        }
    },
    components: {
        formSignUpService
    },
    async created() {
        let allDiscount = await request.readDiscountForDiscountPage();
        let difference = 0;

        let newAllDiscount = allDiscount.data.map((item, i) => {
            item.show      = false;
            difference     = (item.price * item.discount) / 100;
            item.new_price = item.price - difference;

            return allDiscount.data[i]
        });

        this.addNewStock(allDiscount.data);
    },
    methods: {
        ...mapActions('stock', ['addNewCurrentStock', 'addNewStock']),

        currentStock(index){
            this.addNewCurrentStock(index);
        }
    },
    computed: {
        ...mapState('user', ['user']),

        ...mapState('stock', ['allStock']),

        ...mapGetters('stock', ['returnAllDataOfStock']),

        returnDataCheckAuthorization() {
			return this.user === 'true' ? false 
										: true
        },
        returnDataOfStock(){
            return this.returnAllDataOfStock[0]
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

    .headline__price {
        font-size: 0.8em
    }

    .price__old-price {
        font-size       : 0.8em;
        text-decoration : line-through;
    }

    .price__new-price{
        font-size : 0.8em;
        color     : red;
    }

    h1 {
        font-family : "Cormorant", serif;
        font-size   : 3em;
    }
</style>