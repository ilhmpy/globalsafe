import styled from "styled-components/macro";

export const Placeholder = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: rgba(86, 101, 127, 0.6);
`;

export const MobileFilter = () => {
  return <div></div>;
};

export const InputItem = styled.div`
  span {
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #515172;
    white-space: nowrap;
  }
  display: inline-block;
`;

export const CustomSelect = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-right: 32px;
`;

export const Container = styled.div`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;

  min-height: 40px;
  position: relative;
`;

export const Arrow = styled.div<{ rotat?: boolean }>`
  margin-right: 0px;
  transform: ${(props) => (props.rotat ? "rotate(0deg)" : "rotate(-90deg)")};
  transition: 0.2s ease;
`;

export const List = styled.ul<{ rotat?: boolean }>`
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background: #ffffff;
  z-index: 9999;
  border: ${(props) => (props.rotat ? "1px" : "0")} solid
    rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 0px 0px 4px 4px;
  transition: height 0.2s ease;
  overflow: hidden;
  height: ${(props) => (props.rotat ? "auto" : "0")};
`;

export const Li = styled.li`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 0.1px;
  color: #515172;
  padding: 6px 20px;
  &:first-child {
    span {
      margin-left: auto;
      cursor: pointer;
    }
  }
  &:last-child {
    padding-bottom: 20px;
  }
`;

export const CheckboxIcon = styled.div`
  background: transparent;
  border: 1px solid rgba(81, 81, 114, 0.3);
  border-radius: 1px;
  display: block;
  height: 14px;
  width: 14px;
  left: 0;
  position: relative;
  top: 0;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  &:after {
    border-color: transparent;
    border-style: solid;
    border-width: 0 1px 1px 0;
    content: "";
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg);
    width: 3px;
    transition-duration: 0.1s;
    transition-property: border-color;
    transition-timing-function: cubic-bezier(0.33, 0.96, 0.49, 1.01);
  }
`;

export const CheckboxInput = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
  &:checked ~ ${CheckboxIcon}:after {
    border-color: #515172;
  }
  &:checked ~ ${CheckboxIcon} {
    border-color: #515172;
  }
`;

export const LabelContainer = styled.label<{ st?: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.st ? "flex-start" : "space-between")};
  position: relative;
  ${(props) => {
    if (props.st) {
      return `
            span{
                padding-left: 25px;
            }
          `;
    }
  }}
`;
