import React, { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../assets/Login.json";
import { Button, Card, Label, Radio, Select, TextInput } from "flowbite-react";

const Periodos = [
  { id: "1", nombre: "2026-1" },
  { id: "2", nombre: "2026-2" },
];
const etiquetas = {
  cedula: "cédula",
  pasaporte: "pasaporte",
};
export default function Register() {
  const [tipoIdentificacion, setTipoIdentificacion] = useState("cédula");

  const handleRadioChange = (e) => {
    setTipoIdentificacion(e.target.value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-3/4 items-center justify-center gap-8 flex-col md:flex-row ">
        {/* LOTTIE */}
        <div className="w-64 md:w-80">
          <Lottie animationData={loginAnimation} loop />
        </div>
        <Card className="w-full max-w-2/3">
          <h1 className="text-center text-2xl font-bold mb-4">
            Creación de cuenta
          </h1>
          <form>
            <div className="mb-2 block">
              <Label className="font-semibold" htmlFor="periodos">
                Periodo
              </Label>
            </div>
            <Select id="periodos" defaultValue="1" required>
              {Periodos.map((periodo) => (
                <option key={periodo.id} value={periodo.id}>
                  {periodo.nombre}
                </option>
              ))}
            </Select>
            <div className="flex max-w-md flex-row gap-8 my-4">
              <div className="block">
                <Label className="font-semibold" htmlFor="countries">
                  Tipo de identificación:
                </Label>
              </div>
              <div className="flex flex-row gap-8">
                <div className="flex items-center gap-2">
                  <Radio
                    id="cedula-identidad"
                    name="tipo-identificacion"
                    value="cedula"
                    defaultChecked
                    onChange={handleRadioChange}
                    checked={tipoIdentificacion === "cedula"}
                  />
                  <Label htmlFor="cedula-identidad">Cédula</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="pasaporte"
                    name="tipo-identificacion"
                    value="pasaporte"
                    checked={tipoIdentificacion === "pasaporte"}
                    onChange={handleRadioChange}
                  />
                  <Label htmlFor="pasaporte">Pasaporte</Label>
                </div>
              </div>
            </div>

            <div className="mb-2 block">
              <Label className="font-semibold" htmlFor="identificacion">
                Identificacion
              </Label>
            </div>
            <TextInput
              id="identificacion"
              type="text"
              placeholder={`Ingrese su ${etiquetas[tipoIdentificacion]}`}
              required
            />
            <Button className="mx-auto mt-4" href="#" color="default">
              Validar {tipoIdentificacion}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
