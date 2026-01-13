import { lazy, Suspense, useState } from "react";
import "./App.css";
import {} from "react-dom";
import { Route, Routes } from "react-router-dom";
import Page404 from "./pages/404.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";

const LazyLandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const LazyHomePage = lazy(() => import("./pages/Home.jsx"));
const LazyLoginPage = lazy(() => import("./pages/Login.jsx"));
const LazyRegisterPage = lazy(() => import("./pages/Register.jsx"));
const LazyEstudiantesPage = lazy(() => import("./pages/Estudiantes.jsx"));

const LazySedesEvaluacionPage = lazy(() =>
  import("./pages/SedeEvaluacion.jsx")
);

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user_data");
    return savedUser ? JSON.parse(savedUser) : null;
  }); //usuario no logeado
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          {/* Rutas publicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LazyLandingPage />} />
          </Route>
          <Route path="/login" element={<LazyLoginPage setUser={setUser} />} />
          <Route
            path="/register"
            element={<LazyRegisterPage setUser={setUser} />}
          />

          {/* rutas protegidas solo con login */}
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route element={<MainLayout user={user} />}>
              <Route path="/home" element={<LazyHomePage user={user} />} />
              <Route
                path="/ofertas-academicas"
                element={<LazyEstudiantesPage user={user} />}
              />
              <Route
                path="/sedes-evaluaciones"
                element={<LazySedesEvaluacionPage user={user} />}
              />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
