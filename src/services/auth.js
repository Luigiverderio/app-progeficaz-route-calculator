import api from "./api";

export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("name", data.name);
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getName() {
  return localStorage.getItem("name");
}

export function isLoggedIn() {
  return !!getToken();
}