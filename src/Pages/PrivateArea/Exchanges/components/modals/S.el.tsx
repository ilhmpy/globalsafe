import styled from 'styled-components/macro';
import { Button } from '../../../../../components/Button/V2/Button';

export const Container = styled.div`
  width: 338px;
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
`;

export const Reason = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #ff4a31;
  margin-bottom: 20px;
`;

export const Desc = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  margin-bottom: 10px;
`;

export const SmallContainer = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
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

export const DataListItem = styled.div<{justifyEnd?: boolean; spaceBetween?: boolean; mb?: number;}>`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: ${props => props.justifyEnd ? 'flex-end' : props.spaceBetween ? 'space-between' : 'flex-start'};
  margin-bottom: ${props => props.mb ? props.mb : 10}px;
`;

export const ListItemDivider = styled.div`
  flex: 1;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
`;
