import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { ToggleTheme } from "./ThemeToggle";
import { HiChevronRight } from "react-icons/hi";
import { URL_PHOTO } from "../api/http";
import { Link } from "react-router-dom";
import { useUserProfile } from "../hooks/useUser";

export default function MenuAuth({ user }) {
  const { profile } = useUserProfile();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const inicial = user?.nombre?.charAt(0).toUpperCase() || "U";
  const fotoPerfil = profile?.foto_url
    ? profile.foto_url.startsWith("http")
      ? profile.foto_url
      : `${URL_PHOTO}${profile.foto_url}`
    : undefined;

  console.log(profile);

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <img
          src="https://admision.uleam.edu.ec/wp-content/uploads/2023/07/LOGO-200x61.png"
          alt="Logo Uleam"
        />
        {/* <span className="font-bold text-lg">Sitema de Registro</span> */}
      </NavbarBrand>
      <div className="flex md:order-2 items-center ">
        <span className="block text-sm mr-4">
          Hola {profile?.nombre} {profile?.apellido}
        </span>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={fotoPerfil}
              placeholderInitials={inicial}
              rounded
              color="failure"
            />
          }
        >
          <DropdownHeader>Elige el modo de visualización</DropdownHeader>

          <div className="py-2 px-4 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 cursor-pointer">
            <ToggleTheme />
          </div>
          <DropdownDivider />
          <DropdownItem
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user_data");
              window.location.href = "/login";
            }}
          >
            Cerrar sesión
          </DropdownItem>
        </Dropdown>
        {user.rol == "ADMIN" ? <NavbarToggle /> : null}
      </div>

      {user.rol == "ADMIN" ? (
        <NavbarCollapse>
          <NavbarLink to="/home" as={Link}>
            Ofertas Academicas
          </NavbarLink>
          <NavbarLink to="sedes-evaluaciones" as={Link}>
            Sedes Evaluación
          </NavbarLink>
          <NavbarLink to="ofertas-academicas" as={Link}>
            Estudiantes
          </NavbarLink>
        </NavbarCollapse>
      ) : null}
    </Navbar>
  );
}
