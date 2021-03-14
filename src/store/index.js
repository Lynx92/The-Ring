import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCharacter: null,
    selectedMovie: null,
    petitions: [],
    movies: null,
    characters: null,
    races: null,
    genders: null,
  },
  mutations: {
    setCharacter(state, payload) {
      state.selectedCharacter = payload;
    },

    setCharacters(state, payload) {
      let genders = [];
      let races = [];

      payload.forEach(element => {
        if (element.race && element.race != "" && element.race != "NaN") {
          races.push(element.race);
        }
        if (element.gender && element.gender != "" && element.gender != "NaN") {
          genders.push(element.gender);
        }
      });

      genders = [...new Set(genders)];
      races = [...new Set(races)];

      state.characters = payload;
      state.genders = genders;
      state.races = races;
    },

    setSelectedRaces(state, payload) {
      state.selectedRaces = payload;
    },

    setMovie(state, payload) {
      state.selectedMovie = payload;
    },

    setMovies(state, payload) {
      state.movies = payload;
    },

    registerPetition(state, payload) {
      state.petitions.unshift(payload);
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
