import styled from 'styled-components';

export const BlockWrapper = styled.div<{ big?: boolean }>`
  margin-bottom: ${(props) => (props.big ? 40 : 20)}px;
`;

export const BlockWrapperInner = styled.div`
  margin-left: 25px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const TextValue = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`;

export const FieldContainer = styled.div`
  margin-bottom: 40px;
`;

export const LabelRadio = styled.div<{ blue?: boolean }>`
  color: ${(props) => (props.blue ? '#0094FF' : '#000')};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-left: 10px;
`;

export const RadioWrap = styled.div`
  margin-bottom: 10px;
`;

export const CopyButton = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

export const NumberBlock = styled.div`
  display: flex;
  align-items: flex-start;
`;
