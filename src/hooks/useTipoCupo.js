import { useState, useEffect } from "react";
import { getTiposCupo } from "../api/ofertaAcademica.api";
import { getTiṕoUnidadEducativa } from "../api/demografico.api";
export function useTipoCupo() {
  const [tipoCupo, setTipoCupo] = useState([]);
  const [loadingTipoCupo, setLoadingTipoCupo] = useState(true);
  const [errorTipoCupo, setErrorTipoCupo] = useState(null);

  useEffect(() => {
    getTiposCupo()
      .then(setTipoCupo)
      .catch(setErrorTipoCupo)
      .finally(() => setLoadingTipoCupo(false));
  }, []);

  return { tipoCupo, loadingTipoCupo, errorTipoCupo };
}
export function useTipoUnidadEducativa() {
  const [tipoUnidadEducativas, setTipoUnidadEducativas] = useState([]);
  const [loadingTipoUnidadEducativas, setLoadingTipoUnidadEducativas] =
    useState(true);
  const [errorTipoUnidadEducativas, setErrorTipoUnidadEducativas] =
    useState(null);

  useEffect(() => {
    getTiṕoUnidadEducativa()
      .then(setTipoUnidadEducativas)
      .catch(setErrorTipoUnidadEducativas)
      .finally(() => setLoadingTipoUnidadEducativas(false));
  }, []);

  return {
    tipoUnidadEducativas,
    loadingTipoUnidadEducativas,
    errorTipoUnidadEducativas,
  };
}
