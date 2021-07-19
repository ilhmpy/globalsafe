import React, { FC } from 'react';
import styled from 'styled-components/macro';
import bord from '../../assets/svg/borderinput.svg';

type Props = {
  label: string;
  onValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
};

export function AcceptAllInput({ label, placeholder, onValue, value }: any) {
  return (
    <>
      <Container>
        <InputWrap>
          <Label>{label}</Label>
          <Input
            type="text"
            placeholder={placeholder}
            defaultValue={value}
            onChange={onValue}
          />
        </InputWrap>
      </Container>
    </>
  );
};

const Container = styled.div`
  border-radius: 24px;
  padding: 10px 12px 0;
  height: 42px;
  width: 100%;
  max-width: 200px;
  position: relative;
  margin-left: 25px;
  border-radius: 24px;
  border: 1px solid #FF416E;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  width: 100%;
`;

const Label = styled.span`
  top: -2px;
  left: -3px;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 9;
  background: ${({ theme }) => theme.acceptAll.bg};
  padding: 0 6px;
  display: inline-block;
  margin: -14px auto 0;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.thHead};
  position: absolute;
  text-align: center;
  width: 76px;
  font-weight: 400;
`;


const Input = styled.input`
  font-size: 14px;
  line-height: 16px;
  border: none;
  outline: none;
  text-align: right;
  height: 20px;
  width: 100%;
  font-weight: bold;
  padding-right: 1px;
  color: ${(props) => props.theme.text};
  padding-top: 2px;
  text-align: center;
  background: transparent;
`;

const Val = styled.span`
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
  display: inline;
  text-align: center;
`;
