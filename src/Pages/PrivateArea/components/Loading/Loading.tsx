import { Container } from '../../../../components/UI/Container';
import styled, { keyframes } from "styled-components/macro";
import { FC } from "react";

export const Loading = () => {
    return (
      <Container>
        <LoadContainer>
          <Spinner />
        </LoadContainer>
      </Container>
    )
};

type NotItemsType = {
    text: string;
}

export const NotItems: FC<NotItemsType> = ({ text }: NotItemsType) => {
    return (
        <Container>
          <LoadContainer>
            <NotDeposits>
              {text}
            </NotDeposits>
          </LoadContainer>
      </Container>  
    )
}

export const LoadContainer = styled.div`
  margin-bottom: 40px;
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotDeposits = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 20px 0;
  color: #000;
  width: 100%;
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