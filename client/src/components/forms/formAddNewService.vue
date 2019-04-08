<template>
    <div>
        <v-toolbar flat color = "white">
            <v-toolbar-title>Таблица услуг</v-toolbar-title>
            <v-divider
                class = "mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn   
                class  = "mb-2" 
                @click = "addNewService"

            >
                Добавить услугу
            </v-btn>
            <v-dialog 
                v-model   = "dialog" 
                max-width = "500px"
            >
                    <v-card>
                        <v-card-title>
                            <span class = "headline">{{ formTitle }}</span>
                        </v-card-title>
        
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md6>
                                    <v-select 
                                        v-model    = 'objService'
                                        :items     = 'serviceArr'
                                        item-value = 'id'
                                        item-text  = 'service'
                                        :label     = "currentService"
                                        @input     = "checkService()"
                                        return-object
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                     <v-select 
                                        v-model    = 'objGroup'
                                        :items     = 'groupArr'
                                        item-value = 'id'
                                        item-text  = 'group'
                                        :label     = "currentGroup"
                                        @input     = 'checkGroup()'
                                         return-object
                                    ></v-select>
                                </v-flex>
                                <v-flex md6>
                                    <v-flex xs12 sm6 md12>
                                        <v-text-field v-model = "currentPrice" label = "Цена"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md12>
                                        <v-text-field v-model = "currentAboutService" label = "Описание"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md12>
                                        <v-text-field 
                                            label        = "Select Image" 
                                            @click       = 'pickFile' 
                                            v-model      = 'currentPhoto' 
                                        ></v-text-field>
                                        <input
                                            type    = "file"
                                            style   = "display: none"
                                            ref     = "image"
                                            accept  = "image/*"
                                            @change = "onFilePicked"
                                        >
                                    </v-flex>
                                </v-flex>
                                <v-flex md6 style = 'border: 1px solid black; height: 210px; padding: 5px'>
                                    <v-img 
                                        :src = "urlImage"
                                        height = '200px'
                                    ></v-img>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color = "blue darken-1" flat @click = "close">Закрыть</v-btn>
                        <v-btn color = "blue darken-1" flat @click = "save">Сохранить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
      </v-toolbar>
        <v-data-table
            :headers = "headers"
            :items   = "desserts"
            class    = "elevation-1"
        >
            <template 
                slot       = "items" 
                slot-scope = "props"
            >
                <td>{{ props.item.service }}</td>
                <td class = "text-xs-right">{{ props.item.group }}</td>
                <td class = "text-xs-right">{{ props.item.price }}</td>
                <td class = "text-xs-right">{{ props.item.aboutService }}</td>
                <td class = "text-xs-right">
                    <v-img :src = 'props.item.photo' style = 'width: 30px; height: 30px;'></v-img>
                </td>
                <td class = "justify-center layout px-0 align-center" >
                    <v-icon
                        class  = "mr-2"
                        @click = "editItem(props.item)"
                        small
                    >
                        edit
                    </v-icon>
                    <v-icon
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
    </div>
</template>

<script>
    export default {
        data(){
            return {
                dialog    : false,
                imageName : '',
                imageFile : '',
                urlImage  : `https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`,
                dialog    : false,

                serviceArr: [
                    {
                        id: 1,
                        service: 'СПА'
                    },
                    {
                        id: 2,
                        service: 'Массаж'
                    }
                ],
                groupArr: [
                    {
                        id: 30,
                        group: 'СПА-Массаж'
                    },
                    {
                        id: 24,
                        group: 'Массаж тела'
                    }
                ],
                objService : 0,
                objGroup   : 0,
                headers: [
                    { text : 'Услуга',    value : 'service' },
                    { text : 'Группа',    value : 'group' },
                    { text : 'Цена',      value : 'price' },
                    { text : 'Об услуге', value : 'aboutService' },
                    { text : 'Фото',      value : 'photo' },
                    { text : 'Actions',   value : 'name', sortable: false }
                ],
                desserts       : [],
                currentIndexOf : -1,

                currentService      : '',
                currentGroup        : '',
                currentPrice        : 0 ,
                currentAboutService : '',
                currentPhoto        : '',
                currentId           : 0,
                currentIdItem       : 0,
            }
        },
          computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Добавить услугу' : 'Редактировать услугу'
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.desserts = [
                    {
                        service      : 'СПА',
                        group        : 'СПА-массаж',
                        price        : 25,
                        aboutService : 'Клевый массаж',
                        photo        : `https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`,
                        id           : 10
                    },
                    {
                        service      : 'Массаж',
                        group        : 'Массаж тела',
                        price        : 30,
                        aboutService : 'Массаж тела очень помогает старым людям',
                        photo        : `https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`,
                        id           : 27
                    },          
                ]
            },
            pickFile () {
                this.$refs.image.click();
            },
            onFilePicked (e) {
                const files = e.target.files;
                
                if(files[0] !== undefined) {
                    this.imageName = files[0].name;

                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return;
                    }
                    const fr = new FileReader ();

                    fr.readAsDataURL(files[0]);
                    fr.addEventListener('load', () => {
                        this.urlImage      = fr.result;
                        this.imageFile     = files[0];
                        this.currentPhoto  = this.urlImage;
                    });
                } 
                    else {
                        this.imageName = '';
                        this.imageFile = '';
                        this.imageUrl  = '';
                    }
            },
            checkService(){
                this.currentService = this.objService.service;
            },
            checkGroup(){
                this.currentId    = this.objGroup.id;
                this.currentGroup = this.objGroup.group;
            },
            addNewService(){
                this.dialog         = true;
                this.currentIndexOf = -1;

                this.currentService      = '';
                this.currentGroup        = '';
                this.currentPrice        = '';
                this.currentAboutService = '';
                this.currentPhoto        = '';
                this.currentIdItem       = '';
            },
            editItem (item) {
                this.dialog         = true;
                this.currentIndexOf = this.desserts.indexOf(item);

                this.currentService      = item.service;
                this.currentGroup        = item.group;
                this.currentPrice        = item.price;
                this.currentAboutService = item.aboutService;
                this.currentPhoto        = item.photo;
                this.currentIdItem       = item.id;
               
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
            },

            save () {
                let newObj = {
                    service      : this.currentService,
                    group        : this.currentGroup,
                    price        : this.currentPrice,
                    aboutService : this.currentAboutService,
                    photo        : this.currentPhoto,
                    id           : this.currentIdItem
                };

                if (this.currentIndexOf > -1) {
                    let updObj = {
                        id_group      : this.currentId,
                        service       : this.currentService,
                        price         : this.currentPrice,
                        about_service : this.currentAboutService,
                        picture       : this.currentPhoto
                };
                    Object.assign(this.desserts[this.currentIndexOf], newObj)
                } else {
                    this.desserts.push(newObj)
                }

                 this.close()
            }
        }
    }
</script>

<style>
    .container{
        background-image: none;
    }
</style>