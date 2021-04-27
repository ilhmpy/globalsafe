import React from "react";
import { Container } from "../../globalStyles";
import styled from "styled-components/macro";

export const Footer = () => {
  return (
    <Container>
      <Text>GLOBALSAFE © 2021</Text>
    </Container>
  );
};

const Text = styled.p`
  width: 100%;
  margin-top: 170px;
  margin-bottom: 40px;
  color: ${(props) => props.theme.text};
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
`;
