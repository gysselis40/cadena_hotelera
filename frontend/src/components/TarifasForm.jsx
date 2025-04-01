import React, { useState } from 'react';

const TarifasForm = () => {
  const [formData, setFormData] = useState({
    sede: '',
    tipo_habitacion: '',
    temporada: '',
    numero_personas: 0,
    numero_habitaciones: 0,
  });

  const calcularTarifa = async () => {
    const response = await fetch('http://localhost:5000/calcular-tarifa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(`Tarifa total: ${data.tarifa_total}`);
  };

  return (
    <div>
      <h2>Calcular Tarifa</h2>
      <input type="text" placeholder="Sede" onChange={(e) => setFormData({ ...formData, sede: e.target.value })} />
      <input type="text" placeholder="Tipo de habitación" onChange={(e) => setFormData({ ...formData, tipo_habitacion: e.target.value })} />
      <input type="text" placeholder="Temporada" onChange={(e) => setFormData({ ...formData, temporada: e.target.value })} />
      <input type="number" placeholder="Número de personas" onChange={(e) => setFormData({ ...formData, numero_personas: e.target.value })} />
      <input type="number" placeholder="Número de habitaciones" onChange={(e) => setFormData({ ...formData, numero_habitaciones: e.target.value })} />
      <button onClick={calcularTarifa}>Calcular</button>
    </div>
  );
};

export default TarifasForm;