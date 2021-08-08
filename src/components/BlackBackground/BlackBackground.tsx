import React, { FC } from "react";
import styled from "styled-components/macro";

export const BBG = styled.div<{ visible?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    ${({ visible }) => {
      if (visible) {
        return `
          display: ${visible ? "flex" : "none"};
        `;
      } else {
        return `
          display: flex;        
        `
      }
    }};
    justify-content: center;
    align-items: center;
    z-index: 99999;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
`;
