<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs4>
                    <v-subheader>Имя</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-text-field
                    label   = "Имя"
                    v-model = 'name'
                    :error-messages = "nameError"
                    @input          = "$v.name.$touch()"
                    @blur           = "$v.name.$touch()"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs4>
                    <v-subheader>Фамилия</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-text-field
                    label           = "Фамилия"
                    v-model         = 'surname'
                    :error-messages = "surnameError"
                    @input          = "$v.surname.$touch()"
                    @blur           = "$v.surname.$touch()"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs4>
                    <v-subheader>Логин</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-text-field
                    label   = "Логин"
                    v-model = 'login'
                    :error-messages = "loginError"
                    @input          = "$v.login.$touch()"
                    @blur           = "$v.login.$touch()"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs4>
                    <v-subheader>Пароль</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-text-field
                    label   = "Пароль"
                    type    = "password"
                    v-model = 'password'
                    :error-messages = "passwordError"
                    @input          = "$v.password.$touch()"
                    @blur           = "$v.password.$touch()"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            
            <v-layout row>
                <v-flex xs4>
                    <v-subheader>Специализация</v-subheader>
                </v-flex>
                <v-flex xs8>
                    <v-select
                        v-model    = 'idSpecialization'
                        :items     = 'specializationItems'
                        item-value = 'id'
                        item-text  = 'position'
                        label      = "Специализация"
                        :error-messages = "specializationError"
                        @input          = "$v.idSpecialization.$touch()"
                        @blur           = "$v.idSpecialization.$touch()"
                    ></v-select>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-btn 
                    style  = "margin-left: auto"
                    @click = 'addMaster'
                    :disabled = "$v.$invalid"
                >
                    Добавить
                </v-btn>
            </v-layout>

        </v-container>
    </div>
</template>

<script>
    import requestSpecialization from '../../../request/service';
    import requestAddMaster from '../../../request/human';
    import { required, minLength } from 'vuelidate/lib/validators';
    import apiAuthe from "../../../request/authentication";

    export default {
        async created() {
            let specialization = await requestSpecialization.readPosition();

            this.specializationItems = Object.values(specialization.data);
        },
        data() {
            return {
                name             : '',
                surname          : '',
                login            : '',
                password         : '',
                idSpecialization : '',

                specializationItems: []
            }
        },
        computed: {
            loginError() {
                const errors = [];
               
                if (!this.$v.login.$dirty) return errors;
                
                !this.$v.login.required   && errors.push('Это обязательное поле.');
                !this.$v.login.checkLogin && errors.push('Такой логин уже существует.');

                return errors;
            },
            nameError() {
                const errors = [];

                if (!this.$v.name.$dirty) return errors;

                !this.$v.name.required && errors.push('Это обязательное поле.');

                return errors;
            },
            surnameError() {
                const errors = [];

                if (!this.$v.surname.$dirty) return errors;

                !this.$v.surname.required && errors.push('Это обязательное поле.');

                return errors;
            },
            passwordError() {
                const errors = [];

                if (!this.$v.password.$dirty) return errors;

                !this.$v.password.required && errors.push('Это обязательное поле.');

                return errors;
            },
            specializationError() {
                const errors = [];

                if (!this.$v.idSpecialization.$dirty) return errors;

                !this.$v.idSpecialization.required && errors.push('Это обязательное поле.');

                return errors;
            },
        },
        methods: {
            async addMaster(){
                let objMaster = {
                    name        : this.name,
                    surname     : this.surname,
                    login       : this.login,
                    password    : this.password,
                    role        : true,
                    id_position : this.idSpecialization
                };

                let check = await requestAddMaster.addMaster(objMaster);
            }
        },
        validations: {
            login: {
                required,
                async checkLogin() {
                    let flag  = await apiAuthe.checkLogin(this.login);

                    return !flag.data 
                }
            },
            password: {
                required,
                minLength: minLength(6)
            },
            name: {
                required
            },
            surname: {
                required
            },
            idSpecialization: {
                required
            }
    },
        
    }
</script>

<style scoped>
    .container {
        background-image: none;
    }
</style>