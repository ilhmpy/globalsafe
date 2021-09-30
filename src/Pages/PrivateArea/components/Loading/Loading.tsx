import { Container } from '../../../../components/UI/Container';
import styled from "styled-components/macro";
import { FC } from "react";

export const Loading = () => {
    return (
      <Container>
        <LoadContainer>
          <NotDeposits>
            Загрузка...
          </NotDeposits>
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
`;

export const NotDeposits = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 20px 0;
  color: #000;
`;