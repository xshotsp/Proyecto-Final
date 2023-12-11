import React, { useState } from 'react';

const Response = ({ onAddResponse }) => {
  const [responseText, setResponseText] = useState('');

  const handleResponseChange = (event) => {
    setResponseText(event.target.value);
  };

  const handleAddResponse = () => {
    if (responseText.trim() !== '') {
      onAddResponse(responseText);
      setResponseText('');
    }
  };

  return (
    <div>
      <textarea
        rows="4"
        cols="50"
        placeholder="Escribe tu respuesta aquí..."
        value={responseText}
        onChange={handleResponseChange}
      />
      <button onClick={handleAddResponse}>Agregar Respuesta</button>
    </div>
  );
};

export default Response;
