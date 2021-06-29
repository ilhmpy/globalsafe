import React, { useState, useRef, useEffect, FC } from "react";
import { ReactComponent as Pen } from "../../../assets/svg/pen.svg";
import { Checkbox } from "../../../components/UI/Checkbox";
import styled from "styled-components/macro";
import { RoundButton } from "../../../components/UI/RoundButton";

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

  const handleChange = (e: any) => {
    console.log("handleChange");
    e.stopPropagation();

    paymentsAdjust();
    setShowCheck(false);
  };

  const onBlur = (e: any) => {
    console.log("blur", e.target.localName != "input");
    setShowCheck(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowCheck(false);
    } else if (e.key === "Enter") {
      setShowCheck(false);
      paymentsAdjust();
    }
  };

  return (
    <InputIcon dis={done}>
      {showCheck && !done ? (
        <Input
          dis={done}
          disabled={done}
          onClick={(e) => e.stopPropagation()}
          onChange={onChange}
          ref={inputRef}
          value={val}
          type="text"
          onKeyDown={onKeyDown}
        />
      ) : (
        <Text
          dis={done}
          title={
            typeof +val === "number" && +val >= 0
              ? Number(val).toLocaleString("ru-RU", {
                  maximumFractionDigits: 5,
                })
              : typeof +placeholder === "number" && +placeholder >= 0
              ? Number(placeholder).toLocaleString("ru-RU", {
                  maximumFractionDigits: 5,
                })
              : "0"
          }
        >
          {typeof +val === "number" && +val >= 0
            ? Number(val).toLocaleString("ru-RU", {
                maximumFractionDigits: 5,
              })
            : typeof +placeholder === "number" && +placeholder >= 0
            ? Number(placeholder).toLocaleString("ru-RU", {
                maximumFractionDigits: 5,
              })
            : "0"}
        </Text>
      )}
      {showCheck && !done ? (
        <RoundButton onClick={(e) => handleChange(e)} />
      ) : (
        // <Checkbox checked={true} onChange={handleChange} />
        <Pen onClick={focusField} />
      )}
    </InputIcon>
  );
};

const Text = styled.div<{ dis?: boolean }>`
  color: ${(props) => (props.dis ? "#c4c4c4" : props.theme.text2)};
  width: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
      fill: ${(props) => (props.dis ? "#C4C4C4" : props.theme.text2)};
    }
    &:hover path {
      fill: ${(props) => (props.dis ? "#C4C4C4" : props.theme.text2)};
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
  position: relative;
  background: ${(props) => props.theme.card.background};
  color: ${(props) => props.theme.text};
  &:disabled {
    background: ${(props) => props.theme.card.background};
  }
  &::placeholder {
    color: ${(props) => (props.dis ? "#c4c4c4" : props.theme.text2)};
  }
  &:focus {
    background: ${(props) => props.theme.inputBg};
    border: 1px solid #56657f;
    box-sizing: border-box;
    border-radius: 9px;
    padding: 8px;
  }
`;
