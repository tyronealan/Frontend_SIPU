import {
  Button,
  Card,
  Label,
  TextInput,
  Avatar,
  Spinner,
  Select,
  Radio,
} from "flowbite-react";
import { HiCamera } from "react-icons/hi";
import { useState } from "react";
import { uploadPhotoRequest } from "../api/users.api";
import { URL_PHOTO } from "../api/http";
import { useUserProfile } from "../hooks/useUser";
import {
  useCiudad,
  useEstadoCivil,
  useNacionalidad,
  usePais,
  useProvincia,
  useSexo,
} from "../hooks/useDatosDemograficos";
import { createDatosDemograficos } from "../api/demografico.api";

export default function PersonalInformationForm({ user }) {
  const { profile, setProfile, loadingProfile } = useUserProfile();
  const { ciudades, loadingCiudades } = useCiudad();
  const { provincias, loadingProvincias } = useProvincia();
  const { estadoCivil, loadingEstadoCivil } = useEstadoCivil();
  const { paises, loadingPaises } = usePais();
  const { sexo, loadingSexo } = useSexo();
  const { nacionalidades, loadingNacionalidades } = useNacionalidad();
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    usuario_id: user.id,
    nacionalidad_id: "",
    fecha_nacimiento: "",
    estado_civil_id: "",
    sexo_id: "",
    discapacidad: false,
    pais_id: "",
    provincia_id: "",
    ciudad_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- MANEJO DE FOTO ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadPhotoRequest(file);
      const urlLimpia = response.foto_url;
      const urlConTimestamp = `${urlLimpia}?t=${new Date().getTime()}`;

      setProfile((prev) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDatosDemograficos(form);
      alert("Oferta académica creada correctamente");

      // limpiar formulario
      setForm({
        nacionalidad_id: "",
        fecha_nacimiento: "",
        estado_civil_id: "",
        sexo_id: "",
        discapacidad: "",
        pais_id: "",
        provincia_id: "",
        ciudad_id: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar los datos demográficos");
    }
  };
  if (loadingProfile)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full animate-fade-in">
      <div className="w-full md:w-3/4 lg:w-2/3">
        <Card className="">
          <h2 className="font-bold text-2xl text-gray-800 ">Mi Perfil</h2>
          <p className="text-gray-500 text-sm mb-4">
            Gestiona tu información personal y foto de perfil
          </p>

          <div className="flex flex-col md:flex-row gap-10  items-center ">
            {/* SECCIÓN FOTO DE PERFIL */}
            <div className="flex flex-col items-center justify-center gap-4  rounded-xl   ">
              <div className="relative group">
                <Avatar
                  img={
                    profile.foto_url
                      ? profile.foto_url.startsWith("http")
                        ? profile.foto_url
                        : `${URL_PHOTO}${profile.foto_url}`
                      : undefined
                  }
                  placeholderInitials={profile.nombre?.charAt(0).toUpperCase()}
                  size="xl"
                  rounded
                  className="shadow-lg rounded-full"
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center  rounded-full">
                    <Spinner size="md" />
                  </div>
                )}
              </div>

              <div className="text-center">
                <Label
                  htmlFor="foto"
                  className="inline-flex items-center gap-2 px-4 py-2  border border-gray-300  rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm"
                >
                  <HiCamera className="w-5 h-5 " />
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

            {/* Informacion solo lectura */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6  w-10/12">
              <div className="space-y-2">
                <Label htmlFor="nombre" value="Nombres">
                  Nombres:
                </Label>
                <TextInput
                  // id="nombre"
                  value={profile.nombre || ""}
                  // onChange={handleChange}
                  // required
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido" value="Apellidos">
                  Apellidos
                </Label>
                <TextInput value={profile.apellido || ""} disabled />
              </div>
              <div className=" space-y-2">
                <Label htmlFor="cedula" value="Cédula de Identidad">
                  Cédula de Identidad
                </Label>
                <TextInput
                  // id="cedula"
                  value={profile.cedula || ""}
                  // onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <Card>
            <h2>Datos demograficos</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="nacionalidad" value="nacionalidad">
                    Nacionalidad
                  </Label>
                </div>
                <Select
                  name="nacionalidad_id"
                  id="nacionalidad"
                  required
                  value={form.nacionalidad_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccione su nacionalidad</option>
                  {loadingNacionalidades && <option>Cargando...</option>}
                  {nacionalidades.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.nombre_nacionalidad}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="fecha-nacimiento">Fecha de nacimiento</Label>
                </div>
                <TextInput
                  id="fecha-nacimiento"
                  type="date"
                  name="fecha_nacimiento"
                  value={form.fecha_nacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="estado-civil" value="estado-civil">
                    Estado civil
                  </Label>
                </div>
                <Select
                  name="estado_civil_id"
                  id="estado-civil"
                  required
                  value={form.estado_civil_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccione su estado civil</option>
                  {loadingEstadoCivil && <option>Cargando...</option>}
                  {estadoCivil.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nombre_estado_civil}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="max-w-md flex flex-row gap-6 my-6 items-center">
                <Label>Discapacidad</Label>

                <div className="flex items-center gap-2">
                  <Radio
                    name="discapacidad"
                    checked={form.discapacidad === true}
                    onChange={() =>
                      setForm((prev) => ({ ...prev, discapacidad: true }))
                    }
                  />
                  <Label>Sí</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Radio
                    name="discapacidad"
                    checked={form.discapacidad === false}
                    onChange={() =>
                      setForm((prev) => ({ ...prev, discapacidad: false }))
                    }
                  />
                  <Label>No</Label>
                </div>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="sexo" value="sexo">
                    Sexo
                  </Label>
                </div>
                <Select
                  name="sexo_id"
                  id="sexo"
                  required
                  value={form.sexo_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccione su sexo</option>
                  {loadingSexo && <option>Cargando...</option>}
                  {sexo.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.nombre_sexo}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="pais" value="pais">
                    Pais
                  </Label>
                </div>
                <Select
                  name="pais_id"
                  id="pais"
                  required
                  value={form.pais_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccione su pais</option>
                  {loadingPaises && <option>Cargando...</option>}
                  {paises.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre_pais}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="provincia" value="provincia">
                    Provincia
                  </Label>
                </div>
                <Select
                  name="provincia_id"
                  id="provincia"
                  required
                  value={form.provincia_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccione su provincia</option>
                  {loadingProvincias && <option>Cargando...</option>}
                  {provincias.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre_provincia}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="ciudad" value="ciudad">
                    Ciudad
                  </Label>
                </div>
                <Select
                  name="ciudad_id"
                  id="ciudad"
                  required
                  value={form.ciudad_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccione su ciudad</option>
                  {loadingCiudades && <option>Cargando...</option>}
                  {ciudades.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre_ciudad}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-row items-center mx-auto gap-10">
                <Button type="submit" isProcessing={saving}>
                  Guardar datos demográficos
                </Button>
              </div>
            </form>
          </Card>
        </Card>
      </div>
    </div>
  );
}
