// Hero.js
import React, { useState, useEffect } from 'react';
import s from './hero.module.css';
import colection1Image from '../../assets/colection1.jpg';
import colection2Image from '../../assets/colection2.jpg';
import colection3Image from '../../assets/colection3.jpeg';
const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [colection1Image, colection2Image, colection3Image];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${images[currentImage]})`,
  };

  return (
    <div className={s.heroContainer} style={backgroundImageStyle}>
      <div className={s.heroText}>
        <h2>¡NEW COLLECTION AVAILABLE!</h2>
      </div>
    </div>
  );
};

export default Hero;