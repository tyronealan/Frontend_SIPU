import { apiFetch } from "./http";

export const loginRequest = async (cedula, contrasena) => {
  return await apiFetch("python/login", {
    method: "POST",
    body: JSON.stringify({ cedula, contrasena }),
  });
};
