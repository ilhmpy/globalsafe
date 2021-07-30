import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div<{ currentTheme: string; }>`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;

  & > div {
    background-color: ${({ currentTheme }) => currentTheme == "light" ? "#2b3595" : "#fff"}
  }
`;

const Dot = styled.div<{ delay?: string }>`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

export const Loading = ({ currentTheme }: any) => {
  return (
    <DotWrapper currentTheme={currentTheme}>
      <Dot delay="0s" />
      <Dot delay=".1s" />
      <Dot delay=".2s" />
    </DotWrapper>
  );
};
