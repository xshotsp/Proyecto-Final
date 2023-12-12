import React, { useState, useEffect } from 'react';
import { 
   getComments,
   createComment, 
   deleteComment as deleteCommentFromData, 
   updateComment as updateCommentFromData 
  } from '../../data';
import style from './ReviewyComentarios.module.css';
import Comentarios from './Comentarios';
import CommentForm from './CommentForm';
import Review from './Review'

const ReviewyComentarios = ({ access, productoId,  currentUserId }) => {

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const canComment = access === true ; //validaciones falta la validacion de compra 
  //const canComment = access === true && userHasPurchasedProduct(productoId.purchase === true);

  const getReplies = CommentId => {
    return backendComments.filter(backendComment => backendComment.parentId === CommentId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}


const addComments = (text, parentId) => {
  if (canComment) {
    createComment(text, parentId, userRating).then((newComment) => {
      setBackendComments([newComment, ...backendComments]);
      setActiveComment(null);
      setUserRating(0);
    });
  } else {
    alert('Debes estar autenticado y haber comprado el producto para comentar.');
  }
};


const deleteComment = (CommentId) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
    deleteCommentFromData(CommentId).then(() => { 
      const updatedBackendComments = backendComments.filter(
        backendComment => backendComment.id !== CommentId
      );
      setBackendComments(updatedBackendComments);
    });
  }
}

const updateComment = (text, CommentId) =>{
   updateCommentFromData(text, CommentId).then(()=>{
    const updatedBackendComments = backendComments.map(backendComment => {
      if(backendComment.id === CommentId){
        return{...backendComment, body: text}
      }
      return backendComment
    });
     setBackendComments(updatedBackendComments);
     setActiveComment(null);
   })
}

const handleRatingChange = (rating) => {
  setUserRating(rating);
};



  useEffect(() => {
    getComments().then((data) => {
      setBackendComments(data);
    });
  }, []);
  

  return (
    <div className={style.Comments}>
       <h3 className={style.Comments_title}>Reseñas y Comentarios</h3>
          {canComment ? (
        <>
          <div>
            <Review score={userRating} onRatingChange={handleRatingChange} />
          </div>
          <div className={style.Comment_form_title}>Escribe un comentario...</div>
          <CommentForm submitLabel="Escribir" handleSubmit={addComments} />
        </>
      ) : (
        <div className={style.Comment_form_title}>
          Debes estar autenticado y haber comprado el producto para comentar.
        </div>
      )}
       <div className={style.comments_container}>
          {rootComments.map(rootComment => (
              <Comentarios 
              key={rootComment.id} 
              Comment={rootComment} 
              replies={getReplies(rootComment.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              updateComment={updateComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComments}
              access={access}
              />
          ))}
       </div>
    </div>
  );
};

export default ReviewyComentarios;

