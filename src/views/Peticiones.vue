<template>
  <v-row class="petitions">
    <v-col>
      <PetitionsTable />
    </v-col>
  </v-row>
</template>

<script>
import PetitionsTable from "@/components/PetitionsTable.vue";

export default {
  name: "Peticiones",
  components: {
    PetitionsTable,
  },
};
</script>
