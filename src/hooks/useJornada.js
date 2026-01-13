import { useState, useEffect } from "react";
import { getJornadas } from "../api/ofertaAcademica.api";

export function useJornadas() {
  const [jornadas, setJornadas] = useState([]);
  const [loadingJornadas, setLoadingJornadas] = useState(true);
  const [errorJornadas, setErrorJornadas] = useState(null);

  useEffect(() => {
    getJornadas()
      .then(setJornadas)
      .catch(setErrorJornadas)
      .finally(() => setLoadingJornadas(false));
  }, []);

  return { jornadas, loadingJornadas, errorJornadas };
}
