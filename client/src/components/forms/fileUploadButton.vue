<template>
  <div>
    <v-container 
        fluid 
        pa-0 
        ma-0
    >
      <v-layout row>
        <v-flex 
            class = "text-xs-center text-sm-center text-md-center text-lg-center"
            xs12
            md12>
          <v-text-field
            label           = "Select Image"
            hint            = "Загружайте изображения формата .png или .jpeg"
            @click          = "pickFile"
            v-model         = "imageName"
            :error-messages = "imageErrors"  
            @blur           = "$v.imageUrl.$touch();"          
          ></v-text-field>
          <input
            type    = "file"
            style   = "display: none"
            ref     = "image"
            accept  = "image/*"
            @change = "onFilePicked"
          >
        </v-flex>
        <v-flex 
            d-flex 
            md1 
            align-center
        >
          <img 
            :src   = "imageUrl" 
            height = "30" 
            v-if   = "imageUrl">
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            title     : "Image Upload",
            dialog    : false,
            imageName : "",
            imageUrl  : "",
            imageFile : ""
        };
    },
    computed: {
        imageErrors() {
            const errors = [];

            if (!this.$v.imageUrl.$dirty) return errors;
            if (!this.$v.imageUrl.required) {
                this.clearCurrentDataImg();
                errors.push('Это обязательное поле.');
            }

            return errors;
        },
    },
    validations: {
        imageUrl: {
            required
        }
    },
    methods: {
        ...mapActions('registrationData', [
            'addCurrentDataImg',
            'clearCurrentDataImg'
        ]),
        pickFile() {
            this.$refs.image.click();
        },

        onFilePicked(e) {
            const files = e.target.files;

            if (files[0] !== undefined) {
                this.imageName = files[0].name;

                if (this.imageName.lastIndexOf(".") <= 0) {
                    return;
                }
                const fr = new FileReader();

                fr.readAsDataURL(files[0]);

                fr.addEventListener("load", () => {
                    this.imageUrl  = fr.result;
                    this.imageFile = files[0];

                    this.addCurrentDataImg(this.imageUrl);
                });
            } else {
                this.imageName = "";
                this.imageFile = "";
                this.imageUrl  = "";
            }
        }
    }
};
</script>

<style scoped>
    .container {
        background-image: none;
    }
</style>