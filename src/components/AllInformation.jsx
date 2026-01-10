import {
  Card,
  Spinner,
  Alert,
  Avatar,
  Badge,
  Button,
  Blockquote,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { getProfileRequest } from "../api/users.api"; // La función que definimos antes
import { TbPointFilled } from "react-icons/tb";
import { HiOutlineArrowRight } from "react-icons/hi";
import { PiStudent } from "react-icons/pi";
import { BsHouse } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";

export default function AllInformation({ onEditClick }) {
  const URL_PHOTO = "http://192.268.0.115:4000/";
  const [fullUser, setFullUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const inicial = fullUser?.nombre?.charAt(0).toUpperCase() || "U";

  const fotoPerfil = fullUser?.foto_url
    ? fullUser.foto_url.startsWith("http")
      ? fullUser.foto_url
      : `${URL_PHOTO}${fullUser.foto_url}`
    : undefined;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileRequest();
        setFullUser(data);
      } catch (err) {
        setError("No se pudo obtener la información completa.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="failure" className="m-4">
        {error}
      </Alert>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Información Detallada del Aspirante
      </h2>
      <div className="w-full md:w-3/4 lg:w-2/3">
        <Card>
          <div className="flex flex-col  md:flex-row items-center  justify-between gap-6">
            <div className=" flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <Avatar
                alt="User settings"
                img={fotoPerfil}
                // placeholderInitials={inicial}
                rounded
                color="failure"
                size="xl"
              />
              <div className="flex flex-col items-center md:items-start">
                <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                  <h5 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {fullUser?.nombre} {fullUser?.apellido}
                  </h5>
                  <Badge color="warning" icon={TbPointFilled}>
                    Pendiente
                  </Badge>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Cedula: 1313364414
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Edad: 25 años
                </span>
              </div>
            </div>
            <Button onClick={onEditClick} className="w-full md:w-auto">
              Editar Información
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex flex-row items-center justify-center gap-3">
            <IoPersonOutline className="size-10" />
            <h5 className="font-bold text-xl">Informacion Personal</h5>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">País</Blockquote>
              <span>{fullUser?.pais} </span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Provincia</Blockquote>
              <span>Manta</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Ciudad</Blockquote>
              <span>Manta</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-center gap-3">
            <IoPersonOutline className="size-10" />
            <h5 className="font-bold text-xl">Informacion demografica</h5>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Nacionalidad</Blockquote>
              <span>{fullUser?.nacionalidad} </span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Fecha de nacimiento</Blockquote>
              <span>{fullUser?.fecha_nacimiento} </span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Estado civil</Blockquote>
              <span>{fullUser?.estado_civil} </span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Sexo</Blockquote>
              <span>{fullUser?.sexo} </span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Autoidentificacion</Blockquote>
              <span>{fullUser?.autoidentificacion} </span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Discapacidad</Blockquote>
              <span>{fullUser?.discapacidad} </span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Pais</Blockquote>
              <span>{fullUser?.pais} </span>
            </div>
             <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Provincia</Blockquote>
              <span>{fullUser?.provincia} </span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Ciudad</Blockquote>
              <span>Manta</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-center gap-3">
            <BsHouse className="size-10" />
            <h5 className="font-bold text-xl">Informacion Domicilio</h5>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">País</Blockquote>
              <span>Manta</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Provincia</Blockquote>
              <span>Manta</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Ciudad</Blockquote>
              <span>Manta</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-center gap-3">
            <PiStudent className="size-10" />
            <h5 className="font-bold text-xl">Informacion Académica</h5>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">País</Blockquote>
              <span>Manta</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Provincia</Blockquote>
              <span>Manta</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Ciudad</Blockquote>
              <span>Manta</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
