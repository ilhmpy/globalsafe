import styled from 'styled-components/macro';
import { FilterButton } from '../components/ui';

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const Filters = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-bottom: 10px;
  ${FilterButton} {
    margin: 0 10px 10px 9px;
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Line = styled.span`
  height: 26px;
  width: 1px;
  background: #ebebf2;
`;

export const ButtonWrap = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;
