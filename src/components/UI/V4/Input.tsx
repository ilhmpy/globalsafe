import { FC } from 'react';
import styled from 'styled-components';
import { ReactComponent as ErrorIcon } from '../../../assets/svg/inputError.svg';
import { ReactComponent as SuccessIcon } from '../../../assets/svg/inputSuccess.svg';
import { Tooltip } from './index';

interface InputProps {
  className?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  error?: string;
  isValid?: boolean;
  mb?: number;
}

export const Input: FC<InputProps> = ({
  className,
  name,
  placeholder,
  disabled,
  value,
  onChange,
  onBlur,
  autoComplete,
  error,
  isValid,
  mb = 0,
}: InputProps) => {
  return (
    <Wrapper className={className} mb={mb}>
      <BaseInput
        type="text"
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        hasError={!!error}
      />
      {error && (
        <IconBlock>
          <Tooltip label={error} direction="right" revertOnMobile={true}>
            <ErrorIcon />
          </Tooltip>
        </IconBlock>
      )}
      {isValid && (
        <IconBlock>
          <SuccessIcon />
        </IconBlock>
      )}
    </Wrapper>
  );
};

Input.defaultProps = {
  // eslint-disable-next-line
  onBlur: () => {},
  error: undefined,
  isValid: false,
};

const Wrapper = styled.div<{ mb: number }>`
  position: relative;
  margin-bottom: ${(props) => props.mb}px;
`;

const IconBlock = styled.div`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
`;

const BaseInput = styled.input<{ hasError: boolean }>`
  height: 40px;
  padding: 12px;
  font-size: 14px;
  line-height: 16px;
  border-radius: 4px;
  background-color: #f9fafb;
  border: 1px solid ${(props) => (props.hasError ? '#FF4A31' : '#EDF0F7')};
  outline: none;
  width: 100%;
  color: ${(props) => (props.hasError ? '#FF4A31' : props.theme.black)};

  &::placeholder {
    color: ${(props) => props.theme.black};
    opacity: 0.4;
  }
`;
