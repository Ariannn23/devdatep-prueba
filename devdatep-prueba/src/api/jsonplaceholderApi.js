import axios from "axios";

const jsonPlaceholderApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

jsonPlaceholderApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error [JSONPlaceholder]:", error.response?.status || error.message);
    return Promise.reject(error);
  }
);

export default jsonPlaceholderApi;
