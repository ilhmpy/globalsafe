import styled from 'styled-components';

export const Container = styled.div<{
  pNone?: boolean;
  page?: boolean;
  mtNone?: boolean;
  pTabletNone?: boolean;
}>`
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
  padding: 0 34px;
  position: relative;
  @media (max-width: 576px) {
    padding-right: ${(props) => (props.pNone ? '0' : '20px')};
    padding-left: ${(props) => (props.pNone ? '0' : '20px')};
  }
  @media (max-width: 768px) {
    padding-right: ${(props) => (props.pNone ? '0' : '20px')};
    padding-left: ${(props) => (props.pNone ? '0' : '20px')};
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    margin-bottom: 40px;
  }
  ${(props) => {
    if (props.pTabletNone) {
      return `
        @media (max-width: 1024px) {
          padding-right: 0px;
          padding-left: 0px;
        }
      `;
    }
  }}
  ${(props) => {
    if (props.page) {
      return `
        margin-top: 60px;
        @media (max-width: 767px) {
          margin-top: ${props.mtNone ? '0' : '20px'};
        }
        @media (min-width: 767px) and (max-width: 1024px) {
          margin-top: 40px;
        }
      `;
    }
  }}
`;
