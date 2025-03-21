import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "components/Header"; // Componente remoto vía Module Federation
import "./index.css"; // Tu archivo de estilos

const App = () => {
  const [data, setData] = useState<any[]>([]); // Datos de la API
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Datos estáticos de colmenas (puedes reemplazarlos con datos de la API más adelante)
  const beehives = [
    {
      id: "3213",
      temperature: "20°C",
      humidity: "10%",
      weight: "20 k",
      image: "/images/colmenas.jpg",
      imageCount: "8k",
      imageIcon: "/images/camara.png",
    },
    {
      id: "6436",
      temperature: "20°C",
      humidity: "10%",
      weight: "20 k",
      image: "/images/colmenas.jpg",
      imageCount: "20k",
      imageIcon: "/images/camara.png",
    },
    {
      id: "5436",
      temperature: "20°C",
      humidity: "10%",
      weight: "20 k",
      image: "/images/colmenas.jpg",
      imageCount: "20k",
      imageIcon: "/images/camara.png",
    },
    {
      id: "6452",
      temperature: "20°C",
      humidity: "10%",
      weight: "20 k",
      image: "/images/colmenas.jpg",
      imageCount: "19k",
      imageIcon: "/images/camara.png",
    },
    {
      id: "7482",
      temperature: "20°C",
      humidity: "10%",
      weight: "20 k",
      image: "/images/colmenas.jpg",
      imageCount: "20k",
      imageIcon: "/images/camara.png",
    },
    {
      id: "8764",
      temperature: "20°C",
      humidity: "10%",
      weight: "20 k",
      image: "/images/colmenas.jpg",
      imageCount: "20k",
      imageIcon: "/images/camara.png",
    },
  ];

  // Función para obtener los datos de la API
  

  // Llama a fetchData cuando el componente se monta
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 lg:p-8">
        <Header /> {/* Componente remoto */}
        
        {/* Sección de colmenas */}
        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            {beehives.map((beehive) => (
              <div
                key={beehive.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden w-[350px]"
              >
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    N° - {beehive.id}
                  </h2>
                  <img
                    src="/images/dropdown-arrow.png"
                    alt="Dropdown Arrow"
                    width={20}
                    height={20}
                  />
                </div>

                <div className="relative px-4">
                  <img
                    src={beehive.image}
                    alt={`Beehive ${beehive.id}`}
                    className="w-full h-48 object-cover rounded-lg border-4 border-white"
                  />
                  <div className="absolute top-3 right-6 bg-white rounded-full p-2 shadow-md">
                    <img
                      src="/images/signal-icon.svg"
                      alt="Signal Icon"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/temperatura.png"
                        alt="Temperature Icon"
                        width={18}
                        height={18}
                      />
                      <span>{beehive.temperature}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/humedad.png"
                        alt="Humidity Icon"
                        width={18}
                        height={18}
                      />
                      <span>{beehive.humidity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/escala-de-peso.png"
                        alt="Weight Icon"
                        width={18}
                        height={18}
                      />
                      <span>{beehive.weight}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={beehive.imageIcon}
                        alt="Image Count Icon"
                        width={18}
                        height={18}
                      />
                      <span>{beehive.imageCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);