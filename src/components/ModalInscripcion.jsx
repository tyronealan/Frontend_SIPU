import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import FormInscripcion from "./FormInscripcion";

export default function ModalInscripcion() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Inscribirse</Button>
      <Modal size="7xl" show={openModal}>
        <ModalHeader>Crear Inscripción</ModalHeader>
        <ModalBody>
          <FormInscripcion />
        </ModalBody>
        <ModalFooter>
          {/* <Button>Guardar Inscripcion</Button> */}
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
