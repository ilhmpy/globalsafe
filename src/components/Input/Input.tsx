import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { Device } from '../../Pages/PrivateArea/consts';

interface IProps {
  placeholder?: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: any) => void;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
  type?: string;
  required?: boolean;
  suffix?: string;
}

export const Input: FC<IProps> = ({
  placeholder,
  name,
  value,
  onChange,
  disabled,
  className = '',
  readOnly = false,
  type,
  required,
  suffix
}: IProps) => {
  return (
    <InputWrapper>
      <InputUI
        className={className}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        type={type}
        required={required}
        autoComplete={'off'}
      />
      {suffix ? <InputSuffix>{suffix}</InputSuffix> : null}
    </InputWrapper>
  );
};

export const InputWrapper = styled.div`
  position: relative;
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    max-width: 200px;
  };
  @media ${Device.mobile} {
    max-width: 100%;
  };
`;

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
    background: ${props => props.theme.white};
  }
  &:read-only {
    background: #f9fafb;
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

  &:disabled {
    opacity: .4;
  }

  &:hover {
    border-color: #D6D8DE;
  }
`;

export const InputSuffix = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #000000;

  position: absolute;
  right: 12px;
  top: 12px;
`;
