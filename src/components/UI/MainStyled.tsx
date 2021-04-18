import styled from "styled-components/macro";

export const H1 = styled.div`
  font-weight: 900;
  font-size: 96px;
  line-height: normal;
  margin-bottom: 40px;
  margin-right: auto;
  @media (max-width: 1060px) {
    font-size: calc(36px + 60 * ((100vw - 320px) / 740));
  }
`;

export const H2 = styled.h2`
  font-weight: 900;
  font-size: 72px;
  line-height: 84px;
  text-align: left;
  margin-right: auto;
  margin-bottom: 30px;
  color: #0e0d3d;
  @media (max-width: 1060px) {
    font-size: calc(26px + 60 * ((100vw - 320px) / 740));
  }
`;
