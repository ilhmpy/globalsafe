import styled from 'styled-components/macro';

export const LeftSide = styled.div<{ bg?: string }>`
  width: 360px;
  flex: none;
  padding: 40px;
  background: ${(props) => (props.bg ? props.bg : '#ebebf2')};
  @media (max-width: 992px) {
    width: 310px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
