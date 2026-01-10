import {
  Button,
  List,
  ListItem,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";
import { CheckIcon } from "./Icons";
import { Link } from "react-router-dom";

export default function StargesInfo() {
  return (
    <section id="timeline" className="py-12 px-4">
      <h2 className=" text-center text-2xl font-bold text-gray-900 dark:text-white">
        Etapas
      </h2>
      <p className="mt-2 text-center  text-gray-900 dark:text-white">
        Las fechas pueden estar sujetas a cambios
      </p>

      <div className="mx-auto self-center max-w-2xl mt-10 ">
        <Timeline>
          <TimelineItem>
            <TimelinePoint icon={CheckIcon} />
            <TimelineContent>
              <TimelineTime>
                DEL 27 DE NOVIEMBRE AL 03 DE DICIEMBRE DE 2025
              </TimelineTime>
              <TimelineTitle>Registro nacional (Finalizado)</TimelineTitle>
              <TimelineBody>
                El registro es de carácter obligatorio y se debe realizar en el
                sistema del Ministerio de Educación, Deporte y Cultura.
                <br />
                <span className="font-bold">
                  Recuerda: si no realizas el registro nacional, no podrás
                  continuar con la siguiente etapa.
                </span>
              </TimelineBody>
              <Button
                color="light"
                href="https://www.registrounicoedusup.gob.ec/"
                target="_blank"
              >
                Ir a registro nacional
              </Button>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelinePoint icon={CheckIcon} />
            <TimelineContent>
              <TimelineTime>INDICACIONES</TimelineTime>
              <TimelineTitle>Inscripción Uleam (Próximo)</TimelineTitle>
              <TimelineBody className="space-y-2">
                <List ordered nested>
                  <ListItem className="mb-4">
                    Accede a la {""}
                    <Link
                      className="font-bold text-lime-500 hover:text-lime-800"
                      to="/login"
                    >
                      <span className="">
                        Plataforma Informática del Sistema de Admisión - Uleam
                        (Clic aquí).
                      </span>
                    </Link>
                  </ListItem>
                  <ListItem className="mb-4">
                    Si tienes una cuenta del proceso de admisión con la Uleam,
                    inicia sesión (Clic aquí), de lo contrario primero
                    regístrate (Clic aquí). Al realizar el registro debes tipear
                    tu número de cédula sin el guión.
                  </ListItem>
                  <ListItem className="mb-4">
                    Después de iniciar sesión, deberás inscribirte seleccionando
                    una sola carrera de tu preferencia para la evaluación. Ten
                    en cuenta que puedes cambiar esta elección al momento de
                    postularte, optando por una sola carrera dentro del mismo
                    campo amplio de conocimiento. Para obtener más detalles, te
                    recomendamos consultar el instructivo y prepararte para el
                    examen.
                  </ListItem>
                </List>
              </TimelineBody>
              <Button
                color="light"
                href=" https://admision.uleam.edu.ec/instructivo-inscripcion-2025-2/"
                target="_blank"
              >
                Ver instructivo
              </Button>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </section>
  );
}
