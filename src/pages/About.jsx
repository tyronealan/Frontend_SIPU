import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <h1>Acerca de</h1>
      <div>
        <img
          src="https://unavatar.io/github/tomyanchundia"
          alt="foto de Arnol"
        />
      </div>
      <p>Esto es un clon de react router</p>
      <Link to="/">Ir a la página principal</Link>
    </>
  );
}
