import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
`;

const StyledSvg = styled.svg`
  width: 2.25em;
  transform-origin: center;
  animation: ${rotateAnimation} 2s linear infinite;
`;

const StyledCircle = styled.circle`
  fill: none;
  stroke: hsl(200, 7%, 59%);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: ${dashAnimation} 1.5s ease-in-out infinite;
`;

const SpinnerCircle = () => {
  return (
    <StyledSvg viewBox="25 25 55 50">
      <StyledCircle r="10" cy="50" cx="50"></StyledCircle>
    </StyledSvg>
  );
};

export default SpinnerCircle;
