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
        >
            Регистрация
        </v-btn>
        <v-card>
        <v-card-title>
            <span class = "headline">Регистрация</span>
        </v-card-title>
        <v-card-text class = "main-content-reg">
            <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12 sm6 md6>
                <v-text-field 
                    label           = "Имя" 
                    v-model         = "name"
                    :error-messages = "nameErrors"
                    @input          = "$v.name.$touch()"
                    @blur           = "$v.name.$touch()"
                ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                <v-text-field 
                    label           = "Фамилия" 
                    v-model         = "secondName"
                    :error-messages = "secondNameErrors"
                    @input          = "$v.secondName.$touch()"
                    @blur           = "$v.secondName.$touch()"
                ></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field 
                    label           = "Логин" 
                    v-model         = "login"
                    :error-messages = "loginErrors"
                    @input          = "$v.login.$touch()"
                    @blur           = "$v.login.$touch()"
                ></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field
                    label           = "Почта"
                    v-model         = "email"
                    :error-messages = "emailErrors"
                    @input          = "$v.email.$touch()"
                    @blur           = "$v.email.$touch()"
                    hint="Например: stelex98@mail.ru"
                ></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field
                    label           = "Телефон"
                    v-model         = "phoneNumber"
                    :error-messages = "phoneNumberErrors"
                    @input          = "$v.phoneNumber.$touch()"
                    @blur           = "$v.phoneNumber.$touch()"
                    hint="Например: 375291799811"
                ></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field
                    label           = "Пароль"
                    v-model         = "password"
                    hint            = "Используйте минимум 6 цифр."
                    type            = "password"
                    :error-messages = "passwordErrors"
                    @input          = "$v.password.$touch()"
                    @blur           = "$v.password.$touch()"
                ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                <uploadButton></uploadButton>
                </v-flex>
                <v-flex xs12 sm12>
                <v-menu
                    ref                     = "menu"
                    :close-on-content-click = "false"
                    v-model                 = "menu"
                    :nudge-right            = "40"
                    transition              = "scale-transition"
                    min-width               = "290px"
                    offset-y
                    full-width
                    lazy
                >
                    <v-text-field
                        slot            = "activator"
                        v-model         = "date"
                        label           = "Данные вашего дня рождения"
                        :error-messages = "dateErrors"
                        @input          = "$v.date.$touch()"
                        @blur           = "$v.date.$touch()"
                        readonly
                    ></v-text-field>
                    <v-date-picker
                        ref     = "picker"
                        v-model = "date"
                        :max    = "new Date().toISOString().substr(0, 10)"
                        min     = "1950-01-01"
                        @change = "save"
                    ></v-date-picker>
                </v-menu>
                </v-flex>
            </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions class = "button-actions">
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
                @click    = "createUser" 
                :disabled = "$v.$invalid || checkDataImage"
                flat 
            >
                Зарегистрироваться
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import uploadButton from "@/components/forms/fileUploadButton.vue";
import apiAuthe from "../../../request/authentication";
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    components: {
        uploadButton
    },
    computed: {
        ...mapState("registrationData", ["currentDataImageBase64"]),
        nameErrors () {
            const errors = [];

            if (!this.$v.name.$dirty) return errors;

            !this.$v.name.checkOtherSymbols && errors.push('В поле не должны присутсвовать цифры и символы английского алфавита.');
            !this.$v.name.required          && errors.push('Это обязательное поле.');

            return errors
        },
        secondNameErrors () {
            const errors = [];

            if (!this.$v.secondName.$dirty) return errors;

            !this.$v.secondName.checkOtherSymbols && errors.push('В поле не должны присутсвовать цифры и символы английского алфавита.');
            !this.$v.secondName.required          && errors.push('Это обязательное поле.');

            return errors
        },
        loginErrors() {
            const errors = [];
            if (!this.$v.login.$dirty) return errors;

            !this.$v.login.required   && errors.push('Это обязательное поле.');
            !this.$v.login.minLength  && errors.push('Минимальная длинна поля 3 символа.');
            !this.$v.login.checkLogin && errors.push('Такой логин уже существует.');

            return errors
        },
        emailErrors() {
            const errors = [];

            if (!this.$v.email.$dirty) return errors;

            !this.$v.email.required && errors.push('Это обязательное поле.');
            !this.$v.email.email    && errors.push('Почта должна выглядеть вот так: test@gmail.com');
            
            return errors;
        },
        phoneNumberErrors() {
            const errors = [];

            if (!this.$v.phoneNumber.$dirty) return errors;

            !this.$v.phoneNumber.checkOtherSymbols && errors.push('Должны быть только цифры.');
            !this.$v.phoneNumber.required          && errors.push('Это обязательное поле.');

            return errors;
        },
        passwordErrors() {
            const errors = [];

            if (!this.$v.password.$dirty) return errors;

            !this.$v.password.required  && errors.push('Это обязательное поле.');
            !this.$v.password.minLength && errors.push('Минимальная длинна пароля должны быть 6 символов.');

            return errors;
        },
        dateErrors() {
            const errors = [];

            if (!this.$v.date.$dirty) return errors;

            !this.$v.date.required && errors.push('Это обязательное поле.');

            return errors;
        },
        checkDataImage(){
            return !Boolean(this.currentDataImageBase64)
        }
    },
    data() {
        return {
            dialog : false,
            date   : null,
            menu   : false,

            name        : "",
            secondName  : "",
            login       : "",
            email       : "",
            phoneNumber : "",
            password    : "",
            dataOfPhoto : ""
        };
    },
    validations: {
        name: {
            required,
            checkOtherSymbols() {
            let re       = /[a-zA-z0-9]/i;
            let model    =  this.$v.name.$model;
            return !re.test(model)
            }
        },
        secondName: {
            required,
            checkOtherSymbols() {
            let re       = /[a-zA-z0-9]/i;
            let model    =  this.$v.secondName.$model;
            return !re.test(model)
            }
        },
        login: {
            required,
            minLength: minLength(3),
            async checkLogin() {
                let flag  = await apiAuthe.checkLogin(this.login);

                return !flag.data 
            }
        },
        email: {
            required,
            email
        },
        phoneNumber: {
        required,
        checkOtherSymbols() {
            let re       = /[a-zа-яё]/i;
            let model    =  this.$v.phoneNumber.$model;

            return !re.test(model)
        }
    },
    password: {
        required,
        minLength: minLength(6)
    },
    date: {
        required
    }
    },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    ...mapActions("registrationData", [
      "clearCurrentDataImg",
      "addCurrentDataImg"
    ]),
    ...mapGetters("registrationData", ["returnCurrentDataImageBase64"]),
    save(date) {
      this.$refs.menu.save(date);
    },
    async createUser() {
        this.dataOfPhoto = this.returnCurrentDataImageBase64();

        let user = {
            login      : this.login,
            password   : this.password,
            role       : false,
            name       : this.name,
            surname    : this.secondName,
            date_birth : this.date,
            mail       : this.email,
            phone      : `+${this.phoneNumber}`,
            photo      : this.dataOfPhoto
        };
        let requestToCreateUser = await apiAuthe.registration(user);

        this.dialog = false;
        this.clearCurrentDataImg("");
        this.resetData();
    },
    resetData() {
        this.$v.$reset();
        this.login       = "";
        this.password    = "";
        this.name        = "";
        this.secondName  = "";
        this.date        = null;
        this.email       = "";
        this.phoneNumber = "";
        this.dataOfPhoto = "";
    },
    closeWindow() {
        this.dialog = false;
        this.clearCurrentDataImg();
        this.resetData();
    }
  }
};
</script>

<style scoped>
    .container {
        background-image: none;
    }
    .main-content-reg {
        margin-top: -40px;
    }

    .button-actions {
        margin-top: -50px;
    }
</style>