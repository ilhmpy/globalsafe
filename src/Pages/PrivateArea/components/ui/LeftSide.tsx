import styled from 'styled-components/macro';

export const LeftSide = styled.div<{ bg?: string; order?: boolean }>`
  width: 360px;
  flex: none;
  padding: 40px;
  background: ${(props) => (props.bg ? props.bg : '#ebebf2')};
  background: ${(props) => props.order ? props.theme.v2.neutral2 : props.theme.v2.neutral};
  @media (max-width: 992px) {
    max-width: 310px;
    width: 100%;
    padding: 40px 35px;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    width: 100%;
  }
  @media (max-width: 576px) {
    width: 100%;
    padding: 20px;
  }
`;
