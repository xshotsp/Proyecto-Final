import React, { useState } from 'react';
import style from './ReviewyComentarios.module.css';

const CommentForm = ({ 
  handleSubmit,
  submitLabel, 
  hasCancelButton = false, 
  initialText = '', 
  handleCancel
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className={style.comment_form_textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={style.comment_form_button} disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button type='button' className={`${style.comment_form_button} ${style.comment_form_cancel_button}`}
         onClick={handleCancel}
        >
          cancelar
        </button>
      )}
    </form>
  );
};

export default CommentForm;
