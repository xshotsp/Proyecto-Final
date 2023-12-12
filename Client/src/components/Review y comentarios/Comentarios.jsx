import { useState } from 'react';
import style from './ReviewyComentarios.module.css';
import avatar from '../../assets/usuario.png';
import CommentForm from './CommentForm';
import Review from './Review';

const Comentarios = ({
  Comment,
  replies,
  currentUserId,
  deleteComment,
  updateComment,
  activeComment,
  addComment,
  setActiveComment,
  parentId = null,
  login,
}) => {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(Comment.createdAt) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === Comment.userId && !timePassed;
  const canDelete = currentUserId === Comment.userId && !timePassed;
  const createdAt = new Date(Comment.createdAt).toLocaleDateString();

  const [userRatingUpdate, setUserRatingUpdate] = useState(Comment.rating);

  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === Comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment.id === Comment.id;

  const replyId = parentId ? parentId : Comment.id;

  const handleRatingChangeUpdate = (rating) => {
    setUserRatingUpdate(rating);
  };

  if (!Comment) {
    return <p>Cargando comentarios...</p>;
  }

  console.log('Comment:', Comment);

  return (
    <div className={style.comment}>
      <div className={style.comment_image_container}>
        <img className={style.img} src={avatar} alt="foto de usuario" />
      </div>
      <div className={style.comment_right_part}>
        <div className={style.comment_content}>
          <div className={style.comment_author}>{Comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && (
          <div>
            <Review
              score={userRatingUpdate}
              onRatingChange={handleRatingChangeUpdate}
            />
          </div>
        )}
        {!isEditing && (
          <div className={style.comment_text}>{Comment.body}</div>
        )}
        {isEditing && (
          <div>
            <div>
              <Review
                score={userRatingUpdate}
                onRatingChange={handleRatingChangeUpdate}
              />
            </div>
            <CommentForm
              submitLabel="recomentar"
              hasCancelButton
              initialText={Comment.body}
              handleSubmit={(text) => updateComment(text, Comment.id)}
              handleCancel={() => setActiveComment(null)}
            />
          </div>
        )}
        <div className={style.comment_actions}>
          {canReply && login?.access && (
            <div
              className={style.comment_action}
              onClick={() =>
                setActiveComment({
                  id: Comment.id,
                  type: 'replying',
                })
              }
            >
              Responder
            </div>
          )}

          {canEdit && (
            <div
              className={style.comment_action}
              onClick={() =>
                setActiveComment({
                  id: Comment.id,
                  type: 'editing',
                })
              }
            >
              Editar
            </div>
          )}
          {canDelete && (
            <div
              className={style.comment_action}
              onClick={() => {
                deleteComment(Comment.id);
              }}
            >
              Eliminar
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Replay"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className={style.replies}>
            {replies.map((reply) => (
              <Comentarios
                Comment={reply}
                key={reply.id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                addComment={addComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={Comment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comentarios;


