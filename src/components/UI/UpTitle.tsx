import styled from "styled-components/macro";

export const UpTitle = styled.div<{ small?: boolean }>`
  font-weight: 500;
  font-size: ${(props) => (props.small ? "14px" : "18px")};
  line-height: ${(props) => (props.small ? "16px" : "21px")};
  color: #0e0d3d;
  margin-bottom: 30px;
  margin-right: auto;
  &:before {
    content: "";
    display: inline-block;
    background: #ff416e;
    margin-right: 20px;
    width: 70px;
    height: 1px;
    margin-bottom: 4px;
  }
  @media (max-width: 768px) {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
`;
