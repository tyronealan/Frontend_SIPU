import { TabItem, Tabs } from "flowbite-react";
import PersonalInformationForm from "./PersonalInformationForm";
import DomicilioInformation from "./DomicilioInformation";
import ServiciosBasicosInformation from "./ServiciosBasicosInformation";
import DatosAcademicos from "./DatosAcademicos";

export default function TabsFormInfo({ user }) {
  // Estado único para todo el formulario (las 3 partes)

  return (
    <Tabs aria-label="Tabs with icons" variant="underline" className="mx-auto">
      <TabItem title="1. Información demográfica">
        <PersonalInformationForm user={user} />
      </TabItem>
      <TabItem title="2. Información domiciliaria">
        <DomicilioInformation user={user} />
      </TabItem>
      <TabItem title="3. Información servicios básicos">
        <ServiciosBasicosInformation user={user} />
      </TabItem>
      <TabItem title="4. Información academica">
        <DatosAcademicos user={user} />
      </TabItem>
    </Tabs>
  );
}
