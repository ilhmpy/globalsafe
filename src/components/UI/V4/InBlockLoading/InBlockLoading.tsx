import { FC } from "react";
import { Container } from '../../Container';
import styled, { keyframes } from "styled-components/macro";

type InBlockLoadingProps = {

};

export const InBlockLoading: FC<InBlockLoadingProps> = () => {
    return (
        <Container>
            <LoadContainer>
                <Spinner />
            </LoadContainer>
        </Container>
    );
};

export const LoadContainer = styled.div`
  margin-bottom: 40px;
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: ${spin} 0.5s infinite linear;
  border-top: 2px solid #515172;
`;