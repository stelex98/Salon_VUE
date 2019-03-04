<template>
    <div>
        <v-container
            fluid 
            ma-0 
            pa-0
        >
            <v-layout 
                row 
                wrap 
                align-center
            >
                <h1>Акции</h1>
            </v-layout>
            <v-layout 
                class = "myLayout" 
                row 
                wrap 
                align-center 
                justify-space-around
            >
                <v-flex 
                    class = "stock-items"
                    v-for = "(item, i) in dataShares" 
                    :key  = "`sharedId${i}`"
                    md3 
                    xs7 
                    d-flex 
                >
                    <v-card 
                        class      = "cardShares text--black" 
                        color      = "white" 
                        v-on:click = "a(i)"
                        to =  "/stock"
                        hover 
                    >
                        <v-card-title primary-title>
                            <div>
                                <div class = "headline">{{item.service}}</div>
                                <br>
                                <div class = "tardShares__mainText"> {{item.about_service}} </div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn>Читать дальше</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import request from '../../request/discount'

export default {
    data() {
        return {
           dataShares: {} 
        }
    },
    async created() {
        let data = await request.readDiscountForMainPage();

        this.dataShares = data.data.slice(-3);
    }
};
</script>

<style scoped>
    .container {
        background-image: none;
    }

    .stock-items {
        display: flex;
        align-self: stretch;
    }

    .cardShares {
        border                    : solid 2px #f8eef3;
        border-radius             : 40px;
        border-bottom-left-radius : 0;
        margin                    : 15px 0 20px 0;
        padding                   : 15px;
    }

    .tardShares__mainText{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 16px;     /* fallback */
        max-height: 45px;      /* fallback */
        -webkit-line-clamp: 3; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    h1 {
        font-family : "Cormorant", serif;
        font-size   : 3em;
        margin      : 20px 0px 20px 60px;
    }

    .myLayout {
        margin-bottom: 80px;
    }
</style>