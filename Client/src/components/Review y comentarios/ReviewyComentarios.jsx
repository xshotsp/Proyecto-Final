import React, { useState, useEffect } from 'react';
import Review from './Review';
import Comentarios from './Comentarios';

const ReviewyComentarios = () => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [ratingsAndComments, setRatingsAndComments] = useState([]);
  const [clearCommentyReview, setClearCommentyReview] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false); // Nuevo estado para controlar si el usuario ya recibio el producto

  const isLoggedIn = true;
  const hasPurchased = true;

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('ratingsAndComments')) || [];
    setRatingsAndComments(storedReviews);
  }, []);

  const handleClearCommentyReview = () => {
    setClearCommentyReview(true);
    setTimeout(() => {
      setClearCommentyReview(false);
      setUserRating(0); // Limpiar la calificación después de enviar la revisión
      setUserComment(''); // Limpiar el comentario después de enviar la revisión
    }, 100);
  };
  

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleCommentChange = (comment) => {
    setUserComment(comment);
  };

  const handleSubmitReview = () => {
    let alertMessage = '';
  
    console.log('isLoggedIn:', isLoggedIn);
    console.log('hasPurchased:', hasPurchased);
  
    if (!isLoggedIn || !hasPurchased) {
      alertMessage = 'Debes iniciar sesión y haber comprado el producto para dejar una revisión.';
    } else {
      const userReviewed = ratingsAndComments.some(review => review.userId === 'uniqueUserId');
  
      console.log('userRating:', userRating);
      console.log('userComment:', userComment);
      console.log('userReviewed:', userReviewed);
  
      switch (true) {
        case userRating <= 0 || userComment.trim() === '':
          alertMessage = 'Completa la calificación y el comentario antes de enviar.';
          break;
        case userReviewed===true:
          alertMessage = 'Solo puedes calificar el producto una vez.';
          break;
        default:
          const newReview = { rating: userRating, comment: userComment, userId: 'uniqueUserId' };
          setRatingsAndComments((prevReviews) => [...prevReviews, newReview]);
          console.log('Nueva revisión agregada:', newReview);

          localStorage.setItem('ratingsAndComments', JSON.stringify([...ratingsAndComments, newReview]));
      }
    }
  
    if (alertMessage) {
      console.log('Mostrar alerta:', alertMessage);
      alert(alertMessage);
    }
  };
  useEffect(() => {
    console.log('ratingsAndComments actualizado:', ratingsAndComments);
    setClearCommentyReview(false);

    // Actualizar el localStorage
    localStorage.setItem('ratingsAndComments', JSON.stringify(ratingsAndComments));
  }, [ratingsAndComments.length]);

  return (
    <div>
      <section>
        <h2>Crea una reseña de este producto</h2>
        {isLoggedIn && hasPurchased ? (
          <div>
            <Review score={userRating} shouldClearCommentyReview={clearCommentyReview} onRatingChange={handleRatingChange} />
          </div>
        ) : (
          <p>Debes iniciar sesión y haber comprado el producto para dejar una revisión.</p>
        )}
      </section>

      <section>
        <Comentarios
          ratingsAndComments={ratingsAndComments}
          onCommentChange={handleCommentChange}
          shouldClearCommentyReview={clearCommentyReview}
        />
      </section>

      {isLoggedIn && hasPurchased && (
       <button onClick={() => { handleClearCommentyReview(); handleSubmitReview(); }}>
       Enviar Reseña
     </button>
     
      )}

      {/* Mostrar calficaciones y comentarios existentes del producto */}
      <section>
        <h2>Calificaciones y comentarios</h2>
        {ratingsAndComments.map((review, index) => (
          <div key={index}>
             <p>Usuario:{review.userId}</p>
            <p>Calificación: {review.rating}</p>
            <p>Comentario: {review.comment}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReviewyComentarios;




