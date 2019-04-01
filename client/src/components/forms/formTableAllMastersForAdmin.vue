<template>
    <div>
        <v-card>
            <v-card-title>
            Таблица мастеров
                <v-spacer></v-spacer>
                <v-text-field
                    v-model     = "search"
                    append-icon = "search"
                    label       = "Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers = "headers"
                :items   = "desserts"
                class    = "elevation-1"
                :search  = "search"
            >
                <template 
                    slot       = "items" 
                    slot-scope = "props"
                >
                <td>{{ props.item.position }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.secondName }}</td>
                <td>{{ props.item.login }}</td>
                <td class = "align-center layout px-0">
                    <v-icon
                        style  = "padding-left: 35px"
                        @click = "deleteItem(props.item)"
                        small
                    > 
                        delete
                    </v-icon>
                </td>
                </template>
                <template v-slot:no-data>
                    <v-btn 
                        color  = "primary" 
                        @click = "initialize"
                    >
                        Reset
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import request from "../../../request/service"

export default {
    data() {
        return {
            search: '',
            headers: [
                { text : 'Должность',   value : 'position'    },
                { text : 'Имя',         value : 'name'        },
                { text : 'Фамилия',     value : 'secondName'  },
                { text : 'Логин',       value : 'login'       },
                { text : 'Actions',     value : 'name2'       }
            ],
            desserts: []
        };
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize () {
            this.desserts = [
                {
                    position: 'СПА-массажист',
                    name: 'Артур',
                    secondName: 'Адамович',
                    login: 'stelex',
                    id: 1
                },
                {
                    position: 'Макияжист',
                    name: 'Андрей',
                    secondName: 'Швидчэ',
                    login: 'Andrey',
                    id: 2
                },
                {
                    position: 'Жопку мнет',
                    name: 'Ян',
                    secondName: 'Бондарчик',
                    login: 'YanBond',
                    id: 3
                },
            ]
        },
        deleteItem (item) {
            console.log(item)
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        }
    },
};
</script>

<style scoped>

</style>