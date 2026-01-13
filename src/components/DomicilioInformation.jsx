import React, { useState } from "react";
import { useUserProfile } from "../hooks/useUser";
import { createDatosDomicilio } from "../api/users.api";
import { Button, Card, Label, Radio, Spinner, TextInput } from "flowbite-react";

export default function DomicilioInformation({ user }) {
  const { profile, setProfile, loadingProfile } = useUserProfile();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    usuario_id: user.id,
    barrio: "",
    calle_principal: "",
    calle_secundaria: "",
    numero_domicilio: "",
    tipo_vivienda: "Propia",
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
      await createDatosDomicilio(form);
      alert("Datos vivienda guardados correctamente");

      // limpiar formulario
      setForm({
        barrio: "",
        calle_principal: "",
        calle_secundaria: "",
        numero_domicilio: "",
        tipo_vivienda: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar los datos de domicilio");
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
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="barrio" value="barrio">
                  Barrio
                </Label>
              </div>
              <TextInput
                id="barrio"
                name="barrio"
                type="text"
                required
                value={form.barrio}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="calle-principal" value="calle-principal">
                  Calle principal
                </Label>
              </div>
              <TextInput
                id="calle_principal"
                name="calle_principal"
                type="text"
                required
                value={form.calle_principal}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="calle-secundaria" value="calle-secundaria">
                  Calle secundaria
                </Label>
              </div>
              <TextInput
                id="calle_secundaria"
                name="calle_secundaria"
                type="text"
                required
                value={form.calle_secundaria}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="numero-domicilio" value="numero-domicilio">
                  Número de domicilio
                </Label>
              </div>
              <TextInput
                id="numero_domicilio"
                name="numero_domicilio"
                type="text"
                required
                value={form.numero_domicilio}
                onChange={handleChange}
              />
            </div>
            <div className="max-w-md flex flex-row gap-6 my-6 items-center">
              <Label>Tipo Vivienda</Label>

              <div className="flex items-center gap-2">
                <Radio
                  name="discapacidad"
                  checked={form.tipo_vivienda === "Propia"}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, tipo_vivienda: "Propia" }))
                  }
                />
                <Label>Propia</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="discapacidad"
                  checked={form.tipo_vivienda === "Alquiler"}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, tipo_vivienda: "Alquiler" }))
                  }
                />
                <Label>Alquiler</Label>
              </div>
            </div>

            <div className="flex flex-row items-center mx-auto gap-10">
              <Button type="submit" isProcessing={saving}>
                Guardar datos domicilio
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
