import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/V2/Button';
import { Device } from '../../consts';

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

  @media ${Device.mobile} {
    flex-direction: column;
  };
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

export const RateText = styled.p`
  margin-top: 10px;
  font-size: 12px;
  line-height: 14px;
  color: ${props => props.theme.v2.blackText};
  display: none;
  @media ${Device.mobile} {
    display: block;
  };
`;
