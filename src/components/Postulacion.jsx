import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { BsFiletypePdf } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Postulacion() {
  const postulaciones = [
    {
      id: "1",
      carrera: "Ing. Software",
      sede: "Uleam Manta Manabí (Matriz)",
      areas: "Agricultura, Silvicultura, Pesca, Minería, Industria, Comercio",
      notaPostulacion: "649",
    },
  ];

  const exportarPDF = (data) => {
    const doc = new jsPDF();

    // 1. Configurar Título y Encabezado
    doc.setFontSize(18);
    doc.text("COMPROBANTE DE POSTULACIÓN", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Fecha de impresión: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`ID de Postulación: #000${data.id}`, 14, 35);

    // 2. Información Adicional (Lo que querías agregar)
    doc.setFont(undefined, "bold");
    doc.text("Información del Aspirante:", 14, 45);
    doc.setFont(undefined, "normal");
    doc.text("Institución: Universidad Laica Eloy Alfaro de Manabí", 14, 50);
    doc.text("Estado: Proceso de Admisión 2026", 14, 55);

    // 3. Crear la Tabla
    autoTable(doc, {
      startY: 65,
      head: [["Carrera", "Sede", "Nota"]],
      body: [[data.carrera, data.sede, data.notaPostulacion]],
      theme: "striped",
      headStyles: { fillColor: [31, 41, 55] }, // Color gris oscuro de Flowbite
    });

    // 4. Agregar texto al final (Pie de página o notas)
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(9);
    doc.text(
      "Nota: Este documento es un comprobante didáctico de su registro en el sistema.",
      14,
      finalY
    );

    // 5. Descargar el PDF
    doc.save(`Postulacion_${data.carrera.replace(/\s+/g, "_")}.pdf`);
  };
  return (
    <div className="flex flex-col  max-w-5/6 mx-auto">
      <div className="flex gap-3 justify-start my-4">
        <h1 className="font-bold">Datos de postulación</h1>
      </div>

      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Carera</TableHeadCell>
            <TableHeadCell>Sede</TableHeadCell>
            <TableHeadCell>Áreas</TableHeadCell>
            <TableHeadCell>Nota de Postulación</TableHeadCell>
            <TableHeadCell>Acciones</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {postulaciones.length > 0 ? (
            postulaciones.map((item) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.id}
              >
                <TableCell>{item.carrera}</TableCell>
                <TableCell>{item.sede}</TableCell>
                <TableCell>{item.areas}</TableCell>
                <TableCell>{item.notaPostulacion}</TableCell>
                <TableCell className="flex gap-3">
                  <Button
                    size="xs"
                    outline
                    className="gap-2"
                    onClick={() => exportarPDF(item)}
                  >
                    <BsFiletypePdf size={18} />
                    Generar nota de postulacion
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={5} className="text-center">
                <p className="text-xl font-bold">No hay postulaciones</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
