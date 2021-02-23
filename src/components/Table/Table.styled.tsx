import styled from "styled-components/macro";

export const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: 992px) {
    font-weight: 400;
  }
`;

export const NameData = styled.div<{ green?: boolean }>`
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.green ? "#c9da99" : "#515172")};
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    font-size: 10px;
  }
`;

export const Text = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #515172;
`;
