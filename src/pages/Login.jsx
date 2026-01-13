import { Button, Card, Label, TextInput } from "flowbite-react";
import Lottie from "lottie-react";
import loginAnimation from "../assets/Login.json";
import { useState } from "react";
import { loginRequest } from "../api/login.api";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginRequest(cedula, contrasena);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data.usuario));
      setUser(data.usuario);
      navigate("/home");
    } catch (error) {
      alert("Error:" + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="flex w-full max-w-4xl items-center justify-center gap-8
                   flex-col md:flex-row"
      >
        {/* LOTTIE */}
        <div className="w-64 md:w-80">
          <Lottie animationData={loginAnimation} loop />
        </div>

        {/* FORM */}
        <Card className="w-full max-w-sm">
          <h1 className="text-center text-2xl font-bold mb-4">
            Iniciar Sesión
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="cedula" value="cedula">
                Nombre de usuario
              </Label>
              <TextInput
                id="cedula"
                type="text"
                required
                placeholder="Ingrese el nombre de usuario"
                onChange={(e) => setCedula(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="contrasena" value="contrasena">
                Contraseña
              </Label>
              <TextInput
                id="contrasena"
                type="password"
                required
                placeholder="Ingrese la contraseña"
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>

            <Button type="submit" className="mt-2" disabled={loading}>
              {loading ? "Cargando..." : "Entrar"}
            </Button>
            <Link to="/register" className="mx-auto">
              ¿No tienes cuenta? Registrate
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
}
