import { useEffect, useState } from "react";
import {
  getUsers,
  getProfileRequest,
  getDatosAcademicasToken,
} from "../api/users.api";

export function useUsers() {
  const [data, setData] = useState([]);
  const [loadingUsers, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then(setData)
      .catch(setError)
      .finally(() => setLoadingUser(false));
  }, []);

  return { data, loadingUsers, error };
}

export function useUserProfile() {
  const [profile, setProfile] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileRequest();
        setProfile(data);
      } catch (err) {
        setErrorProfile("No se pudo obtener la información completa.");
        console.error(err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchData();
  }, []);

  return { profile, setProfile, loadingProfile, errorProfile };
}
export function useDatosAcademicos() {
  const [datosAcademicos, setDatosAcademicos] = useState([]);
  const [loadingDatosAcademicos, setLoadingDatosAcademicos] = useState(true);
  const [errorDatosAcademicos, setErrorDatosAcademicos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDatosAcademicasToken();
        setDatosAcademicos(data);
      } catch (err) {
        setErrorDatosAcademicos("No se pudo obtener la información completa.");
        console.error(err);
      } finally {
        setLoadingDatosAcademicos(false);
      }
    };

    fetchData();
  }, []);

  return {
    datosAcademicos,
    setDatosAcademicos,
    loadingDatosAcademicos,
    errorDatosAcademicos,
  };
}
