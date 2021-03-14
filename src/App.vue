<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover app>
      <v-navigation-drawer permanent expand-on-hover>
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://www.tungstenfashions.com/assets/images/gold-lord-of-the-ring-8mm.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>
                The Ring
              </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <router-link to="/"
            ><v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Home
              </v-list-item-title>
            </v-list-item></router-link
          >
          <router-link to="/peticiones"
            ><v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-playlist-check</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Petitions</v-list-item-title>
            </v-list-item></router-link
          >
        </v-list>
      </v-navigation-drawer>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app,
body {
  background: rgba(128, 128, 128, 0.6);
}

a {
  text-decoration: none;
}
</style>
