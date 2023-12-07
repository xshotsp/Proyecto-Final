import React, { useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const Review = ({ score, onRatingChange, onReviewChange, shouldClearCommentyReview }) => {

  const [review, setReview] = useState(0);

  const handleStarClick = (rating) => {
    if (onRatingChange) {
      onRatingChange(rating);
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
    onReviewChange(event.target.value); // envia el review a el componente padre 
  };

  useEffect(() => {
    // Limpia el campo de comentarios si shouldClearComment es true
    if (shouldClearCommentyReview) {
      setReview(0);
    }
  }, [shouldClearCommentyReview]);


  return (
    <div>
      Calificación:{' '}
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          value={review}
          onClick={() => handleStarClick(index + 1)}
          style={{ cursor: 'pointer' }}
          onChange={handleReviewChange}
        >
          {index < score ? <AiFillStar /> : <AiOutlineStar />}
        </span>
      ))}
    </div>
  );
};

export default Review;

