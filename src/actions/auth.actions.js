import DesafioService from "../services/desafio.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authActions = {
  login: async (dispatch, payload) => {
    return DesafioService.login(payload)
      .then((rsp) => {
        dispatch({
          type: "LOGIN",
          token: rsp.data.access_token, // pick the token
          userName: payload.username,
        });
        return "OK";
      })
      .catch((err) => {
        return "Error";
      });
  },
  signOut: async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: "LOGOUT" });
  },
  register: (payload) => {
    return DesafioService.register(payload)
      .then((rsp) => {
        return "OK";
      })
      .catch((err) => {
        console.log("Error", err);
        return "Error";
      });
  },
  toggleTheme: () => {
    setIsDarkTheme((isDarkTheme) => !isDarkTheme);
  },
};

export default authActions;
