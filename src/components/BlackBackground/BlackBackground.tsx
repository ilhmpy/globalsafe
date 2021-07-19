import React, { FC } from "react";
import styled from "styled-components/macro";

export const BBG = styled.div<{ visible: boolean }>`
  width: 130%;
  height: 100vh;
  position: fixed;
  display: ${({ visible }) => visible ? "flex" : "none"};
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  margin-top: -30px;
  margin-left: -526px;
`;
