import { useState, useEffect } from "react";
import { getModalidades } from "../api/ofertaAcademica.api";

export function useModalidades() {
  const [modalidad, setModalidad] = useState([]);
  const [loadingModalidad, setLoadingModalidad] = useState(true);
  const [errorModalidad, setErrorModalidad] = useState(null);

  useEffect(() => {
    getModalidades()
      .then(setModalidad)
      .catch(setErrorModalidad)
      .finally(() => setLoadingModalidad(false));
  }, []);

  return { modalidad, loadingModalidad, errorModalidad };
}
