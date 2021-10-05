import styled from 'styled-components/macro';

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

export const BlockWrapper = styled.div`
  margin-bottom: 20px;
`;

export const TitleBlockWrapper = styled.div`
  margin-bottom: 40px;
`;

export const Space = styled.div<{gap?: number, justify?: string}>`
  display: flex;
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
  gap: ${props => props.gap ? `${props.gap}px` : '10px'};
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