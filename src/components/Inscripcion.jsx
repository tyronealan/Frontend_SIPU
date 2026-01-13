import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FaRegEdit } from "react-icons/fa";
import ModalInscripcion from "./ModalInscripcion";

export default function Inscripcion() {
  const inscripciones = [
    // {
    //   id: "1",
    //   numeroIntento: "1",
    //   periodo: "2024-1",
    //   carrera: "Ing. Software",
    //   sede: "Uleam Manta Manabí (Matriz)",
    //   creado: "06/07/2024 11:00:00",
    //   creadoPor: "1313364414",
    //   modificado: "2023-07-01 09:00:00",
    //   modificadoPor: "1313364414",
    // },
  ];
  return (
    <div className="flex flex-col  max-w-5/6 mx-auto">
      <div className="flex gap-3  my-4 items-center justify-between">
        <h1 className="font-bold">Datos de inscripción</h1>
        {inscripciones.length > 0 ? null : <ModalInscripcion />}
      </div>

      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Número de Intento</TableHeadCell>
            <TableHeadCell>Perido</TableHeadCell>
            <TableHeadCell>Carrera</TableHeadCell>
            <TableHeadCell>Sede</TableHeadCell>
            <TableHeadCell>Creado</TableHeadCell>
            <TableHeadCell>Creado Por</TableHeadCell>
            <TableHeadCell>Modificado</TableHeadCell>
            <TableHeadCell>Modificado Por</TableHeadCell>
            <TableHeadCell>Acciones</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {inscripciones.length > 0 ? (
            inscripciones.map((item) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.id}
              >
                <TableCell>{item.numeroIntento}</TableCell>
                <TableCell>{item.periodo}</TableCell>
                <TableCell>{item.carrera}</TableCell>
                <TableCell>{item.sede}</TableCell>
                <TableCell>{item.creado}</TableCell>
                <TableCell>{item.creadoPor}</TableCell>
                <TableCell>{item.modificado}</TableCell>
                <TableCell>{item.modificadoPor}</TableCell>
                <TableCell className="flex gap-3">
                  <Button
                    size="xs"
                    outline
                    className="gap-2"
                    // onClick={() => exportarPDF(item)}
                  >
                    <FaRegEdit size={18} />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={9} className="text-center">
                <p className="text-xl font-bold">No hay inscripciones</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
