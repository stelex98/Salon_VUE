<template>
  <div>
    <v-navigation-drawer stateless value="true">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Страница мастера</v-list-tile-title>
        </v-list-tile>
        <v-list-group prepend-icon="account_circle" value="true">
          <v-list-tile slot="activator">
            <v-list-tile-title>Меню</v-list-tile-title>
          </v-list-tile>

          <v-list-group no-action sub-group value="true">
            <v-list-tile slot="activator">
              <v-list-tile-title>Мастера</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(admin, i) in admins" :key="i" @click>
              <v-list-tile-title v-text="admin[0]" @click = 'CheckAction($event)'></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group no-action sub-group value="true">
            <v-list-tile slot="activator">
              <v-list-tile-title>Пользователи</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(admin, i) in userAction" :key="i" @click>
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group sub-group no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>Действия с сайтом</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(crud, i) in pageAction" :key="i" @click>
              <v-list-tile-title v-text="crud[0]" @click = 'CheckAction($event)'></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group sub-group no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>Прочее</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(action, i) in anyAction" :key="i" @click>
              <v-list-tile-title v-text="action[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="action[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  data() {
    return {
      admins: [['Просмотр', 'people_outline'], ["Добавить мастера", "add"]],
      pageAction: [["Услуги", "add"], ["Акции", "add"]],
      userAction: [["Просмотр", "people_outline"]],
      anyAction: [["Настройки", "settings"], ["Выход", "exit_to_app"]]
    };
  },
  methods: {
    ...mapActions('user', ['addCurrentAction']),
      CheckAction(event){
        let currentAction = event.target.innerText;
        this.addCurrentAction(currentAction);
          console.log(currentAction);
      }
  }
};
</script>

<style scoped>
</style>