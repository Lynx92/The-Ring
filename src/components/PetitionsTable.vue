<template>
  <v-card class="mx-auto my-auto">
    <v-card-title>
      <span class="title font-weight-bold">Peticiones</span>
    </v-card-title>

    <v-card-text class="headline">
      <v-data-table
        :headers="headers"
        :items="petitions"
        :items-per-page="15"
        :loading="loading"
        class="elevation-1"
      >
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Peticiones",
  data: () => ({
    headers: [
      { text: "Petition", align: "center", sortable: false, value: "petition" },
      { text: "Type", align: "center", value: "type" },
      { text: "Date", align: "center", value: "date" },
    ],
    loading: false,
  }),

  computed: {
    petitions() {
      return this.$store.state.petitions;
    },
  },
};
</script>
