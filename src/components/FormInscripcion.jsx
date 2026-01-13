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
import { useState } from "react";
import { createOfertaAcademica } from "../api/ofertaAcademica.api";
import { useOfertaAcademica } from "../hooks/useOfertaAcademica";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnsOfertasAcademicas } from "../api/columnHelper";

export default function FormInscripcion() {
  const { ofertasAcademicas, loadingOfertaAcademica, errorOfertaAcademica } =
    useOfertaAcademica();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const [form, setForm] = useState({
    carrera_id: "",
    jornada_id: "",
    modalidad_id: "",
    tipo_cupo_id: "",
    total_cupos: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOfertaAcademica(form);
      alert("Oferta académica creada correctamente");

      // limpiar formulario
      setForm({
        carrera_id: "",
        jornada_id: "",
        modalidad_id: "",
        tipo_cupo_id: "",
        total_cupos: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al crear la oferta académica");
    }
  };

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
    <form id="oferta-form" className="" onSubmit={handleSubmit}>
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
    </form>
  );
}
