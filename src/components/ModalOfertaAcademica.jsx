import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import FormOfertaAcademica from "./FormOfertaAcademica";

export default function ModalOfertaAcademica() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Nueva oferta académica</Button>
      <Modal show={openModal}>
        <ModalHeader>Crear oferta académica</ModalHeader>
        <ModalBody>
          <FormOfertaAcademica />
        </ModalBody>
        <ModalFooter className="flex flex-row justify-between">
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Cerrar
          </Button>
          <Button type="submit" form="oferta-form">
            Guardar oferta académica
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
