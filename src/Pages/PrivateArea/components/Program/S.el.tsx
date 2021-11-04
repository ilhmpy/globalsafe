import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/V2/Button';
import { Container } from '../../../../components/UI/Container';

export const CardContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 14px;
  max-width: 1108px;
  @media (max-width: 1024px) {
    padding: 0 34px;
  }
`;

export const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 40px 40px -20px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  width: 340px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  ${Button} {
    margin-top: auto;
    @media (max-width: 1024px) {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: baseline;
    }
    @media (max-width: 1024px) {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    width: 220px;
    padding: 20px;
  }
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const CardTitle = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  margin-bottom: 40px;
  text-transform: uppercase;
  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
`;

export const CardDesc = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  margin-bottom: 40px;
  @media (max-width: 1024px) {
    margin-bottom: 20px;
  }
`;
