<template>
    <div>
        <v-dialog 
            v-model   = "dialog"  
            max-width = "600px"
            :disabled = "returnDataCheckAuthorization"
            persistent
        >
            <v-btn 
                slot      = "activator" 
                class     = "transparent black--text" 
				:disabled = "returnDataCheckAuthorization"
                @click 	  = "check"
            >
                Записаться
            </v-btn>
            <v-card>
                <v-card-title>
                    <span 
						class = "headline"
					>
                        Записаться
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex 
                                xs12 
                                sm6 
                                md6
                            >
                                <v-select
                                    v-model  = "choosedTypeService"
                                    :items   = "TypeOfServices"
                                    label    = "Тип услуги"
                                    disabled
                                ></v-select>
                            </v-flex>
                            <v-flex 
                                xs12 
                                sm6 
                                md6
                            >
                                <v-select 
                                    v-model = "choosedService" 
                                    :items  = "services"  
                                    label   = "Услуга"
                                    disabled
                                ></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-select 
                                    :items = "TypeOfMasters" 
                                    label  = "Мастер"
                                ></v-select>
                            </v-flex>
                            <v-flex 
                                xs12 
                                sm12
                            >
                                <v-menu
                                    ref                     = "menu1"
                                    :close-on-content-click = "false"
                                    v-model                 = "menu1"
                                    :nudge-right            = "40"
                                    transition              = "scale-transition"
                                    max-width               = "290px"
                                    min-width               = "290px"
                                    offset-y
                                    full-width
                                    lazy
                                >
                                    <v-text-field
                                        slot    = "activator"
                                        v-model = "dateFormatted"
                                        label   = "Дата"
                                        hint    = "Выберите дату, на которую хотите записаться"
                                        @blur   = "date = parseDate(dateFormatted)"
                                        persistent-hint
                                    ></v-text-field>
                                    <v-date-picker 
                                        v-model  = "date"  
                                        @input   = "menu1 = false"
                                        no-title
                                    ></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-layout 
                                row 
                                justify-center
                            >
                                <v-flex 
                                    d-flex 
                                    md10 
                                    sm10 
                                    xs12
                                >
                                    <v-radio-group row>
                                        <v-radio label="11:20-13:25" value="1"></v-radio>
                                        <v-radio label="11:20-13:25" value="2"></v-radio>
                                        <v-radio label="11:20-13:25" value="3"></v-radio>
                                        <v-radio label="11:20-13:25" value="4"></v-radio>
                                        <v-radio label="11:20-13:25" value="5"></v-radio>
                                        <v-radio label="11:20-13:25" value="6"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color  = "blue darken-1"  
                        @click = "dialog = false"
                        flat
                    >
                        Закрыть
                    </v-btn>
                    <v-btn 
                        color  = "blue darken-1"  
                        @click = "dialog = false"
                        flat
                    >
                        Записаться
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import request from '../../../request/discount'

export default {
	data: vm => ({
		dialog: false,
		menu: false,
		date: new Date().toISOString().substr(0, 10),
		dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
		menu1: false,
		TypeOfServices: [],
		TypeOfMasters: [],
		services: [],
		choosedTypeService: null,
		choosedService: null,
	}),
	created() {
		let arrayLocalStorage = Object.values(localStorage);

		/*add to storage status user from localStorage*/
		arrayLocalStorage.forEach((item, i) => {
			localStorage.key(i) === 'userIsAuth:' ? this.addUser(localStorage.getItem(localStorage.key(i)))
													: ''
		});
  	},
	computed: {
		...mapState("stock", {
			arrayStock	     : "stock",
			arrayMasters	 : "masters",
			dataCurrentStock : "currentStock"
		}),
		...mapState("homeServices", {
			arrayServicesContent: "servicesContent"
		}),
		...mapState('user', ['user']),

		computedDateFormatted() {
			return this.formatDate(this.date);
		},
		returnServicesContent() {
			return this.arrayServicesContent;
		},
		returnDataCheckAuthorization() {
			return this.user === 'true' ? false 
										: true
		}
	},
	watch: {
		menu(val) {
			val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
		},
		date(val) {
			this.dateFormatted = this.formatDate(this.date);
		}
	},
	methods: {
		...mapActions('user', ['addUser']),

		save(date) {
			this.$refs.menu.save(date);
		},

		formatDate(date) {
			if (!date) return null;

			const [year, month, day] = date.split("-");
			return `${month}/${day}/${year}`;
		},

		parseDate(date) {
			if (!date) return null;

			const [month, day, year] = date.split("/");
			return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
		},

		check(index) {
			let objectAllServices = this.arrayServicesContent;
			let objectAllStock    = this.arrayStock;
			let currentStockIndex = this.dataCurrentStock;
			let objectAllMaters   = this.arrayMasters;

			for (let i = 0; i < objectAllServices.length; i++) {
				this.TypeOfServices.push(objectAllServices[i].globalName);

				for (let j = 0; j < objectAllServices[i].itemsServices.length; j++) {
					this.services.push(objectAllServices[i].itemsServices[j]);
				}
			}

			for (let i = 0; i < objectAllMaters.length; i++) {
				this.TypeOfMasters.push(objectAllMaters[i]);
			}

			this.choosedTypeService = objectAllStock[currentStockIndex].typeService;
			this.choosedService 	= objectAllStock[currentStockIndex].service;
		}
	}
};
</script>

<style scoped>
	.container {
		background-image: none;
	}
</style>