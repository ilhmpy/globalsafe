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
  @media only screen and (max-device-width: 480px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const FiltersBox = styled.div`
  width: 100%;
  height: 26px;
  border: 1px solid #EBEBF2;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: 400;
  font-size: 12px;
  opacity: 60%;
  color: #000;
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

export const FiltersResetModal = styled.div<{ show: boolean; }>`
  display: ${({ show }) => show ? "block" : "none"};
  position: absolute;
  right: 10px;
  top: 28px;
  background: #f9fafb;
  width: 119px;
`;

export const FiltersResetItem = styled.h3`
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: rgba(0,0,0,.6);
  font-weight: 400;
`;