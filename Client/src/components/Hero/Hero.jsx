import React from 'react';
import s from './hero.module.css';

const Hero = () => {
  return (
    <div className={s.heroContainer}>
      <div className={s.heroText}>
        <h2>NUEVA COLECCIÓN DISPONIBLE!</h2>
      </div>
    </div>
  );
}

export default Hero;
