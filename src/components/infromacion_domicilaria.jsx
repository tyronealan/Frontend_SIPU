import {
  Button,
  Card,
  Label,
  TextInput,
  Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  getDomicilioRequest,
  updateDomicilioRequest,
} from "../api/domicilio.api";

export default function AddressInformationForm() {
  const [domicilio, setDomicilio] = useState({
    barrio: "",
    calle_principal: "",
    calle_secundaria: "",
    numero_domicilio: "",
    tipo_vivienda: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 CARGAR DATOS
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getDomicilioRequest();
        if (data) {
          setDomicilio(data);
        }
      } catch (err) {
        console.error("Error al cargar domicilio", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔹 MANEJO DE INPUTS
  const handleChange = (e) => {
    setDomicilio({
      ...domicilio,
      [e.target.id]: e.target.value,
    });
  };

  // 🔹 GUARDAR
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDomicilioRequest(domicilio);
      alert("Información domiciliaria actualizada");
    } catch (err) {
      console.error("Error al guardar domicilio", err);
      alert("Error al guardar información domiciliaria");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full animate-fade-in">
      <div className="w-full md:w-3/4 lg:w-2/3">
        <Card>
          <h2 className="font-bold text-2xl text-gray-800 dark:text-white">
            Información Domiciliaria
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Registra o actualiza tu dirección actual
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="barrio" value="Barrio" />
              <TextInput
                id="barrio"
                value={domicilio.barrio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_vivienda" value="Tipo de vivienda" />
              <TextInput
                id="tipo_vivienda"
                placeholder="Casa, Departamento, etc."
                value={domicilio.tipo_vivienda}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calle_principal" value="Calle principal" />
              <TextInput
                id="calle_principal"
                value={domicilio.calle_principal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calle_secundaria" value="Calle secundaria" />
              <TextInput
                id="calle_secundaria"
                value={domicilio.calle_secundaria}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="numero_domicilio" value="Número de domicilio" />
              <TextInput
                id="numero_domicilio"
                value={domicilio.numero_domicilio}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
            <Button
              onClick={handleSave}
              disabled={saving}
              color="info"
            >
              {saving ? <Spinner size="sm" className="mr-2" /> : null}
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
