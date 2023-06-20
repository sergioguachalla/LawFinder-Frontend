import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const CommentSkeletonWrapper = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const UsernameSkeleton = styled(Skeleton)`
  margin-bottom: 10px;
`;

const CommentContentSkeleton = styled(Skeleton)`
  margin-bottom: 10px;
`;

const CommentSkeleton = () => {
  return (
   <>
    <CommentSkeletonWrapper>
      <UsernameSkeleton height={20} width={100} baseColor="#e6e6e2" />
      <CommentContentSkeleton height={40} width={300} count={2} baseColor="#e6e6e6" />
    </CommentSkeletonWrapper>
     <CommentSkeletonWrapper>
     <UsernameSkeleton height={20} width={100} baseColor="#e6e6e6" />
     <CommentContentSkeleton height={40} width={300} count={2} baseColor="#e6e6e6" />
   </CommentSkeletonWrapper>
   <CommentSkeletonWrapper>
     <UsernameSkeleton height={20} width={100} baseColor="#e6e6e6" />
     <CommentContentSkeleton height={40} width={300} count={2} baseColor="#e6e6e6" />
   </CommentSkeletonWrapper>
   </>
  );
};

export default CommentSkeleton;
