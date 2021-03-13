<template>
  <v-card class="mx-auto">
    <v-card-title>
      <span class="title font-weight-bold">Characters</span>
    </v-card-title>

    <v-card-text class="headline">
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>Filter Tools</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <v-row>
                  <v-select
                    v-model="selectedHeaders"
                    :items="headers"
                    label="Showed Columns"
                    small-chips
                    dense
                    multiple
                    outlined
                    return-object
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index < 6">
                        <span>{{ item.text }}</span>
                      </v-chip>
                      <span v-if="index === 6" class="grey--text caption">
                        (+{{ selectedHeaders.length - 1 }} others)
                      </span>
                    </template>
                  </v-select></v-row
                >
                <v-row>
                  <v-text-field
                    v-model="searchCharacter"
                    label="Search Character"
                    append-icon="mdi-magnify"
                    outlined
                    dense
                    @click:append="getCharactersByName(searchCharacter)"
                    @keyup.enter="getCharactersByName(searchCharacter)"
                  />
                </v-row>
              </v-col>

              <v-col class="ml-2">
                <v-row>
                  <v-select
                    v-model="ColumnWidthSelected"
                    :items="headers"
                    label="Select Column To Change Width"
                    @change="updateWidthSlider($event)"
                    outlined
                    dense
                  />
                </v-row>

                <v-row>
                  <v-slider
                    hint="Column Width Size"
                    v-model="ColumnWidthSelectedValue"
                    min="60"
                    max="500"
                    persistent-hint
                    dense
                  >
                  </v-slider>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-data-table
        :headers="showHeaders"
        :items="characters"
        :items-per-page="totalCharacters"
        :loading="loading"
        class="elevation-1"
        disable-sort
        hide-default-footer
        @click:row="clickOnCharacter($event)"
      >
        <template v-slot:item.wikiUrl="{ item }">
          <a :href="item.wikiUrl" target="_blank">Link</a>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-pagination v-model="page" :length="totalPages" :total-visible="10" />
    </v-card-actions>
  </v-card>
</template>

<script>
import TheOneAPI from "@/models/TheOneAPI";

export default {
  name: "CharactersTable",
  data: () => ({
    headers: [],
    characters: [],
    totalCharacters: 0,
    page: 1,
    totalPages: 0,
    itemsPerPage: 0,
    loading: false,
    hideDialog: false,
    selectedHeaders: [],
    ColumnWidthSelected: null,
    searchCharacter: "",
  }),

  watch: {
    page: {
      handler: function(val, oldVal) {
        if (val != oldVal) this.getCharacters(val);
      },
    },
  },

  async created() {
    await this.getCharacters(this.page);
    this.selectedHeaders = this.headers;
    this.ColumnWidthSelected = this.headers[0].value;
    // console.log("headers", this.headers);
  },

  computed: {
    showHeaders() {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    },

    ColumnWidthSelectedValue: {
      get: function() {
        if (this.ColumnWidthSelected) {
          const item = this.headers.find(
            header => header.value == this.ColumnWidthSelected
          );
          if (item) {
            return item.width;
          } else {
            return "auto";
          }
        } else {
          return 100;
        }
      },
      set: function(newValue) {
        if (this.ColumnWidthSelected) {
          const columnItem = this.headers.find(
            header => header.value == this.ColumnWidthSelected
          );
          columnItem.width = newValue;
        }
      },
    },
  },

  methods: {
    async getCharacters(pageNumber) {
      try {
        this.loading = true;
        const {
          docs,
          total,
          page,
          pages,
          limit,
        } = await TheOneAPI.getCharacters(pageNumber);
        this.characters = docs;
        this.totalCharacters = total;
        this.page = page;
        this.totalPages = pages;
        this.itemsPerPage = limit;

        // console.log("characters", docs);
        // console.log("totalCharacters", total);
        // console.log("page", page);
        // console.log("totalPages", pages);
        // console.log("itemsPerPage", limit);
        if (this.headers.length == 0) {
          const tableHeaders = [];
          Object.getOwnPropertyNames(docs[0]).forEach(header => {
            if (header != "__ob__" && header != "_id")
              tableHeaders.push({
                text: this.capitalize(header),
                value: header,
                align: "center",
                // ...align: ' d-none' }, // ' d-none' hides the column but keeps the search ability
                width: "auto",
              });
          });
          this.headers = tableHeaders;
        }
      } catch (error) {
        console.log(error);
        this.$notification.error("No se han podido recoger datos", {
          title: "Error",
        });
      } finally {
        this.loading = false;
      }
    },

    async getCharactersByName(charactersName) {
      if (!charactersName) return;
      try {
        this.loading = true;
        const {
          docs,
          total,
          page,
          pages,
          limit,
        } = await TheOneAPI.getCharactersByName(charactersName);
        this.characters = docs;
        this.totalCharacters = total;
        this.page = page;
        this.totalPages = pages;
        this.itemsPerPage = limit;

        // console.log("characters", docs);
        // console.log("totalCharacters", total);
        // console.log("page", page);
        // console.log("totalPages", pages);
        // console.log("itemsPerPage", limit);
        if (this.headers.length == 0) {
          const tableHeaders = [];
          Object.getOwnPropertyNames(docs[0]).forEach(header => {
            if (header != "__ob__" && header != "_id")
              tableHeaders.push({
                text: this.capitalize(header),
                value: header,
                align: "center",
                // ...align: ' d-none' }, // ' d-none' hides the column but keeps the search ability
                width: "auto",
              });
          });
          this.headers = tableHeaders;
        }
      } catch (error) {
        console.log(error);
        this.$notification.error("No se han podido recoger datos", {
          title: "Error",
        });
      } finally {
        this.loading = false;
      }
    },

    clickOnCharacter(character) {
      this.$store.commit("setCharacter", character._id);
      this.$notification.success(`Searching quotes of ${character.name}`, {
        title: "Quotes",
      });
    },

    updateWidthSlider(column) {
      // console.log("column", column);
      const columnItem = this.headers.find(header => header.value == column);
      this.ColumnWidthSelectedValue = columnItem.width;
    },

    capitalize(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
  },
};
</script>
<style>
#app
  > div
  > main
  > div
  > div
  > div
  > div
  > div.mx-auto.v-card.v-sheet.theme--light
  > div.v-card__text.headline
  > div.v-data-table.elevation-1.theme--light
  > div
  > table
  > tbody
  > tr
  > td {
  cursor: pointer;
}
</style>
