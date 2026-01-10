import { Outlet } from "react-router-dom";
import MenuAuth from "../components/MenuAuth";

const MainLayout = ({ user }) => {
  return (
    <>
      <MenuAuth user={user} />
      <Outlet user={user} />
    </>
  );
};

export default MainLayout;
