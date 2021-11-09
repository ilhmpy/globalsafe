import { FC } from 'react';
import styled from 'styled-components';

import { BaseButton, Title } from './Button.style';
import { ButtonProps } from './index';

export const PrimaryButton: FC<ButtonProps> = ({
  className,
  title,
  onClick,
  disabled = false,
  type = 'button',
  block = false,
}: ButtonProps) => {
  return (
    <Primary className={className} disabled={disabled} onClick={onClick} type={type} block={block}>
      <Title>{title}</Title>
    </Primary>
  );
};

PrimaryButton.defaultProps = {
  // eslint-disable-next-line
  onClick: () => {},
};

const Primary = styled(BaseButton)`
  height: 40px;
  background-color: ${(props) => props.theme.blue};
`;
