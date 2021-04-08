import React, { useState, useRef, FC, useEffect } from "react";
import * as Styled from "./Select.elements";
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
        <Styled.Li key={item.id}>
          <Styled.LabelContainer st>
            <Styled.CheckboxInput
              type="checkbox"
              name={item.label}
              checked={item.checked}
              onChange={(e) => addList(e, item.id)}
            />
            <Styled.CheckboxIcon />
            <span>{item.label}</span>
          </Styled.LabelContainer>
        </Styled.Li>
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
      <Styled.Container ref={ref}>
        <Styled.CustomSelect onClick={() => setShow(!show)}>
          <Styled.InputWrap>
            {checkList.length === 0 && placeholder && (
              <Styled.Placeholder>{placeholder}</Styled.Placeholder>
            )}
            {checkList.map((i: any) => (
              <Styled.InputItem key={i.id}>
                <span>{i.label},&nbsp;</span>
              </Styled.InputItem>
            ))}
          </Styled.InputWrap>
          <Styled.Arrow rotat={show}>
            <Icon />
          </Styled.Arrow>
        </Styled.CustomSelect>
        <Styled.List rotat={show}>
          <Styled.Li></Styled.Li>
          <ListItems data={list} addList={addList} />
        </Styled.List>
      </Styled.Container>
    </>
  );
};
