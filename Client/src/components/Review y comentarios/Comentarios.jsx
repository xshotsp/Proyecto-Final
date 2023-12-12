import React, { useState, useEffect } from 'react';

const Comentarios = ({ onCommentChange, shouldClearCommentyReview }) => {
  const [comment, setComment] = useState('');
  const isLoggedIn = true;

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    onCommentChange(event.target.value); // Envía el comentario al componente padre
  };

  useEffect(() => {
    // Limpia el campo de comentarios si shouldClearComment es true
    if (shouldClearCommentyReview) {
      setComment('');
    }
  }, [shouldClearCommentyReview]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default Comentarios;


