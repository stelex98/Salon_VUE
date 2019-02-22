<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" class="transparent white--text" dark>Регистрация</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Регистрация</span>
        </v-card-title>
        <v-card-text class="main-content-reg">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Имя"  v-model="name" :error = "checkName" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Фамилия" :error="checkSecondName" v-model = "secondName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Login" v-model = "login" :error = "checkLogin" :hint = information></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model = "email" :error = "checkEmail" hint="Например: stelex98@mail.ru" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Телефон" v-model = "phoneNumber" :error = "checkPhoneNumber" hint="Например: 375291799811" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Password"
                  v-model = "password"
                  hint    = "Используйте минимум 8 цифр, от одной прописной и строчной букв, один номер и специальный символ"
                  type    = "password"
                  :error  = "checkPassword"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md12>
                <uploadButton></uploadButton>
              </v-flex>
              <v-flex xs12 sm12>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="date"
                    label="Данные вашего дня рождения"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class="button-actions">
          <v-spacer></v-spacer>
          <v-btn 
            color="blue darken-1" 
            flat 
            @click="closeWindow"
            >Закрыть</v-btn>
            <v-btn color="blue darken-1" 
                flat
                @click="createUser"
                :disabled = "checkAllField"
            >Зарегистрироваться</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
import uploadButton from "@/components/forms/fileUploadButton.vue";
import apiAuthe from "../../../request/authentication"

export default {
    components: {
        uploadButton
    },
    computed: {
        ...mapState('registrationData', ['currentDataImageBase64']),
        checkName(){ 
            return this.name.match(/[a-zA-z0-9]/i) 
                ?  true 
                :  false;
        },
        checkSecondName(){
            return this.secondName.match(/[a-zA-z0-9]/i) 
                ?  true 
                :  false;
        },
        checkLogin(){
            this.checkLoginServ();

            return this.checkErrorS;
        },
        checkEmail(){
            let re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return !re.test(String(this.email).toLowerCase());
        },
        checkPhoneNumber(){
            let checkReg = /\D/.test(this.phoneNumber);
            return checkReg;
        },
        checkPassword(){
            return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(this.password);
        },
        checkAllField(){
            let check = this.name.length === 0 || this.secondName.length === 0 || this.login.length === 0 || this.email.length === 0 
            || this.phoneNumber.length === 0 || this.date === null || this.checkName || this.checkSecondName || this.checkLogin || 
            this.checkEmail || this.checkPhoneNumber || this.checkPassword;

            return check;
        }
    },
    data() {
        return {
            dialog       : false,
            date         : null,
            menu         : false,

            name         : '',
            secondName   : '',
            login        : '',
            email        : '',
            phoneNumber  : '',
            password     : '',
            dataOfPhoto  : '',
            information  : 'Поле не должно быть пустым',
            checkErrorS  : false
        }
    },
    watch: {
        menu(val) {
            val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
        }
    },
    methods: {
        ...mapActions('registrationData', ['clearCurrentDataImg', 'addCurrentDataImg']),
        ...mapGetters('registrationData', ['returnCurrentDataImageBase64']),

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
                date_birth :  this.date,
                mail       : this.email,
                phone      : `+${this.phoneNumber}`,
                photo      : this.dataOfPhoto
            };
            let requestToCreateUser = await apiAuthe.registration(user);

            this.dialog = false;
            this.clearCurrentDataImg('');
            this.resetData();
        },
        async checkLoginServ(){
            let flag  = await apiAuthe.checkLogin(this.login);

            if (flag.data){
                this.information = 'Такой логин уже существует';
                this.checkErrorS = true;
            } else {
                this.information = '';
                this.checkErrorS = false
            }
        },
        resetData(){
            this.login       = '';
            this.password    = '';
            this.name        = '';
            this.secondName  = '';
            this.date        = null;
            this.email       = '';
            this.phoneNumber = '';
            this.dataOfPhoto = '';
        },
        closeWindow(){
            this.dialog = false;
            this.clearCurrentDataImg('');
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

.button-actions{
    margin-top: -50px;
}
</style>