import styled from 'styled-components/macro';

export const Chip = styled.div`
  font-size: 12px;
  line-height: 14px;
  display: inline-block;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  padding: 6px 10px;
  color: #000000;
  user-select: none;
`;

export const ChipWrap = styled.div<{ small?: boolean }>`
  margin-bottom: ${(props) => (props.small ? 20 : 40)}px;
`;
