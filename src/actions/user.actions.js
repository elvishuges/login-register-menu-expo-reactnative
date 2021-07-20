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
        return "OK";
      }
    } catch (error) {
      dispatch({
        type: "AUTH_LOGIN_ERRO",
        erro: "Usuário ou senha incorretos",
      });
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
  register: (dispatch, payload) => {
    return DesafioService.register(payload)
      .then((rsp) => {
        return "OK";
      })
      .catch((err) => {
        dispatch({
          type: "AUTH_REGISTER_ERRO",
          erro: "Dados invalidos ou email já existe",
        });
        return "ERRO";
      });
  },
};

export default userActions;
