import { api } from "./config";

export default {
  //Auth
  login(params) {
    return api.post("/login", params);
  },
  register(params) {
    return api.post("/register", params);
  },
  //Projects
};
