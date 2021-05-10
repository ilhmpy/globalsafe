import styled from "styled-components/macro";
import { Container } from "../../../../globalStyles";
import border from "../../../../assets/svg/border.svg";
import borderTwo from "../../../../assets/svg/border2.svg";
import { Button } from "../../../../components/Button/Button";

export const BlockContainer = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const BlockItem = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  &:nth-child(2) {
    margin-left: 100px;
    @media (max-width: 768px) {
      margin-left: 0px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    margin: 20px 0px;
  }
`;

export const BlockInner = styled.div<{ mod?: boolean }>`
  margin-left: 35px;
  text-align: center;
  position: relative;
  &:before {
    content: "";
    width: ${(props) => (props.mod ? "370px" : "327px")};
    position: absolute;
    left: ${(props) => (props.mod ? "-46px" : "95px")};
    top: ${(props) => (props.mod ? "-30px" : "-39px")};
    height: 160px;
    background: ${(props) =>
      props.mod ? `url(${borderTwo})` : `url(${border})`};

    background-size: contain;
    background-repeat: no-repeat;
    @media (max-width: 768px) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

export const Img = styled.img`
  width: 260px;
  height: 260px;
  flex: none;
  border-radius: 5px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
  @media (max-width: 576px) {
    width: 90px;
    height: 90px;
  }
`;

export const BlockTitle = styled.h4<{ pad?: boolean }>`
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 12px;
  padding-left: ${(props) => (props.pad ? "20px" : "0")};
  @media (max-width: 576px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

export const BlockSubtitle = styled.p<{ pad?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  max-width: 240px;
  padding-left: ${(props) => (props.pad ? "20px" : "0")};
  color: ${(props) => props.theme.nextPay};
`;

export const Text = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 41px;
  margin-bottom: 41px;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: 20px;
  span {
    font-weight: 500;
  }
`;

export const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.text};
  display: inline-block;
  vertical-align: middle;
`;

export const ButtonIcon = styled(Button)`
  max-width: 192px;
  width: 100%;
  margin-right: auto;
  margin-bottom: 40px;
  svg {
    margin-left: 16px;
  }
`;
