import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import { Input as BaseInput } from '../../../../../components/Input';
import { Button as BaseButton } from '../../../../../components/Button/V2/Button';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const BlockWrapper = styled.div<{largeMB?: boolean}>`
  margin-bottom: ${props => props.largeMB ? '40px' : '20px'};
`;

export const PaymentMethodDetailsBlock = styled.div`
  padding-left: 24px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
`;

export const Input = styled(BaseInput)`
  width: 300px;
`;

export const TransferInfoBlock = styled.div`
  background: ${props => props.theme.white};
  border: 1px solid #EAEFF4;
  border-radius: 0px 4px 4px 0px;
  padding: 20px;
  margin: 40px 0;
`;

export const Button = styled(BaseButton)`
    text-transform: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
`;

export const EmptyPaymentsBlock = styled.div`
  display: flex;
  background: ${props => props.theme.white};
  border: 1px solid #EAEFF4;
  border-radius: 0px 4px 4px 0px;
  padding: 19px 20px;
  margin-bottom: 20px;
`;

export const Link = styled(NavLink)`
  color: #0094FF;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
`;