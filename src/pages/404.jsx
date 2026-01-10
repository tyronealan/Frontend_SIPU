import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import lonely404 from "../assets/lonely404.json";
export default function Page404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-64 md:w-80">
        <Lottie animationData={lonely404} loop />
      </div>

      <p className="text-gray-600">No se encuentra la ruta</p>
      <Link to="/home" className="text-blue-600 underline">
        Ir al inicio
      </Link>
    </div>
  );
}
