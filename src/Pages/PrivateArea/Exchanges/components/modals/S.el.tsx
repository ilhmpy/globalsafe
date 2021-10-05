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

export const Label = styled.div<{ active?: boolean; dis?: boolean }>`
  font-size: 14px;
  line-height: 20px;
  margin-left: 10px;
  color: ${(props) => (props.active ? '#0094FF' : props.dis ? 'rgba(0, 0, 0, 0.2)' : '#000')};
`;

export const Hr = styled.hr`
  background: #ebebf2;
  width: 100%;
  height: 1px;
`;
