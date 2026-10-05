import axios from "axios";

const API = axios.create({
  baseURL: "https://shop-kart-34rd.vercel.app/api",
});

export default API;