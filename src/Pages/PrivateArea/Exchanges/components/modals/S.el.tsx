import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 420px;
  background: #fff;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.v2.text};
  margin-bottom: 40px;
`;

export const DropdonwConatainer = styled.div<{ big?: boolean }>`
  margin-bottom: ${(props) => (props.big ? 20 : 10)}px;
`;
