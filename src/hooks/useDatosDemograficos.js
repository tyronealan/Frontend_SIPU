import { useState, useEffect } from "react";
import {
  getCiudades,
  getEstadoCivil,
  getNacionalidad,
  getPaises,
  getProvincias,
  getSexo,
} from "../api/demografico.api";

export function useCiudad() {
  const [ciudades, setCiudades] = useState([]);
  const [loadingCiudades, setLoadingCiudades] = useState(true);
  const [errorCiudades, setErrorCiudades] = useState(null);

  useEffect(() => {
    getCiudades()
      .then(setCiudades)
      .catch(setErrorCiudades)
      .finally(() => setLoadingCiudades(false));
  }, []);

  return { ciudades, loadingCiudades, errorCiudades };
}
export function usePais() {
  const [paises, setPaises] = useState([]);
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [errorPaises, setErrorPaises] = useState(null);

  useEffect(() => {
    getPaises()
      .then(setPaises)
      .catch(setErrorPaises)
      .finally(() => setLoadingPaises(false));
  }, []);

  return { paises, loadingPaises, errorPaises };
}

export function useProvincia() {
  const [provincias, setProvincias] = useState([]);
  const [loadingProvincias, setLoadingProvincias] = useState(true);
  const [errorProvincias, setErrorProvincias] = useState(null);

  useEffect(() => {
    getProvincias()
      .then(setProvincias)
      .catch(setErrorProvincias)
      .finally(() => setLoadingProvincias(false));
  }, []);

  return { provincias, loadingProvincias, errorProvincias };
}

export function useEstadoCivil() {
  const [estadoCivil, setEstadoCivil] = useState([]);
  const [loadingEstadoCivil, setLoadingEstadoCivil] = useState(true);
  const [errorEstadoCivil, setErrorEstadoCivil] = useState(null);

  useEffect(() => {
    getEstadoCivil()
      .then(setEstadoCivil)
      .catch(setErrorEstadoCivil)
      .finally(() => setLoadingEstadoCivil(false));
  }, []);

  return { estadoCivil, loadingEstadoCivil, errorEstadoCivil };
}

export function useSexo() {
  const [sexo, setSexo] = useState([]);
  const [loadingSexo, setLoadingSexo] = useState(true);
  const [errorSexo, setErrorSexo] = useState(null);

  useEffect(() => {
    getSexo()
      .then(setSexo)
      .catch(setErrorSexo)
      .finally(() => setLoadingSexo(false));
  }, []);

  return { sexo, loadingSexo, errorSexo };
}

export function useNacionalidad() {
  const [nacionalidades, setNacionalidades] = useState([]);
  const [loadingNacionalidades, setLoadingNacionalidades] = useState(true);
  const [errorNacionalidades, setErrorNacionalidades] = useState(null);

  useEffect(() => {
    getNacionalidad()
      .then(setNacionalidades)
      .catch(setErrorNacionalidades)
      .finally(() => setLoadingNacionalidades(false));
  }, []);

  return { nacionalidades, loadingNacionalidades, errorNacionalidades };
}
