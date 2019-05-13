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
                <td>{{ props.item.surname }}</td>
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
                <template slot = 'no-data'>
                    <v-alert :value="true" color="error" icon="warning">
                        Данные отсутсвуют
                    </v-alert>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import request from "../../../request/service";
import requestAdmin from "../../../request/human"

export default {
    data() {
        return {
            search: '',
            headers: [
                { text : 'Должность',   value : 'position'    },
                { text : 'Имя',         value : 'name'        },
                { text : 'Фамилия',     value : 'surname'  },
                { text : 'Логин',       value : 'login'       },
                { text : 'Actions',     value : 'name2'       }
            ],
            desserts: []
        };
    },
    async created() {
        let dataOfMasters = await requestAdmin.readAllMasters();

        Object.values(dataOfMasters.data).forEach(item => {
            this.desserts.push(item);
        });
    },
    methods: {
        async deleteItem (item) {
            const index = this.desserts.indexOf(item);
            this.desserts.splice(index, 1);
            let deleteMaster = await requestAdmin.deleteMaster(item.id);
        }
    },
};
</script>

<style scoped>

</style>