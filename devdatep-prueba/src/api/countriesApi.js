import axios from "axios";

const countriesApi = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 8000,
});

export default countriesApi;
