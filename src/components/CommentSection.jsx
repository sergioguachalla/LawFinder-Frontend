import React, { useState } from 'react';
import { useCommentsStore } from '../store/commentsStore';
import Footer from './Footer';
import styled from 'styled-components';
import moment from 'moment';
import CommentSkeleton from './CommentSkeleton';

const CommentSectionWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const CommentList = styled.div`
  margin-bottom: 20px;
`;

const CommentItem = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
`;

const CommentInfo = styled.div`
  flex: 1;
`;

const Username = styled.h4`
  font-size: 18px;
  margin-bottom: 5px;
`;

const CommentContent = styled.p`
  margin-bottom: 5px;
`;

const CommentDate = styled.p`
  color: #777;
  font-size: 12px;
  margin-left: 10px;
`;

const NoCommentsMessage = styled.p`
  color: #777;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
  transition: color 0.3s ease-in-out;
`;

const CurrentPage = styled.span`
  font-weight: bold;
`;

const AddCommentTitle = styled.h4`
  margin-bottom: 10px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const CommentButton = styled.button`
  background-color: #333;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #555;
  }
`;

const CommentSection = ({ comments }) => {
  const {
    handleComment,
    handleChange,
    status,
    previousPage,
    currentPage,
    totalPages,
    nextPage,
  } = useCommentsStore();

  const handleSubmitComment = (event) => {
    event.preventDefault();
    handleComment(event);
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY ');
  };
  
  return (
    <CommentSectionWrapper>
      <Title>Comentarios</Title>
      <CommentList>
        {status === 'loading' || status === 'init' && <CommentSkeleton></CommentSkeleton>}
        {(
          comments.map((comment) => (
            <CommentItem key={comment.commentId}>
              <CommentInfo>
                <Username>{comment.userName} 
                </Username>
                <CommentContent>{comment.commentContent}</CommentContent>
               
              </CommentInfo>
              <CommentDate>Publicado el: {formatDate(comment.commentDate)}</CommentDate>
            </CommentItem>
          ))
        )
      }
      </CommentList>

      {status === 'success' && (
        <Pagination>
          <PaginationButton onClick={previousPage} disabled={currentPage === 0}>
            Anterior
          </PaginationButton>
          <CurrentPage>{currentPage + 1}</CurrentPage>
          <PaginationButton onClick={nextPage} disabled={currentPage === totalPages - 1}>
            Siguiente
          </PaginationButton>
        </Pagination>
      )}

      <AddCommentTitle>Añade un comentario</AddCommentTitle>
      <CommentForm>
        <CommentInput type="text" placeholder="Escribe un comentario" onChange={(e) => handleChange('comment', e)} />
        <CommentButton onClick={(e) => handleSubmitComment(e)}>Comentar</CommentButton>
      </CommentForm>

      <Footer />
     
    </CommentSectionWrapper>
  );
};

export default CommentSection;