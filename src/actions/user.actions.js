import DesafioService from "../services/desafio.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userActions = {
  getAllProjects: async (dispatch) => {
    const requestOptions = {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("userToken")),
      },
    };

    try {
      let rsp = await DesafioService.getAllProjects(requestOptions);
      return rsp.data;
    } catch (error) {
      await AsyncStorage.removeItem("userToken");
      dispatch({ type: "LOGOUT" });
      return [];
    }
  },

  getAllUsers: async (dispatch) => {
    const requestOptions = {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("userToken")),
      },
    };

    try {
      let rsp = await DesafioService.getAllUsers(requestOptions);
      return rsp.data;
    } catch (error) {
      await AsyncStorage.removeItem("userToken");
      dispatch({ type: "LOGOUT" });
      return [];
    }
  },

  getAllHours: async (dispatch) => {
    const requestOptions = {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("userToken")),
      },
    };

    try {
      let rsp = await DesafioService.getAllHours(requestOptions);
      return rsp.data;
    } catch (error) {
      await AsyncStorage.removeItem("userToken");
      dispatch({ type: "LOGOUT" });
      return [];
    }
  },
  login: async (dispatch, payload) => {
    try {
      let rsp = await DesafioService.login(payload);
      if (rsp.data.access_token) {
        await AsyncStorage.setItem("userToken", rsp.data.access_token);
        dispatch({
          type: "LOGIN",
          userToken: rsp.data.access_token, // pick the token
        });
        return "Success";
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
        return "Success";
      })
      .catch((err) => {
        console.log("err.response.status", err.response.status);
        return err.response.status;
      });
  },
};

export default userActions;
