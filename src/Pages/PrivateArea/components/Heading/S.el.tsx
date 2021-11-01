import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/V2/Button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  ${Button} {
    text-transform: none;
    min-width: 156px;
    font-size: 14px;
    line-height: 16px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 38px;
  color: ${(props) => props.theme.v2.text};
  @media (max-width: 768px) {
    display: none;
  }
`;
