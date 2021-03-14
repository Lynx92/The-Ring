import APIHandler from "@/utils/APIHandler";

export default class TheOneAPI {
  static getAllCharacters() {
    return APIHandler.makeRequest("get", "/character");
  }

  static getCharacters(filters = {}, page = 1, limit = 5) {
    let name = "";
    let race = "";
    let gender = "";

    if (filters.name) {
      name = filters.name;
    }
    if (filters.race) {
      race = filters.race;
    }
    if (filters.gender) {
      gender = filters.gender;
    }

    const url = `/character?name=${name}&race=${race}&gender=${gender}&page=${page}&limit=${limit}`;
    console.log(url);

    return APIHandler.makeRequest(
      "get",
      `/character?name=${name}&race=${race}&gender=${gender}&page=${page}&limit=${limit}`
    );
  }

  static getQuotes(filters = {}, page = 1, limit = 5) {
    let character = "";
    let movie = "";

    if (filters.character) {
      character = filters.character;
    }
    if (filters.movie) {
      movie = filters.movie;
    }
    const url = `/quote?character=${character}&movie=${movie}&page=${page}&limit=${limit}`;
    console.log(url);
    return APIHandler.makeRequest(
      "get",
      `/quote?character=${character}&movie=${movie}&page=${page}&limit=${limit}`
    );
  }

  static getAllMovies() {
    return APIHandler.makeRequest("get", "/movie");
  }
}
