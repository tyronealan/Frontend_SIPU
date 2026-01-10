// src/components/NavBarNoAuth.jsx
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
  DarkThemeToggle,
  NavbarToggle,
} from "flowbite-react";
import { ToggleTheme } from "./ThemeToggle";
// import { useUsers } from "../hooks/useUser";
import { HiChevronRight } from "react-icons/hi";

export default function NavBarNoAuth() {
  // const { users } = useUsers();

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <img
          src="https://admision.uleam.edu.ec/wp-content/uploads/2023/07/LOGO-200x61.png"
          alt="Logo Uleam"
        />
        {/* <span className="font-bold text-lg">Sitema de Registro</span> */}
      </NavbarBrand>

      <div className="flex md:order-2 items-center gap-2">
        <ToggleTheme />
        <NavbarToggle />
      </div>

      {/* Collapse / Menú */}
      <NavbarCollapse>
        <Dropdown arrowIcon={true} inline label="Oferta academica">
          {/* {users.map((u) => (
            <DropdownItem key={u.id}>{u.nombre}</DropdownItem>
            // aqui pongo un dropdivider
          ))} */}
          <DropdownItem
            href="https://admision.uleam.edu.ec/manta-oferta-academica-2026-1/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Matriz Manta
          </DropdownItem>
          <DropdownItem
            href="https://admision.uleam.edu.ec/chone-oferta-academica-2026-1/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Extensión Chone
          </DropdownItem>
          <DropdownItem
            href="https://admision.uleam.edu.ec/sucre-oferta-academica-2026-1/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Extensión Sucre
          </DropdownItem>
        </Dropdown>
        <Dropdown arrowIcon={true} inline label="Instructivos">
          <DropdownItem
            href="https://admision.uleam.edu.ec/wp-content/uploads/2025/01/Instructivo_para_la_evaluacion_de_Ingreso_a_la_Uleam-1.pdf"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instructivo evaluación Uleam
          </DropdownItem>
        </Dropdown>

        <Dropdown arrowIcon inline label="Normativa">
          <div className="relative group">
            {/* Item principal */}
            <DropdownItem className="flex justify-between">
              Senescyt
              <HiChevronRight />
            </DropdownItem>

            {/* Submenu */}
            <div className="absolute left-full top-0 hidden group-hover:block min-w-[200px]">
              <div className="rounded-lg border bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <DropdownItem
                  href="https://admision.uleam.edu.ec/wp-content/uploads/2025/03/ACUERDO-Nro.-SENESCYT-SENESCYT-2024-0055-AC.pdf"
                  target="_blank"
                >
                  2025-1
                </DropdownItem>

                <DropdownItem
                  href="https://admision.uleam.edu.ec/wp-content/uploads/2023/08/SENESCYT-SENESCYT-2023-0003-AC.pdf                             "
                  target="_blank"
                >
                  2024-2
                </DropdownItem>
                <DropdownItem
                  // href="https://ejemplo.com/general.pdf"
                  target="_blank"
                >
                  2024-1
                </DropdownItem>
                <DropdownItem
                  // href="https://ejemplo.com/general.pdf"
                  target="_blank"
                >
                  2023-2
                </DropdownItem>
                <DropdownItem
                  // href="https://ejemplo.com/general.pdf"
                  target="_blank"
                >
                  2023-1
                </DropdownItem>
              </div>
            </div>
          </div>
          <div className="relative group">
            {/* Item principal */}
            <DropdownItem className="flex justify-between">
              Uleam
              <HiChevronRight />
            </DropdownItem>

            {/* Submenu */}
            <div className="absolute left-full top-0 hidden group-hover:block min-w-[200px]">
              <div className="rounded-lg border bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <DropdownItem
                  // href="https://ejemplo.com/uleam.pdf"
                  target="_blank"
                >
                  2025-1
                </DropdownItem>

                <DropdownItem
                  // href="https://ejemplo.com/general.pdf"
                  target="_blank"
                >
                  2024-2
                </DropdownItem>
                <DropdownItem
                  // href="https://ejemplo.com/general.pdf"
                  target="_blank"
                >
                  2024-1
                </DropdownItem>
                <DropdownItem
                  // href="https://ejemplo.com/general.pdf"
                  target="_blank"
                >
                  2023-2
                </DropdownItem>
                <DropdownItem
                  // href="https://ejemplo.com/general.pdf"
                  target="_blank"
                >
                  2023-1
                </DropdownItem>
              </div>
            </div>
          </div>
        </Dropdown>
        <NavbarLink
          href="https://admision.uleam.edu.ec/preguntas-2026-1/"
          target="_blank"
        >
          Preguntas frecuentes
        </NavbarLink>
        <Dropdown arrowIcon={true} inline label="Procesos anteriores">
          <DropdownItem
            // href="https://ejemplo.com/uleam.pdf"
            target="_blank"
          >
            2025-1
          </DropdownItem>

          <DropdownItem
            // href="https://ejemplo.com/general.pdf"
            target="_blank"
          >
            2024-2
          </DropdownItem>
          <DropdownItem
            // href="https://ejemplo.com/general.pdf"
            target="_blank"
          >
            2024-1
          </DropdownItem>
          <DropdownItem
            // href="https://ejemplo.com/general.pdf"
            target="_blank"
          >
            2023-2
          </DropdownItem>
          <DropdownItem
            // href="https://ejemplo.com/general.pdf"
            target="_blank"
          >
            2023-1
          </DropdownItem>
        </Dropdown>
      </NavbarCollapse>
    </Navbar>
  );
}
