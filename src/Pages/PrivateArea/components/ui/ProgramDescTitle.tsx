import styled from 'styled-components/macro';

export const ProgramDescTitle = styled.p`
  position: relative;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  margin-bottom: 2px;
  user-select: none;
  display: flex;
  align-items: center;
  svg {
    margin-left: 5px;
  }
`;

export const ProgramDesc = styled(ProgramDescTitle)`
  font-weight: normal;
  max-width: 260px;
  width: 100%;
`;

export const TitleWrap = styled.div<{ small?: boolean; big?: boolean }>`
  margin-bottom: ${(props) => (props.small ? 4 : props.big ? 20 : 10)}px;
`;

export const TextValue = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`;
