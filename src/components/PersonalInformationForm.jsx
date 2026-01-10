import {
  Button,
  Card,
  Label,
  TextInput,
  Avatar,
  Spinner,
} from "flowbite-react";
import { HiCamera } from "react-icons/hi";
import { useState, useEffect } from "react";
import {
  getProfileRequest,
  uploadPhotoRequest,
  updateProfileToken,
} from "../api/users.api";

export default function PersonalInformationForm() {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    foto_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const API_URL = "http://localhost:4000";

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProfileRequest();
        setUser(data);
      } catch (err) {
        console.error("Error al cargar perfil", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // --- MANEJO DE FOTO ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadPhotoRequest(file);

      // Agregamos un "timestamp" para que el navegador crea que es una URL nueva
      // Esto soluciona que no se vea la foto hasta refrescar
      const urlLimpia = response.foto_url;
      const urlConTimestamp = `${urlLimpia}?t=${new Date().getTime()}`;

      setUser((prev) => ({
        ...prev,
        foto_url: urlConTimestamp,
      }));

      alert("¡Foto actualizada!");
    } catch (err) {
      console.error("Detalle del error:", err);
      alert("No se pudo subir la foto. Revisa la consola.");
    } finally {
      setUploading(false);
    }
  };

  // --- GUARDADO DE TEXTO ---
  const handleSave = async () => {
    setSaving(true);
    try {
      const dataToUpdate = {
        nombre: user.nombre,
        apellido: user.apellido,
        cedula: user.cedula,
      };

      await updateProfileToken(dataToUpdate);
      alert("Información personal actualizada");
    } catch (err) {
      console.error("Error actualizando perfil:", err);
      alert("Error al actualizar los datos");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full animate-fade-in">
      <div className="w-full md:w-3/4 lg:w-2/3">
        <Card>
          <h2 className="font-bold text-2xl text-gray-800 dark:text-white">
            Mi Perfil
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Gestiona tu información personal y foto de perfil
          </p>

          <div className="flex flex-col gap-8">
            {/* SECCIÓN FOTO DE PERFIL */}
            <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
              <div className="relative group">
                <Avatar
                  img={
                    user.foto_url
                      ? user.foto_url.startsWith("http")
                        ? user.foto_url
                        : `${API_URL}${user.foto_url}`
                      : undefined
                  }
                  placeholderInitials={user.nombre?.charAt(0).toUpperCase()}
                  size="xl"
                  rounded
                  className="shadow-lg"
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60 rounded-full">
                    <Spinner size="md" />
                  </div>
                )}
              </div>

              <div className="text-center">
                <Label
                  htmlFor="foto"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm"
                >
                  <HiCamera className="w-5 h-5 text-cyan-600" />
                  <span>{uploading ? "Subiendo..." : "Cambiar foto"}</span>
                  <input
                    id="foto"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Label>
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre" value="Nombres" />
                <TextInput
                  id="nombre"
                  value={user.nombre || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido" value="Apellidos" />
                <TextInput
                  id="apellido"
                  value={user.apellido || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="cedula" value="Cédula de Identidad" />
                <TextInput
                  id="cedula"
                  value={user.cedula || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
              <Button
                onClick={handleSave}
                disabled={saving || uploading}
                color="info"
              >
                {saving ? <Spinner size="sm" className="mr-2" /> : null}
                {saving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
