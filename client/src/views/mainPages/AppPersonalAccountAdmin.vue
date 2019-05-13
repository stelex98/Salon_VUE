<template>
    <div class = 'container-admin'>
        <AppHeader class = "appHeaderServices"></AppHeader>
        <p class = 'container-admin__describe-title'>Ваши записи к вам на услугу</p>
        <v-layout 
            class = 'container-admin__container-table'
            row
        >
            <v-flex>
                <v-data-table
                    class    = "elevation-1"
                    :headers = "headers"
                    :items   = "desserts"
                >
                    <template
                        slot       = "items" 
                        slot-scope = "props"
                    >
                        <td> {{ props.item.name }} </td>
                        <td> {{ props.item.dataOfClient }} </td>
                        <td> {{ props.item.date }} </td>
                        <td> {{ props.item.time }} </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
        <AppFooter></AppFooter>
    </div>
</template>

<script>
import AppHeader      from "@/components/AppHeader.vue";
import AppFooter      from "@/components/AppFooter.vue";
import { mapActions } from "vuex";

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            headers: [
                {
                    text     : 'Услуга',
                    align    : 'left',
                    sortable : false,
                    value    : 'name'
                },
                { 
                    text  : 'ФИО клиента', 
                    value : 'dataOfClient', 
                    align : 'left'
                },
                { 
                    text  : 'Дата', 
                    value : 'date', 
                    align : 'left'
                },
                { 
                    text  : 'Время', 
                    value : 'time', 
                    align : 'left'
                }
            ],
            desserts: [
                {
                    name   : 'Массаж общий',
                    dataOfClient : 'Евгения Ефросиня',
                    date   : '27.07.2019',
                    time   : '13:30'
                },
                {
                    name   : 'Массаж рук',
                    dataOfClient : 'Ростислав Мудрый',
                    date   : '02.07.2019',
                    time   : '16:00'
                },
                {
                    name   : 'Массаж спины',
                    dataOfClient : 'Хлебест Дмитрий',
                    date   : '23.07.2019',
                    time   : '08:00'
                },
                {
                    name   : 'Массаж камнями',
                    dataOfClient : 'Иосиф Сергей',
                    date   : '16.06.2019',
                    time   : '17:00'
                },
                {
                    name   : 'Массаж тайский',
                    dataOfClient : 'Глебов Денис',
                    date   : '05.07.2019',
                    time   : '09:00'
                },
                {
                    name   : 'Массаж шеи',
                    dataOfClient : 'Шамшуров Павел',
                    date   : '29.07.2019',
                    time   : '10:30'
                }
            ]
        }
    },
    created() {
        let arrayLocalStorage = Object.values(localStorage);

        /*add to storage status user from localStorage*/
        arrayLocalStorage.forEach((item, i) => {
            localStorage.key(i) === 'userIsAuth:' ? this.addUser(localStorage.getItem(localStorage.key(i)))
                                                  : ''
        });
    },
    methods: {
        ...mapActions('user', ['addUser'])
    }
};
</script>

<style scoped>
    .appHeaderServices .container {
        max-height          : 225px;
        background-image    : url(https://pp.userapi.com/c846220/v846220368/1b16b8/oKVkgVio79c.jpg) !important;
        background-position : center 80%;
    }
    .container-admin{
        /* background-color: #313131; */
    }
    .container-admin__describe-title {
        padding: 25px 0 0 100px;
        font-size: 2rem;
        font-weight: 400;
        margin: 0;
    }
    .container-admin__container-table {
        padding: 50px 100px;
    }
</style>