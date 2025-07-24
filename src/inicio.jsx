import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./menu";
import logo from "./assets/boingaLoguito.png"
import Swal from "sweetalert2";

const InicioPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cerrarSesion = () =>{
    navigate("/login");
    Swal.fire({
      title: 'Sesión cerrada correctamente',
      text: 'Vuelve pronto!',
      icon: 'success',
    });
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resultado = await fetch("http://localhost:8081/autenticacion", {
          credentials: "include",
        });

        const datos = await resultado.json();

        if (resultado.ok && datos.success && datos.user) {
          setUser(datos.user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <p>Cargando...</p>;

  return (
   <div>
  <div className="relative bg-yellow-50 min-h-screen">
    <div>
      {/* Logo en la esquina superior izquierda */}
      <img
        src={logo}
        alt="Logo"
        width="100"
        className="absolute top-4 left-4 text-2xl font-bold z-0"
      />

      {/* Texto centrado en la parte superior con separación hacia abajo */}
      <h1 className="text-3xl font-bold text-center relative top-14">
        Bienvenido, {user?.nombre}!
      </h1>

      {/* Contenedor para alinear el botón a la derecha */}
      <div className="flex justify-end px-6 mt-6 z-10 relative">
        <button
          type="submit"
          onClick={cerrarSesion}
          className="px-6 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>

    {/* Espacio para el menú debajo del encabezado y botón */}
    <div className="pt-20">
      <Menu />
    </div>
  </div>
</div>
  );
};

export default InicioPage;