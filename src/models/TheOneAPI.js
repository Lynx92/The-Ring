import APIHandler from "@/utils/APIHandler";

export default class TheOneAPI {
  static getAllCharacters() {
    return APIHandler.makeRequest("get", "/character");
  }

  static getCharacters(page = 1, limit = 5) {
    return APIHandler.makeRequest(
      "get",
      `/character?page=${page}&limit=${limit}`
    );
  }

  static getCharactersByName(characterName, page = 1, limit = 5) {
    return APIHandler.makeRequest(
      "get",
      `/character?name=${characterName}&page=${page}&limit=${limit}`
    );
  }

  static getQuotes(page = 1, limit = 5) {
    return APIHandler.makeRequest("get", `/quote?page=${page}&limit=${limit}`);
  }

  static getQuotesByCharacter(id, page = 1, limit = 5) {
    return APIHandler.makeRequest(
      "get",
      `/character/${id}/quote?page=${page}&limit=${limit}`
    );
  }

  static getQuotesByMovie(id, page = 1, limit = 5) {
    return APIHandler.makeRequest(
      "get",
      `/movie/${id}/quote?page=${page}&limit=${limit}`
    );
  }

  static getMovies() {
    return APIHandler.makeRequest("get", "/movie/");
  }
}
