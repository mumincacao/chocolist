<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title>ちょこっとりすと</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <v-spacer></v-spacer>
      <span>&copy; 2021 - Mumin Cacao</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-table-edit',
          title: 'ぐるーぷ管理',
          to: 'tab',
        },
        {
          icon: 'mdi-view-list',
          title: 'りすと',
          to: '/',
        },
        {
          icon: 'mdi-folder-sync',
          title: 'でーた管理',
          to: 'manager',
        },
        {
          icon: 'mdi-help-circle-outline',
          title: 'へるぷ',
          to: 'help',
        },
      ],
    }
  },
}
</script>
