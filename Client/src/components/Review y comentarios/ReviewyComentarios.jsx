import React, { useState, useEffect } from 'react';
import Review from './Review';
import Comentarios from './Comentarios';

const ReviewyComentarios = ({ login, productoId }) => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [ratingsAndComments, setRatingsAndComments] = useState([]);
  const [clearCommentyReview, setClearCommentyReview] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [userName, setUserName] = useState('');


  console.log('login',login);
  
  const isLoggedIn = login.access;
  const hasPurchased = true;

  useEffect(() => {
    if (isLoggedIn) {
      setUserName(login.email);
    }
  }, [isLoggedIn, login.email]);
  

  const handleClearLocalStorage = () => {
    localStorage.removeItem(`ratingsAndComments-${productoId}`);
    setRatingsAndComments([]);
    console.log('LocalStorage limpiado para productoId:', productoId);
  };

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`ratingsAndComments-${productoId}`)) || [];
    setRatingsAndComments(storedReviews);
    console.log('Obtenidas revisiones del LocalStorage para productoId:', productoId);
  }, [productoId]);

  const handleClearCommentyReview = () => {
    setClearCommentyReview(true);
    setTimeout(() => {
      setClearCommentyReview(false);
      setUserRating(0);
      setUserComment('');
      console.log('Comentario y calificación limpiados');
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

    if (!isLoggedIn || !hasPurchased) {
      alertMessage = 'Debes iniciar sesión y haber comprado el producto para dejar una revisión.';
    } else {
      const userReviewed = ratingsAndComments.some((review) => review.userId === userName );

      switch (true) {
        case userRating <= 0 || userComment.trim() === '':
          alertMessage = 'Completa la calificación y el comentario antes de enviar.';
          break;
        case userReviewed:
          alertMessage = 'Solo puedes calificar el producto una vez.';
          break;
        default:
          const newReview = { rating: userRating, comment: userComment, userId:userName, productoId: productoId };
          setRatingsAndComments((prevReviews) => [...prevReviews, newReview]);
          console.log('Nueva revisión agregada:', newReview);

          localStorage.setItem(`ratingsAndComments-${productoId}`, JSON.stringify([...ratingsAndComments, newReview]));
          console.log('LocalStorage actualizado para productoId:', productoId);
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

    const updatedReviews = ratingsAndComments.map(review => {
      if (!review.userId) {
        // Si no hay un userId en la revisión, asigna el nombre del usuario
        return { ...review, userId: userName };
      }
      return review;
    });

    localStorage.setItem(`ratingsAndComments-${productoId}`, JSON.stringify(ratingsAndComments));
    console.log('LocalStorage actualizado para productoId:', productoId);
  }, [ratingsAndComments.length, productoId, userName]);

  return (
    <div>
      <button onClick={handleClearLocalStorage}>
        Limpiar localStorage
      </button>
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

      {isLoggedIn && hasPurchased ? (
      <section>
        <Comentarios
          ratingsAndComments={ratingsAndComments.filter(review => review.productoId === productoId)}
          onCommentChange={handleCommentChange}
          shouldClearCommentyReview={clearCommentyReview}
        />
        <button onClick={() => { handleClearCommentyReview(); handleSubmitReview(); }}>
          Enviar Reseña
        </button>
      </section>
    ) : (
      null
    )}


      <section>
        <h2>Calificaciones y comentarios</h2>
      {ratingsAndComments.length > 0 && (
        <div>
          <p>Últimas reseñas:</p>
          <p>Usuario: {ratingsAndComments[ratingsAndComments.length - 1].userId}</p>
           <Review score={ratingsAndComments[ratingsAndComments.length - 1].rating} />
           <p>Comentario: {ratingsAndComments[ratingsAndComments.length - 1].comment}</p>
        </div>
      )}
      </section>
    </div>
  );
};

export default ReviewyComentarios;





