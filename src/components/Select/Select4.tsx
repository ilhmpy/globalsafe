import React, { useState, useRef, FC } from "react";
import * as Styled from "./Select.elements";
import Scrollbars from "react-custom-scrollbars";
import styled from "styled-components";

import { ReactComponent as Icon } from "../../assets/svg/selectArrow.svg";
import useOnClickOutside from "../../hooks/useOutsideHook";
import { BalanceKind } from "../../types/balance";

type SelectProps = {
  options: (string | BalanceKind)[];
  selectedOption: null | (string | BalanceKind);
  setSelectedOption: (selectedOption: null | (string | BalanceKind)) => void;
  placeholder?: string;
};

export const Select: FC<SelectProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  placeholder = ''
}: SelectProps) => {
  // const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeList, setActiveList] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const toggling = () => {setIsOpen(!isOpen)};

  const onOptionClicked = (value: (string | BalanceKind)) => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  // console.log(selectedOption);
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeList === 0) {
        return;
      }
      setActiveList(activeList - 1);
    } else if (e.key === "ArrowDown") {
      if (activeList >= options.length - 1) {
        return setActiveList(0);
      }
      setActiveList(activeList + 1);
    } else if (e.key === "Enter") {
      const value = options[activeList];
      onOptionClicked(value);
    }
  }; 

  return (
    <div>
      <CustomDropDownContainer ref={ref}>
        <CustomDropDownHeader
          tabIndex={0}
          onClick={toggling}
          onKeyDown={onKeyDown}
        >
          {selectedOption || <Placeholder>{placeholder}</Placeholder>}
          <CustomArrow rotat={isOpen}>
            <Icon />
          </CustomArrow>
        </CustomDropDownHeader>
        {isOpen && (
          <CustomSelectList>
            <Scrollbars style={{ height: '160px' }}>
            {options.map((option, idx) => (
              <Styled.ListItem
                active={activeList === idx}
                onClick={() => onOptionClicked(option)}
                key={`select-option-item-${idx}`}
              >
                <Styled.Text>{option}</Styled.Text>
              </Styled.ListItem>
            ))}
          </Scrollbars>
          </CustomSelectList>
        )}
      </CustomDropDownContainer>
    </div>
  );
};

const CustomSelectList = styled(Styled.SelectList)`
    margin: 2px 20px 0 20px;
    overflow: hidden;
`;

const CustomDropDownContainer = styled(Styled.DropDownContainer)`
    margin-bottom: 20px;
`;


const CustomArrow = styled(Styled.Arrow)``;

const CustomDropDownHeader = styled(Styled.DropDownHeader)`
    margin-bottom: 20px;
    height: 42px;

    border: 1px solid #ff416e;
    box-sizing: border-box;
    border-radius: 24px;
    font-size: 14px;
    padding: 12px 10px;
    width: 100%;
    line-height: 16px;
    text-align: center;
    background: transparent;
    color: ${(props) => props.theme.text};

    ${CustomArrow} {
        position: absolute;
        right: 20px;
        top: 12px;
      }
`;


const Placeholder = styled.div`
    color: ${(props) => props.theme.text2};
`;