import axios from "axios";

const baseURL = "http://127.0.0.1";

const api = axios.create({ baseURL });

export { baseURL, api };
