import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReviews,
  createReview,
  deleteReview as deleteReviewFromData,
  updateReview as updateReviewFromData,
  userLoggedIn,
} from '../../redux/actions/actions';
import style from './ReviewyComentarios.module.css';
import Comentarios from './Comentarios';
import CommentForm from './CommentForm';
import Review from './Review';

const ReviewyComentarios = ({ access, productoId, currentUserId }) => {
  const [activeComment, setActiveComment] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const dispatch = useDispatch();

  // Obtén las reseñas del estado de Redux
  const backendComments = useSelector((state) => state.reviews);
  const usuario = useSelector((state)=> state.activeUser);

  console.log('usuario',usuario);
  console.log('backendComments:', backendComments);

  
  const commentsArray = Object.values(backendComments);

 const comentariosFiltrados = commentsArray.filter(comentario => comentario.parentId===null);

  console.log('comentarios padre:', comentariosFiltrados);
  const canComment = access === true;

  const getReplies = (commentId) => {
    const repliesArray = commentsArray || []; 
    const replies = repliesArray.filter(({ parentId }) => parentId === commentId);
    console.log('comentarios hijo:', replies);
    return replies;
  };
  
  // Función para agregar un comentario
  const addComment = (text, parentId) => {
    if (canComment) {
      const parentCommentId = parentId !== undefined ? parentId : null;

      // Utiliza la acción de Redux para crear un comentario
      dispatch(
        createReview({
          text,
          parentId: parentCommentId,
          rating: userRating,
          productoId: parseInt(productoId),
          username: usuario.name || usuario.email,
          
        })
      ).then(() => {
        // No necesitas actualizar el estado local, confía en que Redux se encargue
        setActiveComment(null);
        setUserRating(0);
      });
    } else {
      alert('Debes estar autenticado y haber comprado el producto para comentar.');
    }
  };

  // Función para eliminar un comentario
  const deleteComment = (commentId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      // Utiliza la acción de Redux para eliminar un comentario
      dispatch(deleteReviewFromData(commentId));
    }
  };

  // Función para actualizar un comentario
  const updateComment = (text, commentId) => {
    // Utiliza la acción de Redux para actualizar un comentario
    dispatch(updateReviewFromData(text, commentId)).then(() => {
      setActiveComment(null);
    });
  };

  // Función para manejar cambios en la calificación
  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  // Carga inicial de reseñas al montar el componente
  useEffect(() => {
    dispatch(getReviews(productoId));
    dispatch(userLoggedIn());
  }, [dispatch, productoId, usuario]);

  return (
    <div className={style.Comments}>
      <h3 className={style.Comments_title}>Reseñas y Comentarios</h3>
      {canComment ? (
        <>
          <div>
            <Review score={userRating} onRatingChange={handleRatingChange} />
          </div>
          <div className={style.Comment_form_title}>Escribe un comentario...</div>
          <CommentForm submitLabel="Escribir" handleSubmit={addComment} />
        </>
      ) : (
        <div className={style.Comment_form_title}>
          Debes estar autenticado y haber comprado el producto para comentar.
        </div>
      )}
      <div className={style.comments_container}>
        {comentariosFiltrados && comentariosFiltrados.length > 0 ? (
          comentariosFiltrados.map((comentario) => (
            <Comentarios
              key={comentario.id}
              comment={comentario}
              replies={getReplies(comentario.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              updateComment={updateComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              access={access}
            />
          ))
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewyComentarios;


