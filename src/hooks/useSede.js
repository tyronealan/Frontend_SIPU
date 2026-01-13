import { useEffect, useState } from "react";
import { getSedes } from "../api/ofertaAcademica.api";

export function useSede() {
  const [sedes, setSedes] = useState([]);
  const [loadingSedes, setLoadingSedes] = useState(true);
  const [errorSedes, setErrorSedes] = useState(null);

  useEffect(() => {
    getSedes()
      .then(setSedes)
      .catch(setErrorSedes)
      .finally(() => setLoadingSedes(false));
  }, []);

  return { sedes, loadingSedes, errorSedes };
}
