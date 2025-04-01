import React, { useState } from 'react';
import DisponibilidadForm from './components/DisponibilidadForm';
import TarifasForm from './components/TarifasForm';

function App() {
  const [resultados, setResultados] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Cadena Hotelera</h1>
      </header>
      <main>
        {/* Formulario para consultar disponibilidad */}
        <DisponibilidadForm onResultados={setResultados} />

        {/* Formulario para calcular tarifas */}
        <TarifasForm />

        {/* Mostrar resultados */}
        <section>
          <h2>Resultados</h2>
          {resultados.length > 0 ? (
            <ul>
              {resultados.map((resultado, index) => (
                <li key={index}>
                  Tipo: {resultado.tipo}, Cantidad: {resultado.cantidad}, Cupo Máximo: {resultado.cupo_max}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay resultados para mostrar.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
