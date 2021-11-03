import styled from 'styled-components';
import { Device } from '../../consts';

interface SpaceProps {
  gap?: number, 
  justify?: string, 
  mb?: number; 
  column?: boolean; 
  mobileColumn?: boolean; 
  mobileGap?: number;
};

export const Space = styled.div<SpaceProps>`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
    gap: ${props => props.gap ? `${props.gap}px` : '10px'};
    margin-bottom: ${props => props.mb ? props.mb : 0}px;

    ${({ mobileColumn }) => {
        if(mobileColumn) {
          return  `
            @media only screen and (max-device-width: 768px) {
              flex-direction: column;
            }
          `;
        }
    }}
    ${({ mobileGap }) => {
      if(mobileGap) {
        return  `
          @media ${Device.mobile} {
            gap: ${mobileGap}px;
          }
        `;
      }
  }}
`;