import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

export const Blocks = styled.ul<{ pTop?: boolean }>`
  list-style: none;
  font-size: 0;
  @media (max-width: 768px) {
    padding-top: ${(props) => (props.pTop ? 10 : 0)}px;
  }
`;

export const Block = styled.li`
  display: flex;
  border-bottom: 1px solid #ebebf2;
  padding: 39px 0;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 20px 0 10px;
  }
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border: none;
    padding-bottom: 0;
  }
`;

export const BlockItem = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;
