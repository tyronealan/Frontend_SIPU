import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nombre", {
    header: "Nombre",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("apellido", {
    header: "Apellido",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("cedula", {
    header: "Cédula",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("correo", {
    header: "Correo",
    cell: (info) => info.getValue() ?? "—",
  }),
];

export const columnsOfertasAcademicas = [
  columnHelper.accessor("id_oferta", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("carrera", {
    header: "Carrera",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jornada", {
    header: "Jornada",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("modalidad", {
    header: "Modalidad",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tipo_cupo", {
    header: "Tipo cupo",
    cell: (info) => info.getValue() ?? "—",
  }),
  columnHelper.accessor("total_cupos", {
    header: "Total cupos",
    cell: (info) => info.getValue() ?? "—",
  }),
];
