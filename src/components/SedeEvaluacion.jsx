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

export default function SedeEvaluacion() {
  const evaluaciones = [
    {
      id: "1",
      sede: "Matriz Manta",
      bloque: "bloque 10",
      sala: "sala 18",
      fecha: "25/07/2025",
      hora: "08:00:00",
      fecha_primera_generacion: "2024-01-01 23:59:59",
      activo: "Si",
    },
  ];

  const exportarComprobante = (data) => {
    const doc = new jsPDF();

    // --- ENCABEZADO ---
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 40, "F"); // Fondo gris para el header

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text("COMPROBANTE DE ASIGNACIÓN DE SEDE", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text("UNIVERSIDAD LAICA ELOY ALFARO DE MANABÍ", 105, 28, {
      align: "center",
    });
    doc.text("PROCESO DE ADMISIÓN 2026", 105, 34, { align: "center" });

    // --- DATOS DEL ASPIRANTE (Simulados) ---
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text("DATOS DE LA SEDE:", 14, 50);
    doc.line(14, 52, 60, 52); // Línea decorativa

    // --- TABLA DE DETALLES ---
    autoTable(doc, {
      startY: 58,
      head: [["SEDE / INSTITUCIÓN", "BLOQUE", "SALA / AULA"]],
      body: [[data.sede, data.bloque, data.sala]],
      headStyles: { fillColor: [44, 62, 80] }, // Azul oscuro formal
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 5,
      head: [["FECHA DE EVALUACIÓN", "HORA DE INGRESO", "ESTADO"]],
      body: [[data.fecha, data.hora, "ASIGNADO"]],
      headStyles: { fillColor: [44, 62, 80] },
    });

    // --- SECCIÓN DE INSTRUCCIONES ---
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setDrawColor(200, 0, 0); // Bordes rojos para importancia
    doc.rect(14, finalY, 182, 35);

    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.setTextColor(200, 0, 0);
    doc.text("INSTRUCCIONES IMPORTANTES:", 18, finalY + 7);

    doc.setFont(undefined, "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(
      "1. Presentar este comprobante impreso y su Cédula de Identidad original.",
      18,
      finalY + 15
    );
    doc.text(
      "2. Estar presente 30 minutos antes de la hora señalada.",
      18,
      finalY + 22
    );
    doc.text(
      "3. Prohibido el ingreso de dispositivos electrónicos (celulares, smartwatches).",
      18,
      finalY + 29
    );

    // --- ESPACIO PARA FIRMA ---
    doc.line(70, 160, 140, 160);
    doc.setFontSize(9);
    doc.text("Firma del Aspirante", 105, 165, { align: "center" });

    // --- PIE DE PÁGINA ---
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 285);
    doc.text("Documento generado por el Sistema de Admisión ULEAM", 196, 285, {
      align: "right",
    });

    // GUARDAR
    doc.save(`Comprobante_Sede_${data.fecha.replace(/\//g, "-")}.pdf`);
  };

  return (
    <div className="flex flex-col  max-w-5/6 mx-auto">
      <div className="flex gap-3 justify-start my-4">
        <h1 className="font-bold">Datos de sede de evaluación</h1>
      </div>

      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Sede</TableHeadCell>
            <TableHeadCell>Bloque</TableHeadCell>
            <TableHeadCell>Sala</TableHeadCell>
            <TableHeadCell>Fecha</TableHeadCell>
            <TableHeadCell>Hora</TableHeadCell>
            <TableHeadCell>Fecha de primera generación</TableHeadCell>
            <TableHeadCell>Activo</TableHeadCell>
            <TableHeadCell>Acciones</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {evaluaciones.length > 0 ? (
            evaluaciones.map((item) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.id}
              >
                <TableCell>{item.sede}</TableCell>
                <TableCell>{item.bloque}</TableCell>
                <TableCell>{item.sala}</TableCell>
                <TableCell>{item.fecha}</TableCell>
                <TableCell>{item.hora}</TableCell>
                <TableCell>{item.fecha_primera_generacion}</TableCell>
                <TableCell>{item.activo}</TableCell>
                <TableCell className="flex gap-3">
                  <Button
                    size="xs"
                    outline
                    className="gap-2"
                    onClick={() => exportarComprobante(item)}
                  >
                    <BsFiletypePdf size={18} />
                    Generar comprobante
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={8} className="text-center">
                <p className="text-xl font-bold">No hay evaluaciones</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
