<template>
    <div>
        <v-container 
            ma-0 
            pa-0 
            fluid 
            grid-list-md
        >
            <v-layout 
                row 
                justify-space-between
            >
                <v-flex 
                    xs12 
                    md12
                    sm8 
                    offset-sm1
                >
                    <v-card 
                    >
                        <v-toolbar 
                            color = "pink" 
                            dark
                        >
                            <v-toolbar-title>Все акции</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <span>Добавить акцию</span>
                            <formAddNewStock></formAddNewStock>
                        </v-toolbar>

                        <v-list three-line style = "padding: 10px">
                            <template v-for = "(item, index) in arrayOfStock" >
                                <v-list-tile 
                                    class = "container-stock"
                                    :key  = "`${item}-${item.id}`"
                                    avatar 
                                    ripple
                                >
                                    <v-list-tile-avatar style = "margin-top: 0px;" >
                                        <img 
                                            :src  = "item.picture"
                                            style = "width: 60px; height: 60px;"    
                                        >
                                    </v-list-tile-avatar>
                                    <v-flex 
                                        @mouseover= "clickEdit(item.id)"
                                        d-flex 
                                        md10 
                                        sm8 
                                        xs6
                                    >
                                        <v-list-tile-content style = " height: 110px">
                                            <v-list-tile-title>
                                                Акция {{ item.discount }}%
                                                <span style = "color: red; text-decoration:line-through; margin-left: 10px">{{item.price}}</span>
                                                <span style = "margin-left: 5px;">{{item.new_price}}р</span>
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title class = "text--primary">На {{ item.service }}</v-list-tile-sub-title>

                                            <v-list-tile-sub-title >
                                                {{
                                                    item.about_service.length >= 50 ? item.about_service.slice(0, 50) + '...'
                                                                                    : item.about_service
                                                }}</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                    <v-list-tile-action
                                        style = "margin-left: auto"
                                    >
                                        <v-list-tile-action-text>{{ item.date.slice(0, 10) }}</v-list-tile-action-text>

                                        <v-layout 
                                            style = " align-items: center; margin-left: auto;"
                                            align-end 
                                            row 
                                            justify-space-around
                                        >
                                            <v-flex
                                                style = "margin-right: 5px"
                                                @mouseover = "clickEdit(item.id)" 
                                                d-flex
                                            >  
                                                <formEditForStock ></formEditForStock>
                                            </v-flex>
                                            <v-flex d-flex>
                                                <v-btn
                                                    color  = "lighten-2" 
                                                    @click = "deleteCurrentStockLocal(index, item.id, item)" 
                                                    flat 
                                                    icon 
                                                >
                                                    <v-icon color = "yellow darken-2">delete</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider 
                                    v-if = "index + 1 < arrayOfStock.length" 
                                    :key = "index"
                                ></v-divider>
                            </template>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import formEditForStock from "@/components/forms/formEditForStock.vue";
import formAddNewStock from "@/components/forms/formAddNewStock.vue";
import { mapState, mapActions } from "vuex";
import request from '../../../request/discount'

export default {
    components: {
        formEditForStock,
        formAddNewStock
    },

    async created() {
        let allDiscount = await request.readDiscountForDiscountPage();
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
    data() {
        return {
            allDiscountForUsers : {},
            new_price           : 0
        };
    },
    computed: {
        ...mapState("stock", {
            arrayOfStock: "currentStockForAdmin"
        }),
        ...mapState('stock', ['allStock']),
    },
    methods: {
        ...mapActions("stock", ["deleteCurrentStock", "addNewCurrentStockAdmin", 'addCurrentStockForEdit']),

        async deleteCurrentStockLocal(index, id, item) {
            let deleteDisc = await request.delete(id);

            this.deleteCurrentStock(index);
        },
        addIndexCurrentStock(index) {
            this.addNewCurrentStockAdmin(index);
        },
        clickEdit(id_discount){
            this.addCurrentStockForEdit(id_discount)
        }
    }
};
</script>

<style scoped>
    .container {
        background-image: none;
    }
</style>