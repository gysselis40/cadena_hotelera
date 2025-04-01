import React, { useState } from 'react';
import DisponibilidadForm from './components/DisponibilidadForm';
import TarifasForm from './components/TarifasForm';

const App = () => {
  const [resultados, setResultados] = useState([]);

  return (
    <div>
      <h1>Cadena Hotelera</h1>
      <DisponibilidadForm onResultados={setResultados} />
      <TarifasForm />
      <div>
        <h2>Resultados</h2>
        <pre>{JSON.stringify(resultados, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;