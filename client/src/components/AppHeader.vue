// Component Header
<template>
	<div>
		<v-navigation-drawer 
			class	= "hidden-md-and-up"
			v-model = "drawer" 
			absolute 
			temporary 
		>
			<v-list>
				<v-list-tile 
					v-for = "(item, i) in menuItems" 
					:key  = "`navDrawer${i}`" 
					:to   = "item.route"
				>
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>{{item.title}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-container 
			fluid 
			ma-0 
			pa-0
		>
			<v-layout 
				row 
				align-center 
				justify-center 
				wrap
			>
				<v-flex 
					md4 
					sm4
				>
					<p
						class = "list-adress-phone text-md-left black--text hidden-xs-only"
						v-for = "(item, i) in listAdressPhone"
						:key  = "`indexPhoneAdress${i}`"
					>
						<v-icon>place</v-icon>
							{{item.street}}
						<br>
						<v-icon>smartphone</v-icon>
						{{item.phone}}
					</p>
				</v-flex>
				<v-flex
					class = "text-md-center" 
					md4 
					sm4 
					xs6 
				>
					<router-link to = "/">
						<img
							src   = "http://www.beauty-vitebsk.by/wp-content/uploads/2017/07/%D0%BB%D0%BE%D0%B3%D0%BE5.png"
							style = "width: 220px; height: 120px;"
						>
					</router-link>
				</v-flex>
				<v-flex 
					class = "text-md-center"
					md4 
					sm4 
					xs6 
					align-center  
					wrap
				>
					<v-layout 
						row 
						wrap
					>
						<formReg v-if  = "returnDataCheckAuthorization"></formReg>
						<formAuth v-if = "returnDataCheckAuthorization" ></formAuth>

						<v-btn 
							class = "transparent black--text" 
							v-if  = "!returnDataCheckAuthorization"
							to 	  = "/userAccount"
						>
								Личный кабинет
						</v-btn>
						<v-btn 
							class  = "transparent black--text" 
							v-if   = "!returnDataCheckAuthorization"
							@click = "exitUser"
						>
							Выход
						</v-btn>
					</v-layout>
				</v-flex>
			</v-layout>

			<v-layout>
				<v-toolbar class = "transparent">
					<v-toolbar-side-icon 
						class 	    = "white hidden-md-and-up"
						@click.stop = "drawer =! drawer" 
					></v-toolbar-side-icon>
					<v-toolbar-items class="toolbar-items hidden-sm-and-down text-md-center">
						<v-btn
							class="black--text"
							flat
							v-for="(item, i) in menuItems"
							:key="`menuItems${i}`"
							:to="item.route"
						>
							{{item.title}}
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
			</v-layout>
		</v-container>
	</div>
</template>


<script>
import formReg      from "@/components/forms/formRegistration";
import formAuth     from "@/components/forms/formAuthorization";
import { mapState, mapActions } from "vuex";
import apiService   from "../../request/service"
import apiReview    from "../../request/review"
import apiAuthe     from "../../request/authentication"

export default {
	components: {
		formReg,
		formAuth
	},
	data() {
		return {
			drawer: false
		};
	},
	computed: {
		...mapState("header", {
			menuItems       : 'dataMenuItems',
			listAdressPhone : 'dataListAdressPhone'
		}),
		...mapState('user', ['user']),

		returnDataCheckAuthorization() {
			return this.user === 'true' ? false 
										: true
		}
	},
	methods: {
		...mapActions('user', ['addUser']),

		exitUser(){
			localStorage.setItem('userIsAuth:', false);
			this.addUser(false);
		}
	},
};
</script>

<style>
.container {
	background-image    : url(http://being-woman.ru/wp-content/uploads/2015/09/sprei_i_muss_ton_legche_vozduxa.jpg);
	background-size	  : cover;
	background-position : center;
	max-width			  : 1300px;
}
.toolbar-items {
	margin-left: 31%;
}
p {
	margin: 0 0 0 20%;
}

div .list-adress-phone:nth-child(1){
    margin-top: 15px;
}

.list-adress-phone .theme--light.v-icon {
    color	  : #FFFFFF !important;
    font-size : 16px;
}
</style>