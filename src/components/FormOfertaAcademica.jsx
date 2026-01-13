import { Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useModalidades } from "../hooks/useModalidad";
import { useCarrera } from "../hooks/useCarrera";
import { useJornadas } from "../hooks/useJornada";
import { useTipoCupo } from "../hooks/useTipoCupo";
import { useSede } from "../hooks/useSede";
import { usePeriodo } from "../hooks/usePeriodo";
import { createOfertaAcademica } from "../api/ofertaAcademica.api";

export default function FormOfertaAcademica() {
  const { modalidad, loadingModalidad } = useModalidades();
  const { sedes, loadingSedes } = useSede();
  const { periodos, loadingPeriodos } = usePeriodo();
  const { carrera, loadingCarrera } = useCarrera();
  const { jornadas, loadingJornadas } = useJornadas();
  const { tipoCupo, loadingTipoCupo } = useTipoCupo();
  const [form, setForm] = useState({
    carrera_id: "",
    periodo_id: "",
    sede_id: "",
    jornada_id: "",
    modalidad_id: "",
    tipo_cupo_id: "",
    total_cupos: "",
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
      await createOfertaAcademica(form);
      alert("Oferta académica creada correctamente");

      // limpiar formulario
      setForm({
        carrera_id: "",
        periodo_id: "",
        sede_id: "",
        jornada_id: "",
        modalidad_id: "",
        tipo_cupo_id: "",
        total_cupos: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al crear la oferta académica");
    }
  };
  return (
    <form id="oferta-form" className="" onSubmit={handleSubmit}>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="carrera" value="carrera">
            Carrera
          </Label>
        </div>
        <Select
          name="carrera_id"
          id="carreras"
          required
          value={form.carrera_id}
          onChange={handleChange}
        >
          <option value="">Seleccione una carrera</option>
          {loadingCarrera && <option>Cargando...</option>}
          {carrera.map((c) => (
            <option value={c.id}>{c.nombre_carrera}</option>
          ))}
        </Select>
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="carrera" value="carrera">
            Periodo
          </Label>
        </div>
        <Select
          name="periodo_id"
          id="periodos"
          required
          value={form.periodo_id}
          onChange={handleChange}
        >
          <option value="">Seleccione un periodo</option>
          {loadingPeriodos && <option>Cargando...</option>}
          {periodos.map((p) => (
            <option value={p.id}>{p.nombre_periodo}</option>
          ))}
        </Select>
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="carrera" value="carrera">
            Sede
          </Label>
        </div>
        <Select
          name="sede_id"
          id="sedes"
          required
          value={form.sede_id}
          onChange={handleChange}
        >
          <option value="">Seleccione una sede</option>
          {loadingSedes && <option>Cargando...</option>}
          {sedes.map((s) => (
            <option value={s.id}>{s.nombre_sede}</option>
          ))}
        </Select>
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="jornada" value="jornada">
            Jornada
          </Label>
        </div>
        <Select
          id="jornada"
          required
          name="jornada_id"
          value={form.jornada_id}
          onChange={handleChange}
        >
          <option value="">Seleccione una jornada</option>
          {loadingJornadas && <option>Cargando...</option>}
          {jornadas.map((j) => (
            <option value={j.id}>{j.nombre_jornada}</option>
          ))}
        </Select>
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="modalidad" value="modalidad">
            Modalidad
          </Label>
        </div>
        <Select
          id="modalidad"
          required
          name="modalidad_id"
          value={form.modalidad_id}
          onChange={handleChange}
        >
          <option value="">Seleccione una modalidad</option>
          {loadingModalidad && <option>Cargando...</option>}
          {modalidad.map((m) => (
            <option value={m.id}>{m.nombre}</option>
          ))}
        </Select>
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="tipo-cupo" value="tipo-cupo">
            Tipo cupo
          </Label>
        </div>
        <Select
          id="tipo-cupo"
          required
          name="tipo_cupo_id"
          value={form.tipo_cupo_id}
          onChange={handleChange}
        >
          <option value="">Seleccione un tipo de cupo</option>
          {loadingTipoCupo && <option>Cargando...</option>}
          {tipoCupo.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre_tipo}
            </option>
          ))}
        </Select>
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="tipo-cupo" value="tipo-cupo">
            Total de cupos
          </Label>
        </div>
        <TextInput
          id="total_cupos"
          name="total_cupos"
          type="number"
          required
          value={form.total_cupos}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
