import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import { TabsBlock as BaseTabsBlock } from '../../../components/ui';
import { Select as BaseSelect } from '../../../../../components/Select/Select5';
import { Button as BaseButton } from '../../../../../components/Button/V2/Button';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BlockWrapper = styled.div<{largeMB?: boolean}>`
  margin-bottom: ${props => props.largeMB ? '40px' : '20px'};
`;

export const TabsBlock = styled(BaseTabsBlock)`
  margin-bottom: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Select = styled(BaseSelect)`
  min-width: 300px;
  width: 300px;
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    max-width: 200px;
    min-width: 200px;
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: initial;
    min-width: auto;
  }
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Button = styled(BaseButton)`
  text-transform: none;
`;


export const SubmitButton = styled.button`
  display: flex;
  background: transparent;
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


export const PaymentMethodDetailsBlock = styled.div`
  padding-left: 24px;
`;
