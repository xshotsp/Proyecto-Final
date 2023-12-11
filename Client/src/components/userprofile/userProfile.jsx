// Profile.jsx

import React, { useState } from 'react';
import styles from './userProfile.module.css';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('url_de_la_imagen.jpg');
  const [userName, setUserName] = useState('Nombre de Usuario');
  const [email, setEmail] = useState('correo@ejemplo.com');

  const handleImageChange = (event) => {
    const newImageUrl = event.target.value;
    setProfileImage(newImageUrl);
  };

  return (
    <div className={styles.container}>
      <h2>User Profile</h2>
      <div>
        <img className={styles.profileImage} src={profileImage} alt="Imagen de perfil" />
        <input
          className={styles.imageInput}
          type="text"
          placeholder="URL de nueva imagen"
          value={profileImage}
          onChange={handleImageChange}
        />
      </div>
      <div className={styles.userDetails}>
        <p>User name: {userName}</p>
        <p>Email: {email}</p>
      </div>
      <div className={styles.linkSection}>
        <a href="/mis-pedidos">My orders</a>
      </div>
    </div>
  );
};

export default Profile;
