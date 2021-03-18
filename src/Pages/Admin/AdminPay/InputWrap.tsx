import React, { useState, useRef, useEffect, FC } from "react";
import { ReactComponent as Pen } from "../../../assets/svg/pen.svg";
import { Checkbox } from "../../../components/UI/Checkbox";
import styled from "styled-components/macro";

export const InputWrap: FC<{
  val: any;
  placeholder: string;
  done: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentsAdjust: () => void;
}> = ({ val, onChange, placeholder, done, paymentsAdjust }: any) => {
  const [showCheck, setShowCheck] = useState(done);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusField = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCheck(true);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, showCheck]);

  const handleChange = () => {
    setShowCheck(false);
    paymentsAdjust();
  };

  const onBlur = () => {
    setShowCheck(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowCheck(false);
    } else if (e.key === "Enter") {
      handleChange();
    }
  };

  return (
    <InputIcon dis={done}>
      {showCheck && !done ? (
        <Input
          dis={done}
          onBlur={onBlur}
          disabled={done}
          onChange={onChange}
          ref={inputRef}
          value={val}
          type="number"
          onKeyDown={onKeyDown}
        />
      ) : (
        <Text dis={done}>{+val > 0 ? val : placeholder}</Text>
      )}
      {showCheck && !done ? (
        <Checkbox checked={true} onChange={handleChange} />
      ) : (
        <Pen onClick={focusField} />
      )}
    </InputIcon>
  );
};

const Text = styled.div<{ dis?: boolean }>`
  color: ${(props) => (props.dis ? "#c4c4c4" : "#515172")};
  width: 75px;
  margin-right: 6px;
  font-size: 14px;
`;

const InputIcon = styled.div<{ dis?: boolean }>`
  display: flex;
  height: 25px;
  align-items: center;
  @media (max-width: 576px) {
    justify-content: center;
  }
  svg {
    cursor: pointer;
    path {
      transition: 0.3s;
      fill: ${(props) => (props.dis ? "#C4C4C4" : "#000")};
    }
    &:hover path {
      fill: ${(props) => (props.dis ? "#C4C4C4" : "#000")};
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
`;

const Input = styled.input<{ dis?: boolean }>`
  border: none;
  outline: none;
  width: 75px;
  margin-right: 6px;
  &:disabled {
    background: #fff;
  }
  &::placeholder {
    color: ${(props) => (props.dis ? "#c4c4c4" : "#515172")};
  }
  &:focus {
    background: #fff0f0;
    border: 1px solid #56657f;
    box-sizing: border-box;
    border-radius: 9px;
    padding: 8px;
  }
`;
