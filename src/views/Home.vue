<template>
  <v-row class="home">
    <v-col>
      <CharactersTable />
      <v-spacer class="my-3"/>
      <QuotesTable />
    </v-col>
  </v-row>
</template>

<script>
import CharactersTable from "@/components/CharactersTable.vue";
import QuotesTable from "@/components/QuotesTable.vue";

export default {
  name: "Home",
  components: {
    CharactersTable,
    QuotesTable,
  },
};
</script>
