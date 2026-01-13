import { useState } from "react";
import { useUserProfile } from "../hooks/useUser";
import { createServiciosBasicos } from "../api/users.api";
import { Button, Card, Label, Radio, Spinner } from "flowbite-react";

export default function ServiciosBasicosInformation({ user }) {
  const { profile, setProfile, loadingProfile } = useUserProfile();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    usuario_id: user.id,
    agua_potable: true,
    energia_electrica: true,
    alcantarillado: true,
    recoleccion_basura: true,
    internet: true,
  });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setForm((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createServiciosBasicos(form);
      alert("Datos vivienda guardados correctamente");

      // limpiar formulario
      setForm({
        agua_potable: true,
        energia_electrica: true,
        alcantarillado: true,
        recoleccion_basura: true,
        internet: true,
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar los datos de servicios básicos");
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
          <h2>Datos domicilio</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="max-w-md flex flex-row gap-6 my-6 items-center">
              <Label>Agua potable</Label>

              <div className="flex items-center gap-2">
                <Radio
                  name="agua_potable"
                  checked={form.agua_potable === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, agua_potable: true }))
                  }
                />
                <Label>Si</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="agua_potable"
                  checked={form.agua_potable === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, agua_potable: false }))
                  }
                />
                <Label>No</Label>
              </div>
            </div>
            <div className="max-w-md flex flex-row gap-6 my-6 items-center">
              <Label>Energía eléctrica</Label>

              <div className="flex items-center gap-2">
                <Radio
                  name="energia_electrica"
                  checked={form.energia_electrica === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, energia_electrica: true }))
                  }
                />
                <Label>Si</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="energia_electrica"
                  checked={form.energia_electrica === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, energia_electrica: false }))
                  }
                />
                <Label>No</Label>
              </div>
            </div>
            <div className="max-w-md flex flex-row gap-6 my-6 items-center">
              <Label>Alcantarillado</Label>

              <div className="flex items-center gap-2">
                <Radio
                  name="alcantarillado"
                  checked={form.alcantarillado === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, alcantarillado: true }))
                  }
                />
                <Label>Si</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="alcantarillado"
                  checked={form.alcantarillado === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, alcantarillado: false }))
                  }
                />
                <Label>No</Label>
              </div>
            </div>
            <div className="max-w-md flex flex-row gap-6 my-6 items-center">
              <Label>Recolección de basura</Label>

              <div className="flex items-center gap-2">
                <Radio
                  name="recoleccion_basura"
                  checked={form.recoleccion_basura === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, recoleccion_basura: true }))
                  }
                />
                <Label>Si</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="recoleccion_basura"
                  checked={form.recoleccion_basura === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, recoleccion_basura: false }))
                  }
                />
                <Label>No</Label>
              </div>
            </div>
            <div className="max-w-md flex flex-row gap-6 my-6 items-center">
              <Label>Internet</Label>

              <div className="flex items-center gap-2">
                <Radio
                  name="internet"
                  checked={form.internet === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, internet: true }))
                  }
                />
                <Label>Si</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="internet"
                  checked={form.internet === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, internet: false }))
                  }
                />
                <Label>No</Label>
              </div>
            </div>
            <div className="flex flex-row items-center mx-auto gap-10">
              <Button type="submit" isProcessing={saving}>
                Guardar datos servicios básicos
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
