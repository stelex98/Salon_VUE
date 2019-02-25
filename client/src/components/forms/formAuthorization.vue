<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn 
        slot  = "activator" 
        class = "transparent white--text" 
        dark
      >Авторизоваться</v-btn>
      <form @submit.prevent = "submit">
        <v-card>
            <v-card-title>
                <span class="headline">Вход</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field  
                                label           = "Имя*" 
                                hint            = "Введите ваш логин при регистрации" 
                                v-model         = "login"
                                :error-messages = "loginError"
                                @input          = "$v.login.$touch()"
                                @blur           = "$v.login.$touch()"
                            ></v-text-field>
                        </v-flex>
                    <v-flex xs12>
                        <v-text-field
                        label           = "Password*"
                        hint            = "Введите ваш пароль при регистрации"
                        type            = "password"
                        v-model         =  "password"
                        :error-messages = "passwordError"
                        @input          = "$v.password.$touch()"
                        @blur           = "$v.password.$touch()"
                        ></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    color  = "blue darken-1"  
                    @click = "closeWindow"
                    flat
                >
                    Закрыть
                </v-btn>
                <v-btn 
                    color     = "blue darken-1" 
                    type      = "submit" 
                    :disabled = "$v.$invalid"
                    flat 
                >Войти</v-btn>
            </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            dialog   : false,
            login    : '',
            password : ''
        };
    },
    computed: {
        loginError() {
            const errors = [];

            if (!this.$v.login.$dirty) return errors;

            !this.$v.login.required && errors.push('Это обязательное поле.');

            return errors;
        },
        passwordError() {
            const errors = [];

            if (!this.$v.password.$dirty) return errors;

            !this.$v.password.required  && errors.push('Это обязательное поле.');
            !this.$v.password.minLength && errors.push('Пароль не меньше 6 символов.');

            return errors;
        }
    },
    validations: {
        login: {
            required
        },
        password: {
            required,
            minLength: minLength(6)

        }
    },
    methods: {
        closeWindow() {
            this.$v.$reset();
            this.dialog   = false;
            this.password = '';
            this.login    = '';
        }
    },
};
</script>

<style scoped>
    .container {
        background-image: none;
    }
</style>