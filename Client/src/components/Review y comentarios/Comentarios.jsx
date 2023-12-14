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
            placeholder="Write a comment..."
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
      ) : (
        <p>You must log in to leave a comment.</p>
      )}
    </div>
  );
};

export default Comentarios;
