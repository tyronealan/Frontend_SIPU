import { Outlet } from "react-router-dom";
import NavBarNoAuth from "../components/NavBarNoAuth";
// import NavBarNoAuth from "../components/NavBarNoAuth";

const PublicLayout = () => {
  return (
    <>
      <NavBarNoAuth />
      <Outlet />
    </>
  );
};

export default PublicLayout;
