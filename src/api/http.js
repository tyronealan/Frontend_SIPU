const API_URL = "http://192.168.0.115:4000/api";

export async function apiFetch(endpoint, options = {}) {
  // 1. Decidir los headers por defecto
  // SI el cuerpo es FormData (una foto), dejamos los headers vacíos
  // SI NO, le ponemos application/json por defecto
  const defaultHeaders =
    options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" };

  const res = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers, // Esto permite que el Authorization se mantenga
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Error en la petición al API");
  }

  return res.json();
}
  