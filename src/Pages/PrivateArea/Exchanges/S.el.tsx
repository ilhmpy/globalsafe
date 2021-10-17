import styled from 'styled-components/macro';
import { FilterButton as BaseFilterButton } from '../components/ui';

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const Filters = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const MLAutoFilterButton = styled(BaseFilterButton)`
  margin-left: auto;
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

export const Container = styled.div`
  margin-bottom: 40px;
`;

export const TitleContainer = styled.div`
  margin-bottom: 20px;
`;

export const FilterButton = styled(BaseFilterButton)`
  margin: 0 10px 0 0;
`;

