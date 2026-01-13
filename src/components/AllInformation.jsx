import {
  Card,
  Spinner,
  Alert,
  Avatar,
  Badge,
  Button,
  Blockquote,
} from "flowbite-react";
import { TbPointFilled } from "react-icons/tb";
import { HiOutlineArrowRight } from "react-icons/hi";
import { PiStudent } from "react-icons/pi";
import { BsHouse } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { URL_PHOTO } from "../api/http";
import { useUserProfile } from "../hooks/useUser";

export default function AllInformation({ onEditClick }) {
  const { profile, loadingProfile, errorProfile } = useUserProfile();
  // const inicial = fullUser?.nombre?.charAt(0).toUpperCase() || "U";

  const fotoPerfil = profile?.foto_url
    ? profile.foto_url.startsWith("http")
      ? profile.foto_url
      : `${URL_PHOTO}${profile.foto_url}`
    : undefined;

  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center p-10">
        <Spinner size="xl" />
      </div>
    );
  }

  if (errorProfile) {
    return (
      <Alert color="failure" className="m-4">
        {errorProfile}
      </Alert>
    );
  }

  const calcularEdad = (fechaString) => {
    if (!fechaString) return "";

    const hoy = new Date();
    const fechaNacimiento = new Date(fechaString);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    // Si el mes actual es menor al de nacimiento, o es el mismo mes pero
    // el día actual es menor al de nacimiento, aún no cumple años.
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    return edad;
  };
  const edad = calcularEdad(profile.fecha_nacimiento);
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
                    {profile?.nombre} {profile?.apellido}
                  </h5>
                  <Badge color="warning" icon={TbPointFilled}>
                    Pendiente
                  </Badge>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Cedula: {profile?.cedula}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Edad: {edad} años
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
              <Blockquote className="text-base">Nombre</Blockquote>
              <span>{profile?.nombre}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Apellido</Blockquote>
              <span>{profile?.apellido}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Cedula</Blockquote>
              <span>{profile?.cedula}</span>
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
              <Blockquote className="text-base">Barrio</Blockquote>
              <span>{profile?.barrio}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Calle principal</Blockquote>
              <span>{profile?.calle_principal}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Calle secundaria</Blockquote>
              <span>{profile?.calle_secundaria}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Numero de domicilio</Blockquote>
              <span>{profile?.numero_domicilio}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Tipo de vivienda</Blockquote>
              <span>{profile?.tipo_vivienda}</span>
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
              <Blockquote className="text-base">Titulo homologado</Blockquote>
              <span>{profile?.titulo_homologado}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Unidad educativa</Blockquote>
              <span>{profile?.unidad_educativa}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Tipo de unidad educativa</Blockquote>
              <span>{profile?.tipo_unidad_educativa}</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-center gap-3">
            <PiStudent className="size-10" />
            <h5 className="font-bold text-xl">Servicios básicos</h5>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Agua potable</Blockquote>
              <span>{profile?.agua_potable == true ? "Si": "No"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Energía electrica</Blockquote>
              <span>{profile?.energia_electrica == true ? "Si": "No"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Alcantarillado</Blockquote>
              <span>{profile?.alcantarillado == true ? "Si": "No"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Recoleccion de basura</Blockquote>
              <span>{profile?.recoleccion_basura == true ? "Si": "No"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Internet</Blockquote>
              <span>{profile?.internet == true ? "Si": "No"}</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-center gap-3">
            <PiStudent className="size-10" />
            <h5 className="font-bold text-xl">Información demográfica</h5>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Nacionalidad</Blockquote>
              <span>{profile?.nacionalidad}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Fecha de nacimiento</Blockquote>
              <span>
                {profile?.fecha_nacimiento
                ? new Date (profile.fecha_nacimiento).toLocaleDateString("es-EC")
                : ""}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Estado civil</Blockquote>
              <span>{profile?.estado_civil}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Sexo</Blockquote>
              <span>{profile?.sexo}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Discapacidad</Blockquote>
              <span>{profile?.discapacidad == false? "No": "Si"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">País</Blockquote>
              <span>{profile?.nombre_pais}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Provincia</Blockquote>
              <span>{profile?.nombre_provincia}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Blockquote className="text-base">Ciudad</Blockquote>
              <span>{profile?.nombre_ciudad}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
