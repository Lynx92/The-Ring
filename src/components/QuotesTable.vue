<template>
  <v-card class="my-auto">
    <v-card-title>
      <span class="title font-weight-bold">Quotes</span>
    </v-card-title>

    <v-card-text class="headline">
      <v-row>
        <v-col sm="4">
          <v-select
            v-model="selectedMovie"
            :items="movies"
            label="Filter By Movie"
            outlined
            dense
            small-chips
            clearable
            @change="filterByMovie($event)"
          />
        </v-col>
        <v-col sm="4">
          <v-autocomplete
            v-model="selectedCharacter"
            :items="characters"
            label="Filter By Character"
            outlined
            dense
            small-chips
            clearable
            @change="filterByCharacter($event)"
          />
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="quotes"
        :items-per-page="totalQuotes"
        :loading="loading"
        class="elevation-1"
        @update:sort-desc="doSome($event)"
        @update:sort-by="doSome($event)"
        hide-default-footer
      >
        <template v-slot:item.dialog="props">
          <v-edit-dialog
            :return-value.sync="props.item.dialog"
            @save="editItem(props.item.dialog)"
          >
            <!-- @cancel="cancel"
            @open="open"
            @close="close" -->
            {{ props.item.dialog }}
            <template v-slot:input>
              <v-text-field
                v-model="props.item.dialog"
                label="Edit"
                single-line
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="duplicateItem(item)">
            mdi-plus
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
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
  name: "QuotesTable",
  data: () => ({
    headers: [],
    quotes: [],
    totalQuotes: 0,
    page: 1,
    totalPages: 0,
    itemsPerPage: 0,
    loading: false,
    selectedMovie: null,
    selectedCharacter: null,
  }),

  computed: {
    character() {
      return this.$store.state.selectedCharacter;
    },

    movies() {
      if (!this.$store.state.movies) return;
      const movies = this.$store.state.movies;
      const moviesSelectMenu = [];
      movies.map(movie =>
        moviesSelectMenu.push({ text: movie.name, value: movie.name })
      );
      return moviesSelectMenu;
    },

    characters() {
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
  },

  watch: {
    page: {
      handler: function(val) {
        if (this.selectedMovie) {
          this.filterByMovie(this.selectedMovie, val);
        } else if (this.character) {
          this.getQuotesByCharacter(this.character, val);
        } else {
          this.getQuotes(val);
        }
      },
    },
    character: {
      handler: function(val) {
        if (!val) return this.getQuotes(1);

        this.getQuotesByCharacter(val);

        const characters = this.$store.state.characters;

        const findedCharacter = characters.find(
          character => val == character._id
        );
        // console.log(findedCharacter.name);

        this.selectedCharacter = findedCharacter.name;
      },
    },
  },

  async created() {
    await this.getCharacters();
    await this.getMovies();
    await this.getQuotes(this.page);
    // console.log("headers", this.headers);
  },

  methods: {
    async getQuotes(pageNumber) {
      try {
        this.loading = true;
        const { docs, total, page, pages, limit } = await TheOneAPI.getQuotes(
          pageNumber
        );

        const movies = this.$store.state.movies;
        docs.map(quote => {
          movies.map(movie => {
            if (quote.movie == movie._id) {
              quote.movie = movie.name;
            }
          });
        });

        const characters = this.$store.state.characters;
        docs.map(quote => {
          characters.map(character => {
            if (quote.character == character._id) {
              quote.character = character.name;
            }
          });
        });

        this.quotes = docs;
        this.totalQuotes = total;
        this.page = page;
        this.totalPages = pages;
        this.itemsPerPage = limit;

        // console.log("quotes", docs);
        // console.log("totalQuotes", total);
        // console.log("page", page);
        // console.log("totalPages", pages);
        // console.log("itemsPerPage", limit);
        if (this.headers.length == 0) {
          const tableHeaders = [];
          Object.getOwnPropertyNames(docs[0]).forEach(header => {
            if (header != "__ob__" && header != "_id" && header != "dialog") {
              tableHeaders.push({
                text: this.capitalize(header),
                value: header,
                align: "center",
                width: "auto",
                sortable: false,
              });
            } else if (header == "dialog") {
              tableHeaders.push({
                text: this.capitalize(header),
                value: header,
                align: "center",
                width: "auto",
              });
            }
          });
          const actions = {
            text: "Actions",
            value: "actions",
            align: "center",
            width: "auto",
            sortable: false,
          };
          tableHeaders.push(actions);
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

    async getQuotesByCharacter(id, pageNumber) {
      try {
        this.loading = true;
        const {
          docs,
          total,
          page,
          pages,
          limit,
        } = await TheOneAPI.getQuotesByCharacter(id, pageNumber);

        const movies = this.$store.state.movies;
        docs.map(quote => {
          movies.map(movie => {
            if (quote.movie == movie._id) {
              quote.movie = movie.name;
            }
          });
        });

        const characters = this.$store.state.characters;
        docs.map(quote => {
          characters.map(character => {
            if (quote.character == character._id) {
              quote.character = character.name;
            }
          });
        });

        this.quotes = docs;
        this.totalQuotes = total;
        this.page = page;
        this.totalPages = pages;
        this.itemsPerPage = limit;

        // console.log("quotesXX", docs);
        // console.log("totalQuotesXX", total);
        // console.log("pageXX", page);
        // console.log("totalPagesXX", pages);
        // console.log("itemsPerPageXX", limit);
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
          const actions = {
            text: "Actions",
            value: "actions",
            align: "center",
            width: "auto",
          };
          tableHeaders.push(actions);
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

    async getMovies() {
      if (this.$store.state.movies) return;
      try {
        this.loading = true;
        const { docs } = await TheOneAPI.getMovies();
        this.$store.commit("setMovies", docs);
      } catch (error) {
        console.log(error);
        this.$notification.error("No se han podido recoger datos", {
          title: "Error",
        });
      } finally {
        this.loading = false;
      }
    },

    async getCharacters() {
      if (this.$store.state.characters) return;
      try {
        this.loading = true;
        const { docs } = await TheOneAPI.getAllCharacters();
        this.$store.commit("setCharacters", docs);
      } catch (error) {
        console.log(error);
        this.$notification.error("No se han podido recoger datos", {
          title: "Error",
        });
      } finally {
        this.loading = false;
      }
    },

    capitalize(word) {
      return word[0].toUpperCase() + word.slice(1);
    },

    duplicateItem(item) {
      const petition = {
        type: "duplication",
        date: new Date(),
        petition: item.dialog,
      };

      this.$store.commit("registerPetition", petition);

      this.$notification.success(item.dialog, {
        title: "Duplicación Añadida",
      });
    },

    deleteItem(item) {
      const petition = {
        type: "delete",
        date: new Date(),
        petition: item.dialog,
      };

      this.$store.commit("registerPetition", petition);

      this.$notification.success(item.dialog, {
        title: "Borrado Añadido",
      });
    },

    editItem(item) {
      const petition = {
        type: "edit",
        date: new Date(),
        petition: item,
      };

      this.$store.commit("registerPetition", petition);

      this.$notification.success(item, {
        title: "Edición Añadida",
      });
      // console.log(item);
    },

    async filterByMovie(movieName, pageNumber) {
      try {
        if (!movieName) return this.getQuotes(this.page);
        this.loading = true;

        const movies = this.$store.state.movies;

        const { _id } = movies.find(movie => movie.name == movieName);

        const {
          docs,
          total,
          page,
          pages,
          limit,
        } = await TheOneAPI.getQuotesByMovie(_id, pageNumber);

        docs.map(quote => {
          movies.map(movie => {
            if (quote.movie == movie._id) {
              quote.movie = movie.name;
            }
          });
        });

        const characters = this.$store.state.characters;
        docs.map(quote => {
          characters.map(character => {
            if (quote.character == character._id) {
              quote.character = character.name;
            }
          });
        });

        this.quotes = docs;
        this.totalQuotes = total;
        this.page = page;
        this.totalPages = pages;
        this.itemsPerPage = limit;
      } catch (error) {
        console.log(error);
        this.$notification.error("No se han podido recoger datos", {
          title: "Error",
        });
      } finally {
        this.loading = false;
      }
    },

    filterByCharacter(characterName) {
      if (characterName) {
        const characters = this.$store.state.characters;

        const findedCharacter = characters.find(
          character => characterName == character.name
        );

        this.$store.commit("setCharacter", findedCharacter._id);
      } else {
        this.$store.commit("setCharacter", null);
      }
    },

    doSome(item) {
      console.log(item);
      if (item) {
        if (item[0] === true) {
          console.log("act");
          // this.getQuotes(this.page,)
        } else if (item[0] === false) {
          console.log("des");
        }
      } else {
        console.log('NO');
      }
    },
  },
};
</script>
