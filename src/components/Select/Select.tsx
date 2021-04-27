import React, { useState, useRef, FC, useEffect } from "react";
import styled from "styled-components/macro";
import { ReactComponent as Icon } from "../../assets/svg/selectArrow.svg";
import useOnClickOutside from "../../hooks/useOutsideHook";

// const data = [
//   { id: 1, label: "Account 1", checked: false },
//   { id: 2, label: "Account 2", checked: false },
//   { id: 3, label: "Account 3", checked: false },
//   { id: 4, label: "Account 4", checked: false },
//   { id: 5, label: "Account 5", checked: false },
// ];

const ListItems = ({ data, addList }: any) => {
  return (
    <>
      {data.map((item: any) => (
        <Li key={item.id}>
          <LabelContainer>
            <span>{item.label}</span>
            <CheckboxInput
              type="checkbox"
              name={item.label}
              checked={item.checked}
              onChange={(e) => addList(e, item.id)}
            />
            <CheckboxIcon />
          </LabelContainer>
        </Li>
      ))}
    </>
  );
};

type Props = {
  placeholder?: string;
  values?: string[];
  checkList: any;
  setCheckList: (str: any) => void;
};

type Arr = {
  id: number;
  label: string;
  checked: boolean;
};

export const Select: FC<Props> = ({
  placeholder,
  values,
  setCheckList,
  checkList,
}: Props) => {
  const [show, setShow] = useState(false);
  // const [checkList, setCheckList] = useState<any>([]);
  const [list, setList] = useState<Arr[]>([]);

  useEffect(() => {
    let id = 0;
    if (values && list.length === 0) {
      let arr = values!.map((i) => ({
        id: id++,
        label: i,
        checked: false,
      }));
      setList(arr);
    }
  }, [values]);

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const resetList = () => {
    setCheckList([]);
    const newList = list;
    const arr = newList.map((item) => item && { ...item, checked: false });
    setList(arr);
  };

  const addList = (e: any, id: number) => {
    const { checked, name } = e.target;
    const arr = list.map((item) =>
      item.label === name ? { ...item, checked: checked } : item
    );
    setList(arr);
    const value = list.filter((i) => i.id === id)[0];
    const isValue = checkList.findIndex((i: any) => i.id === id);
    if (isValue === -1) {
      setCheckList([...checkList, value]);
    } else {
      const value = checkList.filter((i: any) => i.id !== id);
      setCheckList(value);
    }
  };

  return (
    <>
      <Container ref={ref}>
        <CustomSelect onClick={() => setShow(!show)}>
          <InputWrap>
            {checkList.length === 0 && placeholder && (
              <Placeholder>{placeholder}</Placeholder>
            )}
            {checkList.map((i: any) => (
              <InputItem key={i.id}>
                <span>{i.label},&nbsp;</span>
              </InputItem>
            ))}
          </InputWrap>
          <Arrow rotat={show}>
            <Icon />
          </Arrow>
        </CustomSelect>
        <List rotat={show}>
          <Li>
            <span onClick={resetList}>сбросить</span>
          </Li>
          <ListItems data={list} addList={addList} />
        </List>
      </Container>
    </>
  );
};

const Placeholder = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: rgba(86, 101, 127, 0.6);
`;

const MobileFilter = () => {
  return <div></div>;
};

const InputItem = styled.div`
  span {
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${(props) => props.theme.text2};
    white-space: nowrap;
  }
  display: inline-block;
`;

const CustomSelect = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-right: 32px;
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;

  min-height: 40px;
  position: relative;
`;

const Arrow = styled.div<{ rotat?: boolean }>`
  margin-right: 0px;
  transform: ${(props) => (props.rotat ? "rotate(0deg)" : "rotate(-90deg)")};
  transition: 0.2s ease;
`;

const List = styled.ul<{ rotat?: boolean }>`
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background: ${(props) => props.theme.card.backgroundAlfa};
  z-index: 9999;
  border: ${(props) => (props.rotat ? "1px" : "0")} solid
    rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 0px 0px 4px 4px;
  transition: height 0.2s ease;
  overflow: hidden;
  height: ${(props) => (props.rotat ? "auto" : "0")};
`;

const Li = styled.li`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
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

const CheckboxIcon = styled.span`
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

const CheckboxInput = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
  &:checked ~ ${CheckboxIcon}:after {
    border-color: ${(props) => props.theme.text2};
  }
  &:checked ~ ${CheckboxIcon} {
    border-color: ${(props) => props.theme.text2};
  }
`;

const LabelContainer = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;
