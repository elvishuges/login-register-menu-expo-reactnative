import DesafioService from "../services/desafio.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authActions = {
  login: async (dispatch, payload) => {
    console.log("payload");
    try {
      let rsp = await DesafioService.login(payload);
      if (rsp.data.access_token) {
        await AsyncStorage.setItem("userToken", rsp.data.access_token);
        dispatch({
          type: "LOGIN",
          userToken: rsp.data.access_token, // pick the token
        });
        return "SUCCESS";
      }
    } catch (error) {
      return "ERRO";
    }
  },
  logout: async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userToken");
      dispatch({ type: "LOGOUT" });
    } catch (e) {
      console.log(e);
    }
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
};

export default authActions;
