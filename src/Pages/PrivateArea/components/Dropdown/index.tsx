import React, { FC, useContext, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ReactComponent as LightIcon } from '../../../../assets/v2/svg/down-arrow.svg';
import { ReactComponent as DarkIcon } from '../../../../assets//svg/dark-down-arrow.svg';
import { ThemeContext } from '../../../../context/ThemeContext';
import useOnClickOutside from '../../../../hooks/useOutsideHook';
import * as Styled from './S.el';

type SelectProps = {
  options: string[];
  label?: string;
  selectedOption: string | null;
  setSelectedOption: (selectedOption: string) => void;
};

export const Dropdown: FC<SelectProps> = ({
  options,
  label,
  selectedOption,
  setSelectedOption,
}: SelectProps) => {
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
  const { theme } = useContext(ThemeContext);

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
    <div>
      <Styled.DropDownContainer ref={ref}>
        <Styled.DropDownHeader tabIndex={0} onClick={toggling} onKeyDown={onKeyDown}>
          {selectedOption ? selectedOption : label ? label : ''}

          <Styled.Arrow rotat={true}>
            <Styled.Icon />
          </Styled.Arrow>
        </Styled.DropDownHeader>
        {isOpen && (
          <Styled.SelectList>
            <Scrollbars style={{ height: '200px' }} thumbSize={52}>
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
          </Styled.SelectList>
        )}
      </Styled.DropDownContainer>
    </div>
  );
};

