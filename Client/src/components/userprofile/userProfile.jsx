// Profile.jsx

import React, { useState } from 'react';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('url_de_la_imagen.jpg'); // La URL de la imagen de perfil
  const [userName, setUserName] = useState('Nombre de Usuario');
  const [email, setEmail] = useState('correo@ejemplo.com');

  const handleImageChange = (event) => {
    // Implementa la lógica para cambiar la imagen de perfil
    const newImageUrl = event.target.value; // Puedes usar un campo de texto o cargar una nueva imagen
    setProfileImage(newImageUrl);
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <div>
        <img src={profileImage} alt="Imagen de perfil" />
        <input
          type="text"
          placeholder="URL de nueva imagen"
          value={profileImage}
          onChange={handleImageChange}
        />
      </div>
      <div>
        <p>Nombre de Usuario: {userName}</p>
        <p>Email: {email}</p>
      </div>
      {/* Agrega enlaces o botones para ir a otras secciones del perfil, como Mis Pedidos */}
      <div>
        <a href="/mis-pedidos">Mis Pedidos</a>
      </div>
    </div>
  );
};

export default Profile;
