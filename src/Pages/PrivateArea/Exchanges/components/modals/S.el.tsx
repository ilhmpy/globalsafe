import styled, {css} from 'styled-components/macro';
import { Button } from '../../../../../components/Button/V2/Button';
import { Device } from '../../../consts';

export const Container = styled.div<{wFull?: boolean; mobileWFull?: boolean}>`
  width: ${props => props.wFull ? '100%' : '338px'};
  background: #fff;

  @media ${Device.mobile} {
    ${props => props.mobileWFull !== undefined && css`width: 100%;`};
  };
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.v2.text};
  margin-bottom: 40px;

  @media ${Device.mobile} {
    margin-bottom: 0;
    text-align: left;
    font-weight: 900;
    font-size: 18px;
    line-height: 21px;
    padding: 20px;
    background-color: #f8f9fa;
    color: ${props => props.theme.v2.text};
  };
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

export const Buttons = styled.div`
  display: flex;
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
  ${Button} {
    flex: 1;
    padding: 12px 12px 11px;
    &:last-child {
      margin-left: 20px;
      @media (max-width: 576px) {
        margin-left: 0px;
        margin-top: 15px;
      }
    }
    @media (max-width: 576px) {
      width: 100%;
      flex: none;
    }
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  @media ${Device.mobile} {
    margin-bottom: 20px;
  };
`;

export const Listitem = styled.li`
  display: flex;
  margin-bottom: 10px;
`;

export const ListitemName = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`;

export const ListitemValue = styled(ListitemName)`
  font-weight: bold;
`;

export const Line = styled.span`
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
  flex: 1;

  @media ${Device.mobile} {
    opacity: 0;
  };
`;

export const Reason = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #ff4a31;
  margin-bottom: 20px;
`;

export const Desc = styled.p<{largeMb?: boolean}>`
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  margin-bottom: ${props => props.largeMb ? 20 : 10}px;
`;

export const SmallContainer = styled.div<{wFull?: boolean; mobileWFull?: boolean}>`
  width: ${props => props.wFull ? '100%' : '340px'};
  background: #fff;
  display: flex;
  flex-direction: column;

  @media ${Device.mobile} {
    ${props => props.mobileWFull !== undefined && css`width: 100%;`};
  };
`;

export const BlackTitle = styled(Title)`
  margin-top: 8px;
  color: ${(props) => props.theme.black};
`;

export const DataList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

interface DataListItemProps {
  justifyEnd?: boolean; 
  spaceBetween?: boolean; 
  mb?: number; 
  mbMobile?: number; 
  mobileColumn?: boolean;
  mobileAlign?: 'start' | 'end';
  mobileJustify?: 'start' | 'end';
}
export const DataListItem = styled.div<DataListItemProps>`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: ${props => props.justifyEnd ? 'flex-end' : props.spaceBetween ? 'space-between' : 'flex-start'};
  margin-bottom: ${props => props.mb ? props.mb : 10}px;

  @media ${Device.mobile} {
    ${props => props.mbMobile !== undefined && css`margin-bottom: ${props.mbMobile}px`};
    flex-direction: ${props => props.mobileColumn ? 'column' : 'row'};
    align-items: ${props => props.mobileAlign === 'start' ? 'flex-start' : 'flex-end'};
    justify-content: ${props => props.mobileJustify === 'start' ? 'flex-start' : 'flex-end'};
  };
`;

export const ListItemDivider = styled.div`
  flex: 1;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);

  @media ${Device.mobile} {
    opacity: 0;
  };
`;

export const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MobileHeader = styled.div`
  padding: 20px;
`;

export const MobileContent = styled.div`
  display: flex;
  flex-direction: column;

  @media ${Device.mobile} {
    background: #FFFFFF;
    box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
    padding: 20px;
  };
`;