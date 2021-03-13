<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover app>
      <v-navigation-drawer permanent expand-on-hover>
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="data:image/png;base64,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"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-title>
                Metiora
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
              <v-list-item-title>Peticiones</v-list-item-title>
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
