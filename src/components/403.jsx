import React from 'react';

const Forbidden = () => {
  return (
    <div>
      <h1>403 Forbidden</h1>
      <p>No tienes permisos para ver esta página.</p>
      <button onClick={() => window.location.href = '/Home'}>Go Home</button>
    </div>
  );
};

export default Forbidden;