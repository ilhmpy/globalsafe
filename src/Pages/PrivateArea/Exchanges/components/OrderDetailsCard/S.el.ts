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

export const BlockWrapper = styled.div<{largeMB?: boolean}>`
  margin-bottom: ${props => props.largeMB ? '40px' : '20px'};
`;

export const PaymentMethodDetailsBlock = styled.div`
  padding-left: 40px;
`;
