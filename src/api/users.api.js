import { apiFetch } from "./http";

export function getUsers() {
  return apiFetch("python/usuarios");
}

export const getProfileRequest = async () => {
  const token = localStorage.getItem("token");
  return await apiFetch("python/perfil", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Actualizar mi perfil
export const updateProfileToken = async (datosEditados) => {
  const token = localStorage.getItem("token");

  try {
    const response = await apiFetch("python/perfil/actualizar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 2. Enviamos el token para que Flask sepa quiénes somos
        Authorization: `Bearer ${token}`,
      },
      // 3. Enviamos solo los campos que queremos cambiar (o todo el objeto)
      body: JSON.stringify(datosEditados),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Perfil actualizado correctamente");
      console.log("Usuario actualizado:", data.usuario);
    } else {
      alert(data.mensaje || "Error al actualizar");
    }
  } catch (error) {
    console.error("Error en la petición:", error);
  }
};

// Actualizar datos de texto (PUT)
export const updateProfileRequest = async (userId, userData) => {
  const token = localStorage.getItem("token");
  return await apiFetch(`python/usuarios/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Subir solo la foto (POST)
export const uploadPhotoRequest = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("foto", file);

  // apiFetch detectará que 'body' es FormData y no pondrá el Content-Type de JSON
  return await apiFetch("python/perfil/foto", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export function createDatosDomicilio(data) {
  return apiFetch("python/viviendas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export function createServiciosBasicos(data) {
  return apiFetch("python/servicios-basicos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export function createDatosAcademicos(data) {
  return apiFetch("python/datos-academicos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export const getDatosAcademicasToken = async () => {
  const token = localStorage.getItem("token");
  return await apiFetch("python/datos-academicos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
