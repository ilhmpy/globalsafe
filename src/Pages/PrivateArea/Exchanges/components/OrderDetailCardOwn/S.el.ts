import styled, {css} from 'styled-components/macro';
import { Device } from '../../../consts';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;

  @media ${Device.mobile} {
    flex-direction: column-reverse;
  }
`;

export const BlockWrapper = styled.div<{largeMB?: boolean, noMb?: boolean; mobileMb?: number;}>`
  margin-bottom: ${props => props.largeMB ? '40px' : props.noMb ? 0 : '20px'};
  @media ${Device.mobile} {
    ${props => props.mobileMb !== undefined && css`margin-bottom: ${props.mobileMb}px`};
  }
`;

export const PaymentMethodDetailsBlock = styled.div`
  padding-left: 40px;
`;
