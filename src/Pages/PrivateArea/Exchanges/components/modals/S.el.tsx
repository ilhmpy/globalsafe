import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 420px;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.v2.text};
  margin-bottom: 40px;
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

export const DataListItem = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export const ListItemDivider = styled.div`
  flex: 1;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
`;