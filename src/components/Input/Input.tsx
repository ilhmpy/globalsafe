import { ChangeEvent, FC, KeyboardEventHandler } from 'react';
import styled from 'styled-components';

interface IProps {
  placeholder?: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: any) => void;
  disabled?: boolean;
  type?: string;
  required?: boolean;
  step?: string;
  min?: string;
  pattern?: string;
}

export const Input: FC<IProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  disabled,
  required,
  step,
  min,
  pattern,
  onKeyPress,
}: IProps) => {
  return (
    <InputUI
      onKeyPress={onKeyPress}
      pattern={pattern}
      min={min}
      step={step}
      required={required}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export const InputUI = styled.input`
  width: 100%;
  border: 1px solid #edf0f7;
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 0 12px;
  font-weight: normal;
  background: #f9fafb;
  font-size: 14px;
  line-height: 16px;
  color: #000000;

  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    opacity: 0.4;
    color: #000000;
  }
`;
