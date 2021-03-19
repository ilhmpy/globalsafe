import styled from "styled-components/macro";
import icon from "../../assets/svg/checkicon.svg";

export const RoundButton = styled.div`
  width: 24px;
  height: 24px;
  background-color: #bcd476;
  border-radius: 50%;
  background-image: url(${icon});
  display: block;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 11px;
`;
