import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";

import { useOfertaAcademica } from "../hooks/useOfertaAcademica";
import { MdSearch } from "react-icons/md";
import { useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { columnsOfertasAcademicas } from "../api/columnHelper";
import ModalOfertaAcademica from "./ModalOfertaAcademica";

export default function HomeAdmin() {
  // const { data, loading, error } = useUsers();
  const { ofertasAcademicas, loadingOfertaAcademica, errorOfertaAcademica } =
    useOfertaAcademica();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data: ofertasAcademicas,
    columns: columnsOfertasAcademicas,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  if (loadingOfertaAcademica) return <p>Cargando Ofertas Académicas...</p>;
  if (errorOfertaAcademica)
    return <p className="text-red-500">{errorOfertaAcademica}</p>;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center pb-3 justify-between">
        <div className="flex flex-row items-center  gap-10">
          <h1 className="font-bold">Lista de ofertas académicas</h1>
          <ModalOfertaAcademica />
        </div>

        <div className="flex items-center gap-3">
          <p>Buscar:</p>
          <TextInput
            type="search"
            placeholder="carrera, jornada, modalidad"
            icon={MdSearch}
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla */}
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeadCell
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.column.columnDef.header}
                  {
                    { asc: "⬆️", desc: "⬇️" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </TableHeadCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody className="divide-y">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                <TableCell>
                  <Button size="xs">Editar</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnsOfertasAcademicas.length + 1}
                className="text-center"
              >
                <p className="text-xl font-bold">
                  No hay resultados para tu busqueda
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
