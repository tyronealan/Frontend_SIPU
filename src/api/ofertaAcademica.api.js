import { apiFetch } from "./http";

export function getModalidades() {
  return apiFetch("python/obtener/modalidades");
}

export function getCarreras() {
  return apiFetch("python/obtener/carreras");
}

export function getJornadas() {
  return apiFetch("python/obtener/jornadas");
}
export function getTiposCupo() {
  return apiFetch("python/obtener/tipo-cupo");
}
export function getPeriodos() {
  return apiFetch("python/obtener/periodos");
}
export function getSedes() {
  return apiFetch("python/obtener/sedes");
}

export function createOfertaAcademica(data) {
  return apiFetch("python/oferta-academica", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export function getOfertasAcademicas() {
  return apiFetch("python/obtener/oferta-academica");
}
