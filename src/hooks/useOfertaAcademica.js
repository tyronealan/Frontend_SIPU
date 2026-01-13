import { useState, useEffect } from "react";
import { getOfertasAcademicas } from "../api/ofertaAcademica.api";

export function useOfertaAcademica() {
  const [ofertasAcademicas, setOfertasAcademicas] = useState([]);
  const [loadingOfertaAcademica, setLoadingOfertaAcademica] = useState(true);
  const [errorOfertaAcademica, setErrorOfertaAcademica] = useState(null);

  useEffect(() => {
    getOfertasAcademicas()
      .then(setOfertasAcademicas)
      .catch(setErrorOfertaAcademica)
      .finally(() => setLoadingOfertaAcademica(false));
  }, []);

  return { ofertasAcademicas, loadingOfertaAcademica, errorOfertaAcademica };
}
