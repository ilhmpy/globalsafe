import styled from 'styled-components/macro';

export const RightSide = styled.div`
  padding: 40px;
  width: 100%;
  background: #fff;
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  };
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    padding-right: 34px;
  }
`;
 