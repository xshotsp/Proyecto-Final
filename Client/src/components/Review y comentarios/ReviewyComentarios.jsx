import React, { useState, useEffect } from 'react';
import Review from './Review';
import Comentarios from './Comentarios';
import s from './ReviewyComentarios.module.css'
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
      alertMessage = 'You must be logged in and have purchased the product to leave a review..';
    } else {
      const userReviewed = ratingsAndComments.some(review => review.userId === 'uniqueUserId');
  
      console.log('userRating:', userRating);
      console.log('userComment:', userComment);
      console.log('userReviewed:', userReviewed);
  
      switch (true) {
        case userRating <= 0 || userComment.trim() === '':
          alertMessage = 'Please complete the rating and comment before submitting';
          break;
        default:
          const newReview = { rating: userRating, comment: userComment, userId: 'uniqueUserId' };
          setRatingsAndComments((prevReviews) => [...prevReviews, newReview]);
          console.log('New review added', newReview);

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
        <h2>Create a review for the product</h2>
        {isLoggedIn && hasPurchased ? (
          <div>
            <Review score={userRating} shouldClearCommentyReview={clearCommentyReview} onRatingChange={handleRatingChange} />
          </div>
        ) : (
          <p>You must be logged in and have purchased the product to leave a review..</p>
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
       <button className = {s.btnSe}onClick={() => { handleClearCommentyReview(); handleSubmitReview(); }}>
       Send Review
     </button>
     
      )}

      {/* Mostrar calficaciones y comentarios existentes del producto */}
      <section>
        <h2>Comments and Reviews</h2>
        {ratingsAndComments.map((review, index) => (
          <div key={index}>
             {/* <p>Email:{review.email}</p> */}
            <p>Rating: {review.rating}</p>
            <p>Review: {review.comment}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReviewyComentarios;