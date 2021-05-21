import React, { ChangeEvent, useState, useRef, FC } from "react";
import * as Styled from "./Select.elements";
import useOnClickOutside from "../../hooks/useOutsideHook";

export const Select: FC<{ options: string[]; label: string }> = ({
  options,
  label,
}) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeList, setActiveList] = useState(0);

  const ref = useRef(null);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: any) => {
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
      let value = options[activeList];
      onOptionClicked(value);
    }
  };

  return (
    <div>
      <Styled.DropDownContainer ref={ref}>
        <Styled.DropDownHeader
          tabIndex={0}
          onClick={toggling}
          onKeyDown={onKeyDown}
        >
          {selectedOption || options[0]}
          <span data-label={label}></span>
        </Styled.DropDownHeader>
        {isOpen && (
          <Styled.SelectList>
            {options.map((option, idx) => (
              <Styled.ListItem
                active={activeList === idx}
                onClick={() => onOptionClicked(option)}
                key={Math.random()}
              >
                <Styled.Text>{option}</Styled.Text>
              </Styled.ListItem>
            ))}
          </Styled.SelectList>
        )}
      </Styled.DropDownContainer>
    </div>
  );
};
