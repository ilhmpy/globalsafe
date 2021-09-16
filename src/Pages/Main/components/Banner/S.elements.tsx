import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/V2/Button';

export const Desc = styled.p`
  font-size: 14px;
  line-height: 20px;
  max-width: 610px;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 576px) {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 10px;
  }
`;

export const DescWrap = styled.div`
  width: 100%;
  margin-top: -80px;
  @media (max-width: 992px) {
    margin-top: -45px;
  }
  @media (max-width: 870px) {
    margin-top: -37px;
  }
  @media (max-width: 576px) {
    margin-top: 0px;
    text-align: center;
    ${Button} {
      width: 100%;
    }
  }
`;
