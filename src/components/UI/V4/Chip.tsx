import { FC } from 'react';
import styled from 'styled-components';

interface ChipProps {
  className?: string;
  children: React.ReactNode;
  leftIcon?: React.ReactNode | null;
  bgColor?: string;
}

export const Chip: FC<ChipProps> = ({
  className,
  children,
  leftIcon,
  bgColor = '#E0F8FF',
}: ChipProps) => {
  return (
    <ChipContainer className={className} bgColor={bgColor}>
      {leftIcon && <ChipLeftIconBlock>{leftIcon}</ChipLeftIconBlock>}
      <ChipText>{children}</ChipText>
    </ChipContainer>
  );
};

Chip.defaultProps = {
  className: '',
  bgColor: '#E0F8FF',
};

const ChipContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  color: #3f3e4e;
  border-radius: 2px;
`;

const ChipText = styled.div`
  color: #3f3e4e;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
`;

const ChipLeftIconBlock = styled.div`
  display: inline-flex;
  color: #3f3e4e;
  margin-right: 10px;
`;
