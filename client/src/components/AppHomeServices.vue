<template>
    <div>
        <v-container 
            fluid
        >
            <v-layout
                class="myLayout" 
                row 
                wrap 
            >
                <v-flex 
                    v-for="(item, i) in mainServices" 
                    :key="`mainServices${i}`"
                    justify-start 
                >
                    <v-card 
                        height ="450px" 
                        width  ="240px"
                        @click ="resetScroll"
                        to="/services"
                        hover 
                    >
                        <v-img 
                            height="200px" 
                            :src="item.src" 
                            aspect-ratio="2.75"
                        ></v-img>
                            <v-card-title 
                                primary-title
                            >
                                <div>
                                    <h3 
                                        class="headline"
                                    >
                                        {{item.title}}
                                    </h3>
                                    <span
                                        class="grey--text"
                                        v-for="(item, i) in mainServices[i].servicesArr"
                                        :key="`asd${i}`"
                                    >
                                    <br>
                                    &mdash; {{item}}
                                    </span>
                                </div>
                            </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("homeServices", {
      mainServices: "dataHomeServices"
    })
  },
  methods: {
    resetScroll(){
        setTimeout(function(){
            window.scrollTo(0, 0);
        }, 1);
      }
  }
};
</script>

<style>
.containerServices {
  margin: 20px;
}
.myLayout {
  padding-left: 5%;
}
</style>