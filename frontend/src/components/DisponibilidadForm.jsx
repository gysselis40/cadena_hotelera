import React, { useState } from 'react';

const DisponibilidadForm = ({ onResultados }) => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [sede, setSede] = useState('');

  const consultarDisponibilidad = async () => {
    if (!fechaInicio || !fechaFin || !sede) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/disponibilidad?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&sede=${sede}`
      );
      const data = await response.json();
      if (response.ok) {
        onResultados(data);
      } else {
        alert(data.error || data.message || 'Error al consultar disponibilidad');
      }
    } catch (error) {
      console.error('Error al consultar disponibilidad:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Consultar Disponibilidad</h2>
      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        placeholder="Fecha Inicio"
      />
      <input
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        placeholder="Fecha Fin"
      />
      <input
        type="text"
        value={sede}
        onChange={(e) => setSede(e.target.value)}
        placeholder="Sede"
      />
      <button onClick={consultarDisponibilidad}>Consultar</button>
    </div>
  );
};

export default DisponibilidadForm;