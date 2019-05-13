<template>
    <v-app>
        <AppHeader class = "appHeaderServices"></AppHeader>
        <p class = 'describe-title'>Ваши записи на услуги</p>
        <v-layout 
            class = 'container-table'
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
                        <td> {{ props.item.master }} </td>
                        <td> {{ props.item.date }} </td>
                        <td> {{ props.item.time }} </td>
                        <td> {{ props.item.price }} </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
        <AppFooter></AppFooter>
    </v-app>
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
                    text  : 'Мастер', 
                    value : 'master', 
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
                },
                { 
                    text  : 'Цена', 
                    value : 'price', 
                    align : 'left'
                }
            ],
            desserts: [
                {
                    name   : 'Спа-ног',
                    master : 'Егор Дружинин',
                    date   : '25.06.2019',
                    time   : '19:30',
                    price  : '25 руб.'
                },
                {
                    name   : 'Массаж спины',
                    master : 'Полина Запрудская',
                    date   : '30.07.2019',
                    time   : '13:00',
                    price  : '15 руб.'
                },
                {
                    name   : 'Макияж',
                    master : 'Анастасия Нагар',
                    date   : '23.07.2019',
                    time   : '11:00',
                    price  : '20 руб.'
                },
                {
                    name   : 'Стрижка',
                    master : 'Алиса Почтовая',
                    date   : '27.06.2019',
                    time   : '16:30',
                    price  : '40 руб.'
                },
                {
                    name   : 'Депиляция ног',
                    master : 'Гретченко Ольга',
                    date   : '05.07.2019',
                    time   : '09:00',
                    price  : '15 руб.'
                },
                {
                    name   : 'Спа-рук',
                    master : 'Света Карпук',
                    date   : '10.07.2019',
                    time   : '20:00',
                    price  : '45 руб.'
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
    .describe-title {
        padding: 25px 0 0 100px;
        font-size: 2rem;
        font-weight: 400;
        margin: 0;
    }
    .container-table {
        padding: 50px 100px;
    }
</style>