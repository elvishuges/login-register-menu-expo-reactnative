// eslint-disable-next-line
/* eslint-disable */
var axios = require("axios");

/* Endereços para cada emulador/simulador:
 ** Genymotion:              http://10.0.3.2:3333/
 ** Emulador Android Studio: http://10.0.2.2:3333/
 ** Simulador IOS:           http://localhost:3333/
 */

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
