import React, { FC } from 'react';
import styled from 'styled-components/macro';
import bord from '../../assets/svg/borderinput.svg';

type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLng: number;
};

export const ProcentInput: FC<Props> = ({ onChange, value, label, placeholder, maxLng }: Props) => {
  return (
    <Container>
      <InputWrap>
        <Label>{label}</Label>
        <Input maxLength={maxLng} type="text" value={value} placeholder={placeholder} onChange={onChange} />
        <Val>%</Val>
      </InputWrap>
    </Container>
  );
};

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
  position: relative;
`;

const Label = styled.span`
  top: 0;
  left: -3px;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 9;
  padding: 0 6px;
  display: inline-block;
  margin: -14px auto 0;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.thHead};
  position: absolute;
  text-align: center;
  width: 76px;
`;

const Val = styled.span`
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
`;

const Container = styled.div`
  /* border: 1px solid #ff416e; */
  background: url(${bord}) no-repeat center;
  border-radius: 24px;
  padding: 10px 12px 0;
  height: 42px;
  width: 115px;
  position: relative;
  margin-left: 25px;
`;
