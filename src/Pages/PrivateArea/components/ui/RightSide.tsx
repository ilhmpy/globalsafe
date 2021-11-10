import styled from 'styled-components';
import { Device } from '../../consts';

export const RightSide = styled.div<{mobilePadding?: number;}>`
  padding: 40px;
  width: 100%;
  background: #fff;
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    padding-right: 34px;
  };
  @media ${Device.mobile} {
    width: 100%;
    max-width: 100%;
    padding: ${props => props.mobilePadding !== undefined ? props.mobilePadding : 20}px;
  };
`;
 