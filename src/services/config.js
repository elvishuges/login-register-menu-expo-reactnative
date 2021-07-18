// eslint-disable-next-line
/* eslint-disable */
var axios = require("axios");
import AsyncStorage from "@react-native-async-storage/async-storage";
export const desafioBaseURL = "https://api-desafio-blockub.herokuapp.com/";

export const api = axios.create({
  baseURL: desafioBaseURL,
  /* other custom settings */
  headers: {
    Authorization: "Bearer ",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
