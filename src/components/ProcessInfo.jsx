import { Card } from "flowbite-react";
import React from "react";
import { CalendarIcon, QuestionIcon, InstituteIcon } from "./Icons";

export default function ProcessInfo() {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
        Proceso de admisión 2026-1
      </h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
        <Card
          className="flex flex-col items-center text-center hover:shadow-lg transition"
          href="#timeline"
        >
          <div className="flex flex-col items-center pb-4">
            <CalendarIcon />
          </div>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Cronograma
          </h5>
        </Card>
        <Card
          className="flex flex-col items-center text-center hover:shadow-lg transition"
          href="https://admision.uleam.edu.ec/oferta-academica-2026-1/"
          target="_blank"
        >
          <div className="flex flex-col items-center pb-4">
            <InstituteIcon />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ofertas académicas
          </h2>
        </Card>
        <Card
          className="flex flex-col items-center text-center hover:shadow-lg transition"
          href="https://admision.uleam.edu.ec/preguntas-2026-1/"
          target="_blank"
        >
          <div className="flex flex-col items-center pb-4">
            <QuestionIcon />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Preguntas frecuentes
          </h2>
        </Card>
      </div>
    </section>
  );
}
