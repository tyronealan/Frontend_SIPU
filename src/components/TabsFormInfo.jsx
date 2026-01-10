import { TabItem, Tabs } from "flowbite-react";
import { useRef, useState } from "react";
import PersonalInformationForm from "./PersonalInformationForm";

export default function TabsFormInfo() {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  // Estado único para todo el formulario (las 3 partes)
  const [formData, setFormData] = useState({
    foto: null,
    nombre: "",
    email: "",
    // ... todos tus campos aquí
  });
  return (
    <Tabs
      aria-label="Tabs with icons"
      variant="underline"
      className="mx-auto"
      ref={tabsRef}
      activeTab={activeTab}
      onActiveTabChange={(tab) => setActiveTab(tab)}
    >
      <TabItem title="1. Informacion Personal">
        <PersonalInformationForm
          formData={formData}
          setFormData={setFormData}
          onEditClick={() => tabsRef.current?.setActiveTab(1)}
        />
      </TabItem>
      <TabItem title="2. Informacion domiciliaria">
        Informacion Domicilio
      </TabItem>
      <TabItem title="3. Informacion academica">Informacion Academica</TabItem>
    </Tabs>
  );
  
}
