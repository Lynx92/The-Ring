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
                      <v-chip v-if="index < 5">
                        <span>{{ item.text }}</span>
                      </v-chip>
                      <span v-if="index === 5" class="grey--text caption">
                        (+{{ selectedHeaders.length - 1 }} others)
                      </span>
                    </template>
                  </v-select></v-row
                >
                <v-row>
                  <v-autocomplete
                    v-model="searchCharacter"
                    :items="charactersItems"
                    label="Search Character"
                    append-icon="mdi-magnify"
                    outlined
                    dense
                    small-chips
                    clearable
                    @click:append="getCharacters({ name: searchCharacter })"
                    @change="getCharacters({ name: searchCharacter })"
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
              <v-col class="ml-2">
                <v-row>
                  <v-select
                    v-model="raceFilter"
                    :items="racesItems"
                    label="Filter By Races"
                    @change="updateRaceFilter()"
                    small-chips
                    dense
                    multiple
                    outlined
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index < 5">
                        <span>{{ item.text }}</span>
                      </v-chip>
                      <span v-if="index === 5" class="grey--text caption">
                        (+{{ raceFilter.length - 1 }} others)
                      </span>
                    </template>

                    <template v-slot:prepend-item>
                      <v-list-item ripple @click="toggle">
                        <v-list-item-action>
                          <v-icon
                            :color="
                              raceFilter.length > 0 ? 'indigo darken-4' : ''
                            "
                          >
                            {{ icon }}
                          </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title>
                            Select All
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                  </v-select>
                </v-row>

                <v-row>
                  <v-select
                    v-model="genderFilter"
                    :items="genderItems"
                    label="Filter By Gender"
                    @change="updateGenderFilter()"
                    outlined
                    dense
                  />
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
    genderFilter: [],
    raceFilter: [],
  }),

  watch: {
    page: {
      handler: function(val) {
        this.getCharacters({ race: this.raceFilter?.join(","), gender: this.genderFilter}, val);
      },
    },
  },

  async created() {
    await this.getCharacters();
    this.selectedHeaders = this.headers;
    this.ColumnWidthSelected = this.headers[0].value;
    this.raceFilter = this.$store.state.races;
    // console.log("headers", this.headers);
  },

  computed: {
    showHeaders() {
      return this.headers.filter(header =>
        this.selectedHeaders.includes(header)
      );
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

    charactersItems() {
      if (!this.$store.state.characters) return;
      const characters = this.$store.state.characters;
      const charactersSelectMenu = [];
      characters.map(character =>
        charactersSelectMenu.push({
          text: character.name,
          value: character.name,
        })
      );
      return charactersSelectMenu;
    },

    racesItems() {
      if (!this.$store.state.races) return;
      const races = this.$store.state.races;
      const racesSelectMenu = [];
      races.map(race =>
        racesSelectMenu.push({
          text: race,
          value: race,
        })
      );
      return racesSelectMenu;
    },

    genderItems() {
      if (!this.$store.state.genders) return;
      const genders = this.$store.state.genders;
      const racesSelectMenu = [];
      genders.map(gender =>
        racesSelectMenu.push({
          text: gender,
          value: gender,
        })
      );
      return racesSelectMenu;
    },

    likesAllFruit() {
      return this.raceFilter.length === this.racesItems.length;
    },

    likesSomeFruit() {
      return this.raceFilter.length > 0 && !this.likesAllFruit;
    },

    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },

  methods: {
    async getCharacters(filters, pageNumber) {
      try {
        this.loading = true;
        const {
          docs,
          total,
          page,
          pages,
          limit,
        } = await TheOneAPI.getCharacters(filters, pageNumber);
        this.characters = docs;
        this.totalCharacters = total;
        this.page = page;
        this.totalPages = pages;
        this.itemsPerPage = limit;

        if (this.headers.length == 0) {
          const tableHeaders = [];
          Object.getOwnPropertyNames(docs[0]).forEach(header => {
            if (header != "__ob__" && header != "_id")
              tableHeaders.push({
                text: this.capitalize(header),
                value: header,
                align: "center",
                width: "auto",
              });
          });
          this.headers = tableHeaders;
        }
      } catch (error) {
        console.error(error);
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

    updateRaceFilter() {
      // console.log(this.raceFilter.join(","));
      const races = this.raceFilter.join(",");
      this.getCharacters({ race: races, gender: this.genderFilter });
    },

    updateGenderFilter() {
      // console.log(this.raceFilter.join(","));
      const gender = this.genderFilter;
      const races = this.raceFilter.join(",");
      this.getCharacters({ gender: gender, race: races });
    },

    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.raceFilter = ["undefined"];
        } else {
          this.raceFilter = this.racesItems.map(item => item.value);
        }
        this.updateRaceFilter();
      });
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
