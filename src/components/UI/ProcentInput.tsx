import styled from "styled-components/macro";
import React, { FC } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const ProcentInput: FC<Props> = ({
  onChange,
  value,
  label,
  placeholder,
}) => {
  return (
    <Container>
      <InputWrap>
        <Label>{label}</Label>
        <Input
          type="number"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <Val>%</Val>
      </InputWrap>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #ff416e;
  border-radius: 24px;
  padding: 7px 12px 0;
  height: 40px;
  width: 115px;
  position: relative;
  margin-left: 25px;
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 16px;
  border: none;
  outline: none;
  text-align: right;
  height: 20px;
  width: 50px;
  font-weight: bold;
  padding-right: 1px;
  color: ${(props) => props.theme.text};
  padding-top: 2px;
  background: transparent;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Label = styled.span`
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 9;
  padding: 0 6px;
  right: 0;
  display: inline-block;
  margin: -14px auto 0;
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

const Val = styled.span`
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
`;
