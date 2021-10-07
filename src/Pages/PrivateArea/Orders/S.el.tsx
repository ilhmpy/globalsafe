import styled from 'styled-components/macro';

export const Container = styled.div`
  padding-bottom: 40px;
`;

export const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const BlockWrapper = styled.div<{ big?: boolean }>`
  margin-bottom: ${(props) => (props.big ? 40 : 20)}px;
`;

export const TabsWrap = styled.div`
  margin-bottom: 40px;
`;

export const Block = styled.div<{ mbBig?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.mbBig ? 40 : 20)}px;
`;

export const BlockItem = styled.div`
  width: calc(50% - 10px);
`;
