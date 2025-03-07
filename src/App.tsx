import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from 'components/Header';
import "./index.css";

const App = () => {
  const [data, setData] = useState<any[]>([]); // Estado para almacenar los datos de la API
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://8lhoa5atqf.execute-api.us-east-1.amazonaws.com/etapaTest"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const result = await response.json();

      // Parsea el campo "body" si es un string JSON
      const parsedBody = JSON.parse(result.body);
      setData(parsedBody); // Almacena los datos en el estado
    } catch (err) {
      
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Llama a fetchData cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Header />
      <div>Name: app2</div>
      <div>Framework: react-19</div>

      {/* Muestra los datos de la API */}
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id_panal}>
              <strong>ID Panal:</strong> {item.id_panal}, <strong>Estado:</strong>{" "}
              {item.estado}, <strong>Registro:</strong> {item.registro}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);