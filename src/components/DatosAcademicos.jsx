import {
  Button,
  Card,
  Label,
  Radio,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { useUserProfile, useDatosAcademicos } from "../hooks/useUser";
import { createDatosAcademicos } from "../api/users.api";
import { useTipoUnidadEducativa } from "../hooks/useTipoCupo";

export default function DatosAcademicos({ user }) {
  const { profile, setProfile, loadingProfile } = useUserProfile();
  const {
    datosAcademicos,
    setDatosAcademicos,
    loadingDatosAcademicos,
    errorDatosAcademicos,
  } = useDatosAcademicos();
  const { tipoUnidadEducativas, loadingTipoUnidadEducativas } =
    useTipoUnidadEducativa();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    usuario_id: user.id,
    titulo_homologado: "",
    unidad_educativa: "",
    tipo_unidad_educativa_id: "",
    calificacion: "",
    cuadro_honor: "No",
    titulo_tercer_nivel: "",
    titulo_cuarto_nivel: "",
    fecha_registro_nacional: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDatosAcademicos(form);
      alert("Datos académicos guardados correctamente");

      // limpiar formulario
      setForm({
        titulo_homologado: "",
        unidad_educativa: "",
        tipo_unidad_educativa_id: "",
        calificacion: "",
        cuadro_honor: "No",
        titulo_tercer_nivel: "",
        titulo_cuarto_nivel: "",
        fecha_registro_nacional: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar los datos académicos");
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
        <Card>
          <h2>Datos Académicos</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="titulo_homologado" value="titulo_homologado">
                  Título homologado
                </Label>
              </div>
              <TextInput
                id="titulo_homologado"
                name="titulo_homologado"
                type="text"
                value={form.titulo_homologado}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="unidad_educativa" value="unidad_educativa">
                  Unidad educativa
                </Label>
              </div>
              <TextInput
                id="unidad_educativa"
                name="unidad_educativa"
                type="text"
                required
                value={form.unidad_educativa}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="tipo_unidad_educativa_id"
                  value="tipo_unidad_educativa_id"
                >
                  Tipo unidad educativa
                </Label>
              </div>
              <Select
                name="tipo_unidad_educativa_id"
                id="tipo_unidad_educativa_id"
                required
                value={form.tipo_unidad_educativa_id}
                onChange={handleChange}
              >
                <option value="">Seleccione su nacionalidad</option>
                {loadingTipoUnidadEducativas && <option>Cargando...</option>}
                {tipoUnidadEducativas.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.nombre_tipo}
                  </option>
                ))}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="calificacion" value="calificacion">
                  Calificación
                </Label>
              </div>
              <TextInput
                id="calificacion"
                name="calificacion"
                type="text"
                required
                value={form.calificacion}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md flex flex-row gap-6 my-6 items-center">
              <Label>Cuadro de honor</Label>

              <div className="flex items-center gap-2">
                <Radio
                  name="cuadro_honor"
                  checked={form.cuadro_honor === "Si    "}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, cuadro_honor: "Si" }))
                  }
                />
                <Label>Si</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="cuadro_honor"
                  checked={form.cuadro_honor === "No"}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, cuadro_honor: "No" }))
                  }
                />
                <Label>No</Label>
              </div>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="titulo_tercer_nivel"
                  value="titulo_tercer_nivel"
                >
                  Título tercer nivel
                </Label>
              </div>
              <TextInput
                id="titulo_tercer_nivel"
                name="titulo_tercer_nivel"
                type="text"
                value={form.titulo_tercer_nivel}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="titulo_cuarto_nivel"
                  value="titulo_cuarto_nivel"
                >
                  Título cuarto nivel
                </Label>
              </div>
              <TextInput
                id="titulo_cuarto_nivel"
                name="titulo_cuarto_nivel"
                type="text"
                value={form.titulo_cuarto_nivel}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="fecha_registro_nacional"
                  value="fecha_registro_nacional"
                >
                  Fecha de registro nacional
                </Label>
              </div>
              <TextInput
                id="fecha_registro_nacional"
                name="fecha_registro_nacional"
                type="date"
                required
                value={form.fecha_registro_nacional}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row items-center mx-auto gap-10">
              <Button type="submit" isProcessing={saving}>
                Guardar datos académicos
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
