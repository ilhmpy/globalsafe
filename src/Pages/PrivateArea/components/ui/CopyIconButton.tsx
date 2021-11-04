import React, { FC } from 'react';
import styled from 'styled-components';
import { ReactComponent as CopyIcon } from '../../../../assets/v2/svg/copy-icon.svg';

interface CopyIconButtonProps {
  className?: string;
  copyValue: string;
}

export const CopyIconButton: FC<CopyIconButtonProps> = ({
  className = '',
  copyValue,
}: CopyIconButtonProps) => {
  const handleCopyValue = () => {
    navigator.clipboard.writeText(copyValue);
  };

  return (
    <CopyButton className={className} onClick={handleCopyValue}>
      <CopyIcon />
    </CopyButton>
  );
};

const CopyButton = styled.button`
  background-color: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
