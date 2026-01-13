import { apiFetch } from "./http";

export function getPaises() {
  return apiFetch("python/obtener/pais");
}
export function getProvincias() {
  return apiFetch("python/obtener/provincia");
}
export function getCiudades() {
  return apiFetch("python/obtener/ciudad");
}
export function getEstadoCivil() {
  return apiFetch("python/obtener/estado-civil");
}
export function getSexo() {
  return apiFetch("python/obtener/sexo");
}
export function getNacionalidad() {
  return apiFetch("python/obtener/nacionalidad");
}
export function getTiṕoUnidadEducativa() {
  return apiFetch("python/obtener/tipo-unidad-educativa");
}

export function createDatosDemograficos(data) {
  return apiFetch("python/datos-demograficos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
