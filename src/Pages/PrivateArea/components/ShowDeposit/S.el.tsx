import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const Blocks = styled.ul`
  list-style: none;
  font-size: 0;
`;

export const Block = styled.li`
  display: flex;
  border-bottom: 1px solid #ebebf2;
  padding: 39px 0;
  @media (max-width: 576px) {
    flex-wrap: wrap;
    padding: 20px 0;
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
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
