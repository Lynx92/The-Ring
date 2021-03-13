import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCharacter: null,
    petitions: [],
    movies: null,
    characters: null,
  },
  mutations: {
    setCharacter(state, payload) {
      state.selectedCharacter = payload;
    },
    registerPetition(state, payload) {
      state.petitions.unshift(payload);
    },

    setMovies(state, payload) {
      state.movies = payload;
    },

    setCharacters(state, payload) {
      state.characters = payload;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
