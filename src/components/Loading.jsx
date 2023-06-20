import React from 'react';
import '../styles/Loading.css'; // Importa el archivo CSS para los estilos
import Navbar from './Navbar';
const LoadingSpinner = () => {
  return (
   <>
   <Navbar></Navbar>
    <div className="loading-spinner">
      <h1 className="loading-title">Cargando</h1>
    </div>
    </>
  );
};

export default LoadingSpinner;
