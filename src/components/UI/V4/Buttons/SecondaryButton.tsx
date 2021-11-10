import { FC } from 'react';
import styled from 'styled-components';

import { BaseButton, Title } from './Button.style';
import { ButtonProps } from './index';

export const SecondaryButton: FC<ButtonProps> = ({
  className,
  title,
  onClick,
  disabled = false,
  type = 'button',
  block = false,
}: ButtonProps) => {
  return (
    <Secondary
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
      block={block}
    >
      <Title>{title}</Title>
    </Secondary>
  );
};

SecondaryButton.defaultProps = {
  // eslint-disable-next-line
  onClick: () => {},
};

const Secondary = styled(BaseButton)`
  height: 38px;
  background-color: #515172;
`;
