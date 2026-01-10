import { Link, Outlet } from "react-router-dom";
import Lottie from "lottie-react";
import deniedAccess from "../assets/nodata.json";

const ProtectedRoute = ({ isAllowed, redirectPath = "/login" }) => {
  if (!isAllowed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-64 md:w-80">
          <Lottie animationData={deniedAccess} loop />
        </div>
        <h1 className="text-2xl font-bold text-red-600">Acceso denegado</h1>
        <p className="text-gray-600">
          No tienes permisos para acceder a esta página.
        </p>
        <Link to={redirectPath} className="text-blue-600 underline">
          Ir al Login
        </Link>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
