import styled from 'styled-components/macro';

export const Container = styled.div<{ when?: boolean; }>`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-bottom: 40px;
  @media only screen and (max-device-width: 481px) and (max-device-width: 1024px) {
    padding-bottom: 0px;
  }
  @media only screen and (max-device-width: 480px) {
    flex-wrap: wrap;
  }
  ${({ when }) => {
    if (when != undefined) {
      return `
        display: ${when ? "flex" : "none"};
      `;
    };
  }}
`;

export const BlockWrapper = styled.div<{ when?: boolean; }>`
  margin-bottom: 20px;
  ${({ when }) => {
    if (when != null) {
      return `
        display: ${when === true ? "block" : "none"};
      `;
    };
  }}
`;

export const TitleBlockWrapper = styled.div`
  margin-bottom: 40px;
`;

export const Space = styled.div<{gap?: number, justify?: string; tabletWrap?: boolean; tabletJustify?: string; }>`
  display: flex;
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
  gap: ${props => props.gap ? `${props.gap}px` : '10px'};
  ${({ tabletWrap }) => {
    if (tabletWrap) {
      return `
        @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
          flex-wrap: wrap;
          .intf_btns {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `;
    };
  }}
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    margin-bottom: 20px;
    ${({ tabletJustify }) => {
      if (tabletJustify) {
        return `
          justify-content: ${tabletJustify};
          & > button {
            display: flex;
            justify-content: flex-end;
          }
        `;
      }
    }}
  }
`;

export const TransferInfoBlock = styled.div`
  background: ${props => props.theme.white};
  border: 1px solid #EAEFF4;
  border-radius: 0px 4px 4px 0px;
  padding: 20px;
  margin: 40px 0;
`;

export const B = styled.span`
    font-weight: 500;
`;

export const FeedbackBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const StateBlock = styled.div<{ when: boolean; left?: boolean; }>`
  width: 100%;
  display: ${({ when }) => {
    return when ? "block" : "none"
  }};
  ${({ left }) => {
    if (left) {
      return `
        width: 33%;
      `;
    }
  }}
`;