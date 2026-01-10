import { TabItem, Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import {
  MdOutlineLocationOn,
  MdOutlineTaskAlt,
  MdOutlineEditNote,
} from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import AllInformation from "./AllInformation";
import { useRef, useState } from "react";
import TabsFormInfo from "./TabsFormInfo";

export default function TabHome({ user }) {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Tabs
      aria-label="Defaul tabs"
      variant="default"
      ref={tabsRef}
      activeTab={activeTab}
      onActiveTabChange={(tab) => setActiveTab(tab)}
    >
      <TabItem active title="General" icon={HiUserCircle}>
        <AllInformation
          user={user}
          onEditClick={() => tabsRef.current?.setActiveTab(1)}
        />
      </TabItem>
      <TabItem title="Información aspirante" icon={FaWpforms}>
        <TabsFormInfo />
      </TabItem>
      <TabItem title="Inscripción" icon={MdOutlineEditNote}>
        Hola soy el tercer tab
      </TabItem>
      <TabItem title="Sede evaluación" icon={MdOutlineLocationOn}>
        Hola soy el cuarto tab
      </TabItem>
      <TabItem title="Postulación" icon={MdOutlineTaskAlt}>
        Hola soy el cuarto tab
      </TabItem>
    </Tabs>
  );
}

// general - contacto domicilio -  inscripcion - sede evaluacion - postulacion
