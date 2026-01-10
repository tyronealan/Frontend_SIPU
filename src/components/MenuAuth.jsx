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
import { useEffect, useState } from "react";
import { getProfileRequest } from "../api/users.api";

export default function MenuAuth({ user }) {
  const URL_PHOTO = "http://localhost:4000/";
  const [fullUser, setFullUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const inicial = user?.nombre?.charAt(0).toUpperCase() || "U";
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

  // console.log(usuario.foto_url);

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
          Hola {fullUser?.nombre} {fullUser?.apellido}
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
      </div>
    </Navbar>
  );
}
