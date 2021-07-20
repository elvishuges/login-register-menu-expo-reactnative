export const prevState = {
  isLoading: true,
  userToken: null,
  erroLogin: null,
  erroRegister: null,
};

const userReducer = (prevState, action) => {
  console.log("prev state", prevState, action);
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
        userToken: action.token,
        isLoading: false,
      };
    case "AUTH_LOGIN_ERRO":
      return {
        ...prevState,
        erroLogin: action.erro,
      };
    case "AUTH_REGISTER_ERRO":
      return {
        ...prevState,
        erroRegister: action.erro,
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
