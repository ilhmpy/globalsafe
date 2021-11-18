import styled, { css } from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import { TabsBlock as BaseTabsBlock } from '../../../components/ui';
import { Select as BaseSelect } from '../../../../../components/Select/Select5';
import { Button as BaseButton } from '../../../../../components/Button/V2/Button';
import { Device } from '../../../consts';

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

export const BlockWrapper = styled.div<{largeMB?: boolean, mbMobile?: number;}>`
  margin-bottom: ${props => props.largeMB ? '40px' : '20px'};

  @media ${Device.mobile} {
    margin-bottom: ${props => props.mbMobile ? props.mbMobile : 20}px;
  };

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TabsBlock = styled(BaseTabsBlock)`
  margin-bottom: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
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

export const EmptyPaymentsBlock = styled.div`
  display: flex;
  background: ${props => props.theme.v2.bg};
  border: 1px solid ${props => props.theme.v2.dropdownBorder};
  border-radius: 0px 4px 4px 0px;
  padding: 19px 20px;
  margin-bottom: 20px;
`;

export const Link = styled(NavLink)`
  color: #0094FF;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  text-decoration: underline;
`;

export const PaymentMethodDetailsBlock = styled.div`
  padding-left: 24px;
`;

export const Filters = styled.div<{hidden?: boolean; smHidden?: boolean; smVisible?: boolean; mB?: number; when?: boolean;}>`
  display: ${props => props.hidden ? 'none' : 'flex'};
  padding: 20px;
  margin-bottom: ${props => props.mB !== undefined ? props.mB : 20}px;
  background-color: ${props => props.theme.v2.cover}
  @media only screen and (max-device-width: 480px) {
    width: 100%;
  };
  @media ${Device.mobile} {
    ${props => props.smHidden && css`display: none`};
    ${props => props.smVisible && css`display: flex`};
  };
  ${({ when }) => {
    if (when !== undefined) {
      return `
        display: ${when ? "flex" : "none"};
      `;
    };
  }};
`;

export const CertInfoBlock = styled.div`  
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.v2.bg};
  border: 1px solid ${props => props.theme.v2.dropdownBorder};
  border-radius: 0px 4px 4px 0px;
  padding: 19px 20px;
`;
 