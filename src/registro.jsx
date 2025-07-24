import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/boingaLoguito.png';
import fondoRegistro from './assets/fondoRegistro.png';
import Swal from 'sweetalert2';


const RegistroPage = () => {
  const navigate = useNavigate();

  const regresar = () => {
    navigate('/login');
  };

  const [datos, setDatos] = useState({
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    fechaNacimiento: '',
    cargo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prevdatos) => ({
      ...prevdatos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(datos.contrasena != datos.confirmarContrasena){
         Swal.fire({
  title: 'Revisa la contraseña de nuevo!',
  text: 'Has escrito mal la contraseña, corrígela por favor.',
  icon: 'error',
  confirmButtonText: 'Intentar de nuevo'
});
        return;
    }
    try {
      const response = await fetch('http://localhost:8081/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
      if (response.ok) {
        Swal.fire({
  title: '¡Registro exitoso!',
  text: 'El usuario ha sido guardado correctamente.',
  icon: 'success',
  confirmButtonText: 'Aceptar'
});

      } else {
       Swal.fire({
  title: 'Error',
  text: 'Datos mal escritos o usuario ya existente.',
  icon: 'error',
  confirmButtonText: 'Intentar de nuevo'
});

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${fondoRegistro})` }}
      ></div>

      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Registro</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700">Cédula</label>
            <input type="text" name="id" value={datos.id} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Nombre</label>
            <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Apellido</label>
            <input type="text" name="apellido" value={datos.apellido} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Correo electrónico</label>
            <input type="email" name="correo" value={datos.correo} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Contraseña</label>
            <input type="password" name="contrasena" value={datos.contrasena} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Confirmar contraseña</label>
            <input type="password" name="confirmarContrasena" value={datos.confirmarContrasena} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Fecha de nacimiento</label>
            <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Cargo</label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input type="radio" name="cargo" value="cliente" checked={datos.cargo === 'cliente'} onChange={handleChange} className="mr-2" />
                Cliente
              </label>
              <label className="flex items-center">
                <input type="radio" name="cargo" value="administrador" checked={datos.cargo === 'administrador'} onChange={handleChange} className="mr-2" />
                Administrador
              </label>
              <label className="flex items-center">
                <input type="radio" name="cargo" value="gerente" checked={datos.cargo === 'gerente'} onChange={handleChange} className="mr-2" />
                Gerente
              </label>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded">
              Registrarse
            </button>
            <button type="button" onClick={regresar} className="px-3 py-2 bg-emerald-500 hover:bg-indigo-200 text-white font-semibold rounded-lg transition duration-200">
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroPage;
