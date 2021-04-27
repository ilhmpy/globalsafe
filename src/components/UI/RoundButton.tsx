import styled from "styled-components/macro";
import icon from "../../assets/svg/checkicon.svg";
import lockopen from "../../assets/svg/lockopen.svg";
import lockclose from "../../assets/svg/lockclose.svg";
import info from "../../assets/svg/info.svg";

export const RoundButton = styled.div`
  width: 24px;
  height: 24px;
  background-color: #bcd476;
  border-radius: 50%;
  /* background-image: url(${icon}); */
  display: block;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 11px;
  position: relative;
  &:after {
    border-color: ${(props) => props.theme.inputBg};
    border-style: solid;
    border-width: 0 1px 1px 0;
    content: "";
    height: 9px;
    left: 10px;
    position: absolute;
    top: 6px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(39deg);
    width: 5px;
  }
`;

export const LockButton = styled.button`
  appearance: none;
  border-radius: 50%;
  border: 2px solid #ff416e;
  background: url(${lockclose}) no-repeat center;
  background-size: 11px;
  height: 24px;
  width: 24px;
  &:focus {
    outline: none;
  }
`;

export const UnLockButton = styled(LockButton)`
  background: url(${lockopen}) no-repeat center;
  border-color: #bcd476;
`;

export const InfoButton = styled(LockButton)`
  background: url(${info}) no-repeat center;
`;
