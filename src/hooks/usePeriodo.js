import { useEffect, useState } from "react";
import { getPeriodos } from "../api/ofertaAcademica.api";

export function usePeriodo() {
  const [periodos, setPeriodos] = useState([]);
  const [loadingPeriodos, setLoadingPeriodos] = useState(true);
  const [errorPeriodos, setErrorPeriodos] = useState(null);

  useEffect(() => {
    getPeriodos()
      .then(setPeriodos)
      .catch(setErrorPeriodos)
      .finally(() => setLoadingPeriodos(false));
  }, []);

  return { periodos, loadingPeriodos, errorPeriodos };
}
