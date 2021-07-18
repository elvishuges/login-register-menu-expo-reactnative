import AsyncStorage from "@react-native-async-storage/async-storage";

export const prevState = {
  isLoading: true,
  userToken: null,
};

const userReducer = (prevState, action) => {
  switch (action.type) {
    case "RETRIEVE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...prevState,
        userToken: "action.token",
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...prevState,
        userToken: null,
        isLoading: false,
      };
  }
};

export default userReducer;
