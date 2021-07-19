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
  getAllProjects(params) {
    return api.get("/project", params);
  },

  //Users
  getAllUsers(params) {
    return api.get("/user", params);
  },

  // Hours
  getAllHours(params) {
    return api.get("/hours", params);
  },
};
