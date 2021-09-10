import React, { FC, useRef, useState } from 'react';
import { ReactComponent as Icon } from '../../assets/svg/selectArrow.svg';
import useOnClickOutside from '../../hooks/useOutsideHook';
import * as Styled from './Select.elements';

type SelectProps = {
  options: string[];
  label?: string;
  selectedOption: null | string;
  setSelectedOption: (selectedOption: string) => void;
};

export const Select: FC<SelectProps> = ({
  options,
  label,
  selectedOption,
  setSelectedOption,
}: SelectProps) => {
  // const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeList, setActiveList] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const toggling = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  // console.log(selectedOption);
  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeList === 0) {
        return;
      }
      setActiveList(activeList - 1);
    } else if (e.key === 'ArrowDown') {
      if (activeList >= options.length - 1) {
        return setActiveList(0);
      }
      setActiveList(activeList + 1);
    } else if (e.key === 'Enter') {
      const value = options[activeList];
      onOptionClicked(value);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Styled.DropDownContainer ref={ref}>
        <Styled.DropDownHeader tabIndex={0} onClick={toggling} onKeyDown={onKeyDown}>
          {selectedOption || ''}
          {label && <span data-label={label} />}
          <Styled.Arrow rotat={isOpen}>
            <Icon />
          </Styled.Arrow>
        </Styled.DropDownHeader>
        {isOpen && (
          <Styled.SelectList>
            {options.map((option, idx) => (
              <Styled.ListItem
                active={activeList === idx}
                onClick={() => onOptionClicked(option)}
                key={`select-option-item-${idx}`}
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
