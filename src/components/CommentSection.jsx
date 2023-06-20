import React, { useState } from 'react';
import { useCommentsStore } from '../store/commentsStore';
import Footer from './Footer';

const CommentSection = ({comments}) => {
  const {handleComment, handleChange, status,previousPage,currentPage, totalPages, nextPage
  } = useCommentsStore();
  
  const handleSubmitComment = (event) => {
    event.preventDefault();
    handleComment(event);
  }
  return (
    <>
    <div>
      <h2>Comentarios</h2>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              <h4>{comment.userName}</h4>
             <p key={comment.commentId}>{comment.commentContent}</p>
             <p key={comment.commentId + "id"}>{comment.commentDate} fecha</p>
            </div>
          ))
        ) : (
          <p>No existen comentarios.</p>
        )}
      </div>
      
      {status === 'success' && (
          <div className="pagination">
            <button onClick={previousPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <span>{currentPage + 1}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
              Siguiente
            </button>
          </div>
        )}
        <h4>Añade un comentario</h4>
      <input type="text" placeholder="Escribe un comentario" onChange={(e) => handleChange("comment",e)}></input>
      <button className="comment-button" onClick={(e) => {handleSubmitComment(e)}} >Comentar</button>  
      
    </div>
    <Footer></Footer>
    </>
  );
};

export default CommentSection;
