import React, { useState } from 'react';
import logo from './assets/boingaLoguito.png';
import fondoRegistro from './assets/fondoRegistro.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const LoginPage = () => {
    
const navigate = useNavigate();

useEffect(() => {
    const cerrarSesion = async () =>{
        try{
    await fetch('http://localhost:8081/logout', {
    credentials: "include",
    });
        } catch (error){
    console.error("Error cerrando sesión:", error);
        }
    };

    cerrarSesion();
}, []);

const irInicio = () =>{
    navigate('/inicio');
}

const [datos, setDatos] = useState({
    usuario: '',
    contrasena: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prevdatos) => ({
      ...prevdatos,
      [name]: value,
    }));
  };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const respuesta = await fetch('http://localhost:8081/login', {
                method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
        credentials: 'include'
      });


const data = await respuesta.json();

      if(respuesta.ok && data.success){
        irInicio();
      } else{
        Swal.fire({
      title: 'Error',
      text: data.message || 'Algo salió mal',
      icon: 'error',
    });
      }
   
        }catch(error){
console.error(error);
 Swal.fire({
    title: 'Error de red',
    text: 'No se pudo conectar al servidor',
    icon: 'error',
  });
        }

       
        
    };

    return (
        
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Imagen de fondo desvanecida */}
                <div className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${fondoRegistro})` }}
                ></div>
      <div className="relative z-10 flex flex-col items-center">
    <img src={logo} alt="Logo" width="200" className="mb-6" />

    <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
           {/*Título*/}
            <h2 className='text-2x1 font-bold text-center text-gray-800 mb-6'>Iniciar Sesión</h2>

           {/* Formulario */}

           <form className='space-y-5'>
            {/* Campo Email */}
            <div>
                <label className='block mb-1 text-gray-600 text-sm'>Correo electrónico</label>
                <input type="email"
                placeholder='tucorreo@heladosboinga.com'
                onChange={handleChange}
                name='usuario'
                value={datos.usuario}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400' />
            </div>

            {/* Campo Contraseña */}
            <div>
                <label className='block mb-1 text-gray-600 text-sm'>Contraseña</label>
                <input type="password"
                placeholder='••••••••'
                name='contrasena'
                value={datos.contrasena}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400' />
            </div>

            {/* Botón de Iniciar Sesión */}
            <button
            type='submit'
            onClick={handleSubmit}
            className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-300'>
                Iniciar Sesión
            </button>
            </form> 

            {/* Enlace a Registro */}
            <p className='mt-6 text-center text-gray-500'>
                ¿No tienes una cuenta? 
                <a href="/registro" className='text-indigo-500 hover:text-indigo-600 font-medium'> Regístrate aquí</a>
            </p>
        </div>
         </div>
         </div>
    );
};

export default LoginPage;