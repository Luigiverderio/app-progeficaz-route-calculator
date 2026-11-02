import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL

const api = axios.create(
  {
    baseURL:APIURL,
    timeout: 5000,
  }
)

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes("/auth/login")) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function calcularRota(origem, destino) {
  const res = await api.post("/rota", { origem, destino });
  return res.data;
}

export default api