import { useState, useEffect } from "react";
import { getCarreras } from "../api/ofertaAcademica.api";

export function useCarrera() {
  const [carrera, setCarrera] = useState([]);
  const [loadingCarrera, setLoadingCarrera] = useState(true);
  const [errorCarrera, setErrorCarrera] = useState(null);

  useEffect(() => {
    getCarreras()
      .then(setCarrera)
      .catch(setErrorCarrera)
      .finally(() => setLoadingCarrera(false));
  }, []);

  return { carrera, loadingCarrera, errorCarrera };
}
