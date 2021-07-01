import React, { FC, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { ReactComponent as Icon } from "../../assets/svg/selectArrow.svg";
import useOnClickOutside from "../../hooks/useOutsideHook";
import { CollectionListDeposits } from "../../types/deposits";
import * as Styled from "./Select.elements";

const ListItems = ({ data, addList }: any) => {
  const [active, setActive] = useState(-1);
  const selectFold = (foldNum: any) => {
    const current = active === foldNum ? -1 : foldNum;
    setActive(current);
  };
  const { t } = useTranslation();

  return (
    <>
      {data.map((item: any, i: number) => (
        <Styled.Li key={item.id}>
          <Styled.LabelContainer st>
            <Styled.CheckboxInput
              type="checkbox"
              name={item.label}
              checked={item.checked}
              onChange={(e) => addList(e, item.safeId)}
            />
            <Styled.CheckboxIcon />
            <span>
              {item.label}
              &nbsp;
              {(item.ratio * 100).toFixed(0)} %
            </span>
          </Styled.LabelContainer>
          <Styled.Fold
            className={`fold_trigger ${active === i ? "open" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              selectFold(i);
            }}
          >
            {t("more")}
          </Styled.Fold>
          <Styled.FoldContent
            open={active === i}
            dangerouslySetInnerHTML={{ __html: item.desc }}
          />
        </Styled.Li>
      ))}
    </>
  );
};

type Props = {
  placeholder?: string;
  values?: CollectionListDeposits[];
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
    if ((values && list.length === 0) || !checkList.length) {
      let arr = values!.map((i) => ({
        id: id++,
        label: i.name,
        desc: i.description,
        safeId: i.safeId,
        checked: false,
        ratio: i.paymentRatio,
      }));
      setList(arr);
    }
  }, [values, checkList]);

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const addList = (e: any, id: number) => {
    const { checked, name } = e.target;
    const arr = list.map((item: any) =>
      item.safeId === id ? { ...item, checked: checked } : item
    );
    setList(arr);
    const value = list.filter((i: any) => i.safeId === id)[0];
    const isValue = checkList.findIndex((i: any) => i.safeId === id);
    if (isValue === -1) {
      setCheckList([...checkList, value]);
    } else {
      const value = checkList.filter((i: any) => i.safeId !== id);
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
            {checkList.map((i: any, index: number) => (
              <Styled.InputItem key={i.id}>
                <span>
                  {index === 0 ? "" : ","}
                  &nbsp;
                  {i.label}
                </span>
              </Styled.InputItem>
            ))}
          </Styled.InputWrap>
          <Styled.Arrow rotat={show}>
            <Icon />
          </Styled.Arrow>
        </Styled.CustomSelect>
        <Styled.List rotat={show}>
          <Scrollbars style={{ height: "440px" }}>
            <Styled.Li></Styled.Li>
            <ListItems data={list} addList={addList} />
          </Scrollbars>
        </Styled.List>
      </Styled.Container>
    </>
  );
};
