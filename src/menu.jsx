import { useState } from "react";

const menuItems = [
  {
    name: "Inicio",
    subitems: ["Dashboard", "Resumen"],
  },
  {
    name: "Servicios",
    subitems: ["Consultoría", "Desarrollo", "Soporte"],
  },
  {
    name: "Contacto",
    subitems: ["Correo", "Teléfono"],
  },
];

export default function Menu() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <nav className="bg-white shadow-md">
      {/* Contenedor del menú */}
      <ul className="flex justify-center items-center py-5 relative">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="relative"
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            {/* Botón principal del menú */}
            <button
              className="bg-gray-100 hover:bg-gray-200 px-6 py-3 w-40 text-center rounded-t-md transition-all duration-200 shadow-sm"
            >
              {item.name}
            </button>

            {/* Subitems desplegables */}
            {openIndex === index && (
              <ul className="absolute top-full left-0 w-full z-10">
                {item.subitems.map((subitem, subIndex) => (
                  <li key={subIndex}>
                    <button className="bg-white hover:bg-gray-100 px-6 py-3 w-40 text-left border border-t-0 border-gray-200 shadow-md">
                      {subitem}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
