import styled, {css} from 'styled-components/macro';
import { FilterButton as BaseFilterButton } from '../components/ui';
import { Device } from '../consts';

interface SubHeaderProps {
  hidden?: boolean; 
  mobileHidden?: boolean; 
  mobileVisible?: boolean;
};

export const SubHeader = styled.div<SubHeaderProps>`
  display: ${props => props.hidden ? 'none' : 'flex'};
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  @media ${Device.mobile} {
    display: ${props => props.mobileHidden ? 'none' : props.mobileVisible ? 'flex' : 'flex'};
  };
`;

export const Filters = styled.div<{hidden?: boolean; smHidden?: boolean; smVisible?: boolean; mB?: number;}>`
  display: ${props => props.hidden ? 'none' : 'flex'};
  margin-bottom: ${props => props.mB ? props.mB : 20}px;

  @media ${Device.mobile} {
    ${props => props.smHidden && css`display: none`};
    ${props => props.smVisible && css`display: flex`};
  }
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
  @media ${Device.mobile} {
    margin-bottom: 20px;
  };
`;

export const TitleContainer = styled.div`
  margin-bottom: 20px;
  @media ${Device.mobile} {
    margin-bottom: 10px;
  };
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

export const AdvertTypeText = styled.p`
  display: none;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${props => props.theme.black};  

  @media ${Device.mobile} {
    display: block;
  };
`;