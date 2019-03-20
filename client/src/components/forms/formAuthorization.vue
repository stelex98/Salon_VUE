<template>
  <div>
    <v-dialog 
        v-model   = "dialog"  
        max-width = "600px"
        persistent
    >
      <v-btn 
        slot  = "activator" 
        class = "transparent black--text" 
        dark
      >Авторизация</v-btn>
        <v-card>
            <v-card-title>
                <span class = "headline">Вход</span>
            </v-card-title>
            <v-card-text>
                <v-alert
                        :value     = "showAlert"
                        type       = "error"
                        transition = "scale-transition"
                    >
                        Неправильные логин или пароль.
                    </v-alert>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field  
                                label           = "Логин*" 
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
                    @click    = "logIn"
                    flat 
                >Войти</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import request from '../../../request/authentication'
import CryptoJS from "crypto-js"
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            dialog    : false,
            login     : '',
            password  : '',
            showAlert : false
        };
    },
    computed: {
        ...mapState('user', ['user']),
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
        ...mapActions('user', ['addUser']),
        closeWindow() {
            this.$v.$reset();
            this.dialog   = false;
            this.password = '';
            this.login    = '';
        },
        async logIn(){
            let objUser = {
                log  : '',
                pass : '',
                salt : ''
            };
            let checkUser         = {};
            let salt              = CryptoJS.lib.WordArray.random(128/8);
            let hash              = CryptoJS.PBKDF2(this.password, salt, { keySize: 128/32 });
            let arrayLocalStorage = {};

            objUser.log  = this.login;
            objUser.pass = hash.toString();
            objUser.salt = salt;

            /* check auth user*/
            checkUser = await request.authorization(objUser);

            console.log(checkUser);
            /*show alert if user is't auth (error login/pass) */
            checkUser.data.length === 0 ? this.showAlert = true
                                        : this.showAlert = false;

            /*add to localStorage status about user. true - user is auth, false - guest */
            checkUser.data.length === 0 ? localStorage.setItem('userIsAuth:', false) : 
            !checkUser.data             ? localStorage.setItem('userIsAuth:', true) 
                                        : '';
            
            arrayLocalStorage = Object.values(localStorage);

            /*add to storage status user from localStorage*/
            arrayLocalStorage.forEach((item, i) => {
                localStorage.key(i) === 'userIsAuth:' ? this.addUser(localStorage.getItem(localStorage.key(i)))
                                                      : ''
            });

            /*if data is corrent => hide the dialog*/
            if (this.showAlert){
                setTimeout(()=> {
                    this.showAlert = false
                }, 3000);
            } else {
                this.dialog = false;
            }
        }
    },
};
</script>

<style scoped>
    .container {
        background-image: none;
    }
</style>