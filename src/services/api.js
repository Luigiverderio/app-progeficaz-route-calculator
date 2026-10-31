import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL

const api = axios.create(
  {
    baseURL:APIURL,
    timeout: 5000,
  }
)

export default api