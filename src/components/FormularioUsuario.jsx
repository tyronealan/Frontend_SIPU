import { useState } from "react";
import { Button } from "flowbite-react";

function FormularioUsuario({ onUsuarioCreado }) {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    contrasena: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Enviando...");

    try {
      const respuesta = await fetch(
        "http://localhost:4000/api/python/usuarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indispensable para que Flask reciba el JSON
          },
          body: JSON.stringify(formData),
        }
      );

      if (respuesta.ok) {
        const nuevoUsuario = await respuesta.json();
        setMensaje("✅ Usuario creado con éxito");

        // Limpiar formulario
        setFormData({ nombre: "", apellido: "", cedula: "", contrasena: "" });

        // Avisar al componente padre para que recargue la lista
        if (onUsuarioCreado) onUsuarioCreado(nuevoUsuario);
      } else {
        setMensaje("❌ Error al crear usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        marginBottom: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>Registrar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="cedula"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="contrasena"
            type="password"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        {/* <button type="submit" style={buttonStyle}>
          Guardar Usuario
        </button> */}
        <Button className="" type="submit" color="green">
          Green
        </Button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

// Estilos básicos rápidos
const inputStyle = {
  padding: "8px",
  marginRight: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default FormularioUsuario;
