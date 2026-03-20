import axios from "axios";

const dbApi = axios.create({
    baseURL: "https://www.dragonball-api.com/api",
});
export default dbApi;