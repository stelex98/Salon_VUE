<template>
    <div>
        <v-container 
            fluid 
            pa-0 
            ma-0
        >
            <v-layout  
                style = "margin: 25px 0 0 5%;"
                row
                >
                <v-flex>
                    <h1>Отзывы наших любимых клиентов</h1>
                    <v-dialog
                    v-model    = "dialog"
                    :disabled  = "returnDataCheckAuthorization"
                    max-width  = "600px"
                    persistent
                    >
                        <v-btn
                            class     = "white black--text"
                            slot      = "activator"
                            :disabled = "returnDataCheckAuthorization"
                        >
                            Добавить отзыв
                        </v-btn>
                    <v-card>
                        <v-card-title>
                            <span class = "headline">Оставить отзыв</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex xs12>
                                    <v-textarea
                                    name    = "input-7-1"
                                    label   = "Ваш отзыв"
                                    v-model = "textReviews"
                                    box
                                    auto-grow
                                    ></v-textarea>
                                </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                                color  = "darken-1" 
                                @click = "dialog = false"
                                flat 
                            >
                                Закрыть
                            </v-btn>
                            <v-btn 
                                color  = "darken-1"  
                                @click = "addReviews"
                                flat
                            >
                                Добавить отзыв
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-flex>
            </v-layout>
            <v-layout 
                style = "margin: 5%;"
                row 
                wrap 
                justify-space-between 
            >
            <v-flex
                v-for = "(item, i) in returnDataReviewsSlider"
                :key  = "`reviews${i}`"
                md5
                sm10
                xs10
                d-flex
            >
                <v-card
                class = "black--text"
                color = "white"
                style = "padding: 20px; margin-bottom: 20px;"
                hover
                >
                <v-layout row>
                    <v-flex xs7>
                    <v-card-title primary-title>
                        <div>
                        <div class = "headline">Отзыв</div>
                        <br>
                        <div>{{item.reviewsText}}</div>
                        <br>
                        <div>{{item.namePearson}}</div>
                        </div>
                    </v-card-title>
                    </v-flex>
                    <v-flex xs5>
                    <v-img 
                        :src   = "item.src" 
                        height = "125px" 
                        contain></v-img>
                    </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                </v-card>
            </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import review from '../../../request/review';

export default {
    data() {
        return {
            dialog      : false,
            textReviews : null
        };
    },
    async created() {
        let dataRreviews = await review.read();

        let arrReviewsObj = dataRreviews.data.map((item, i) => {
            let reviewsObj = {};

            reviewsObj.reviewsText = item.review;
            reviewsObj.namePearson = item.name;
            reviewsObj.src         = item.photo;

            return reviewsObj;
        });

      this.addNewReviews(arrReviewsObj);
    },
    methods: {
        ...mapActions("reviewsSlider", ['addNewReviews']),

        addReviews() {
            this.dialog = false;
            let myReviews = {
                reviewsText: this.textReviews,
                namePearson: "Адамович Артур",
                src: "https://visavis.by/sites/all/themes/visavis2/images/forms.jpg"
            };
            this.addNewReviews(myReviews);
            this.textReviews = null;
        }
    },
    computed: {
        ...mapState("reviewsSlider", {
            arrayRivews       : "dataReviewsSlider",
            checkAthorization : "checkAuth"
        }),
        returnDataReviewsSlider() {
            return this.arrayRivews;
        },
        returnDataCheckAuthorization() {
            return this.checkAthorization;
        }
    }
};
</script>

<style scoped>
    .container {
        background-image: none;
    }
    h1 {
        font-family: "Cormorant", serif;
        font-size: 3em;
    }
</style>