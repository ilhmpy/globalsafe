import styled from 'styled-components';
import { Container } from '../../../../components/UI/Container';

export const TilesContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0;
`;

export const BottomValue = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

export const BottomTitle = styled.span`
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
`;

export const BottomSide = styled.div`
  border-radius: 0px 0px 4px 4px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const TopSide = styled.div`
  position: relative;
  background: ${(props) => props.theme.lkMain.tileTopSide};

  border-radius: 4px 4px 0px 0px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DateRange = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`;

export const BoxAmount = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const BoxTitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
`;

export const BlockBox = styled.div`
  max-width: 250px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.lkMain.tileTopSide};
  box-sizing: border-box;
  border-radius: 4px;
  color: ${(props) => props.theme.lkMain.navLink};

  background: ${(props) => props.theme.lkMain.balanceBlock};

  @media (max-width: 768px) {
    max-width: 280px;
  }
`;
