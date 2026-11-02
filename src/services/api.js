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

export async function listarFavoritas() {
  const res = await api.get("/favoritas");
  return res.data.favoritas;
}

export async function salvarFavorita(nome, origem, destino, ultima_duracao_min) {
  const res = await api.post("/favoritas", { nome, origem, destino, ultima_duracao_min });
  return res.data;
}

export async function atualizarFavorita(id, ultima_duracao_min) {
  const res = await api.put(`/favoritas/${id}`, { ultima_duracao_min });
  return res.data;
}

export async function apagarFavorita(id) {
  await api.delete(`/favoritas/${id}`);
}

export default api