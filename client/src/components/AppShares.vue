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
                        hover 
                    >
                        <v-card-title primary-title>
                            <div>
                                <div class = "headline">{{item.service}}</div>
                                <br>
                                <span>{{item.about_service}}</span>
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

    .cardShares {
        border                    : solid 2px #f8eef3;
        border-radius             : 40px;
        border-bottom-left-radius : 0;
        margin                    : 15px 0 20px 0;
        padding                   : 15px;
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