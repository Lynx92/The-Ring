import axios from "axios";

export default class APIHandler {
  static instance = null;

  static async makeRequest(
    method,
    url,
    options = undefined,
    headers = undefined,
    generalOptions = undefined
  ) {
    try {
      let params = undefined;
      let data = undefined;

      if (["post", "patch", "put", "delete"].includes(method)) {
        data = options;
      }

      if (method == "get") {
        params = options;
      }

      const result = await APIHandler.getInstance().request({
        method,
        url,
        params,
        data,
        headers,
        ...generalOptions,
      });

      return result.data;
    } catch (err) {
      let errorMsg =
        err.response?.data?.message || err?.message || "Ha habido un error.";

      throw errorMsg;
    }
  }

  static getInstance() {
    if (APIHandler.instance == null) {
      APIHandler.instance = axios.create({
        baseURL: process.env.VUE_APP_PATH_API,
        headers: {
          // "Content-type": "application/json",
          // Accept: "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_TOKEN_API}`,
        },
      });
    }

    return APIHandler.instance;
  }
}
