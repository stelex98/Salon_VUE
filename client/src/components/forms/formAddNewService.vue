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
                                        item-text  = 'group'
                                        :label     = "currentService"
                                        @input     = "checkService()"
                                        return-object
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6 v-if = 'showFieldEdit' >
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
                                <v-flex xs12 sm6 md6 v-if = 'showFieldAddService' >
                                      <v-text-field v-model = "currentNewService" label = "Новая услуга"></v-text-field>
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
                <td class = "text-xs-right">{{ props.item.about_service }}</td>
                <td class = "text-xs-right">
                    <v-img :src = 'props.item.picture' style = 'width: 30px; height: 30px;'></v-img>
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
    import requestService from '../../../request/service';

    export default {
        data(){
            return {
                dialog              : false,
                imageName           : '',
                imageFile           : '',
                urlImage            : `https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`,
                dialog              : false,
                showFieldAddService : false,
                showFieldEdit       : false,

                serviceArr: [],
                groupArr: [],
                objService : 0,
                objGroup   : 0,
                headers: [
                    { text : 'Услуга',    value : 'service' },
                    { text : 'Группа',    value : 'group' },
                    { text : 'Цена',      value : 'price' },
                    { text : 'Об услуге', value : 'about_service' },
                    { text : 'Фото',      value : 'picture' },
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
                currentIdGroup      : 0,

                currentNewService   : ''
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

        async created () {
            this.initialize();

            let allService = await requestService.readAllServices();
            this.desserts = allService.data;

            let groupService = await requestService.readGroups();
            this.serviceArr = groupService.data;
        },

        methods: {
            initialize () {
                this.desserts = [
                    {
                        service      : 'СПА',
                        group        : 'СПА-массаж',
                        price        : 25,
                        about_service : 'Клевый массаж',
                        picture        : `https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`,
                        id           : 10
                    },
                    {
                        service      : 'Массаж',
                        group        : 'Массаж тела',
                        price        : 30,
                        about_service : 'Массаж тела очень помогает старым людям',
                        picture        : `https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`,
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
            async checkService(){
                this.currentService = this.objService.group;
                this.currentIdGroup = this.objService. id;

                let newGroup = await requestService.readOneService(this.objService.id); 

            },
            checkGroup(){
                this.currentId    = this.objGroup.id;
                this.currentGroup = this.objGroup.group;
            },
            addNewService(){
                this.dialog         = true;
                this.currentIndexOf = -1;

                this.showFieldEdit       = false;
                this.showFieldAddService = true;

                this.currentService      = '';
                this.currentGroup        = '';
                this.currentPrice        = '';
                this.currentAboutService = '';
                this.currentPhoto        = '';
                this.currentIdItem       = '';
            },
            editItem (item) {
                this.dialog              = true;
                this.showFieldEdit       = true;
                this.showFieldAddService = false;

                this.currentIndexOf = this.desserts.indexOf(item);

                this.currentService      = item.service;
                this.currentGroup        = item.group;
                this.currentPrice        = item.price;
                this.currentAboutService = item.about_service;
                this.currentPhoto        = item.picture;
                this.currentIdItem       = item.id;
            },

            async deleteItem (item) {
                const index = this.desserts.indexOf(item)
                this.desserts.splice(index, 1);
                await requestService.deleteService(item.id);
            },

            close () {
                this.dialog = false
            },

            async save () {
                let newObj = {
                    service        : this.currentNewService,
                    group          : this.currentService,
                    price          : this.currentPrice,
                    about_service  : this.currentAboutService,
                    picture        : this.currentPhoto,
                    id_group       : this.currentIdGroup
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
                    this.desserts.push(newObj);

                    console.log(newObj)

                    let newObjForServer = {
                        service: this.currentNewService,
                        id_group: this.currentIdGroup,
                        price: this.currentPrice,
                        picture: this.currentPhoto,
                        about_service: this.currentAboutService
                    }

                    console.log(newObjForServer)
                    await requestService.addService(newObjForServer);

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