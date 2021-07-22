import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import Vector from '../../assets/img/Vector.png';
import { ReactComponent as Left } from '../../assets/svg/left.svg';
import { Button } from '../../components/Button/Button';
import { UpTitle } from '../../components/UI/UpTitle';
import { Card } from '../../globalStyles';

export const CountText = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

export const Page = styled.div<{ dn?: boolean }>`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  @media (max-width: 600px) {
    font-size: 13px;
    min-width: 70px;
  }
  @media (max-width: 576px) {
    display: ${(props) => (props.dn ? 'none' : 'initial')};
  }
`;

export const Arrows = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 600px) {
    gap: 15px;
  }
`;

export const PaginationSelect = styled.select`
  height: 30px;
  border: none;
  outline: none;

  font-size: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};

  appearance: none;
  font-family: inherit;
  cursor: pointer;
  line-height: inherit;

  background-image: ${(props) => props.theme.pagination.selectCountBackgroundImage};

  background-position: calc(100% - 10px) calc(1em + -4px), calc(100% - 5px) calc(1em + -4px), 100% 0;
  background-size: 5px 5px, 5px 5px, 5em 5em;
  background-repeat: no-repeat;
  width: 40px;

  @media (max-width: 600px) {
    font-size: 13px;
    background-position: calc(100% - 14px) calc(1em + -2px), calc(100% - 9px) calc(1em + -2px),
      100% 0;
    width: 60px;
  }
`;

export const ArrowLeft = styled.div`
  background: url(${Vector}) no-repeat center;
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

export const ArrowRight = styled(ArrowLeft)`
  transform: rotateY(180deg);
`;

export const Pagination = styled(Card)`
  padding: 0px 30px;
  height: 55px;
  display: flex;
  align-items: center;
  gap: 45px;
  border-radius: 10px;
  @media (max-width: 600px) {
    gap: 15px;
    justify-content: space-between;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
`;

export const Tr = styled.tr`
  background-color: transparent;
  border-bottom: 1px solid rgba(66, 139, 202, 0.2);
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 22px;
  @media (max-width: 600px) {
    border-bottom: 3px solid rgba(66, 139, 202, 0.2);
    display: block;
    margin-bottom: 0.625em;
  }
`;

export const HrWritting = styled.hr`
  background: rgba(196, 196, 196, 0.3);
  margin-bottom: 15px;
  height: 1px;
  border: none;
`;

export const Th = styled.th`
  padding: 15px 5px;
  text-align: left;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  &:last-child {
    position: relative;
  }
`;

export const Thead = styled.thead`
  @media (max-width: 600px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

export const DataListDate = styled.span`
  margin: 10px auto;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: inline-block;
  padding: 10px 6px;
  background: transparent;
  width: 125px;
  text-align: center;
  border: 1px solid #ff416e;
  border-radius: 24px;
`;

export const WritingBlock = styled.div`
  width: 100%;
`;

export const WritingTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Back = styled(Link)`
  margin-right: auto;
  margin-bottom: 20px;
  color: ${(props) => props.theme.text2};
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

export const LeftIcon = styled(Left)`
  margin-right: 12px;
  fill: ${(props) => props.theme.text};
  path {
    stroke: ${(props) => props.theme.text};
  }
`;

export const InputsWrapItem = styled.div`
  margin-right: 10px;
  width: 100%;
  @media (max-width: 576px) {
    margin-right: 0px;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  background: transparent;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
`;

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 99999;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HeaderWrap = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  max-width: 1440px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  @media (max-width: 992px) {
    margin-top: 82px;
  }
`;

type ContentProps = {
  mtbig?: boolean;
  widthCont?: boolean;
};

export const Content = styled.div<ContentProps>`
  flex-grow: 1;
  transition: 0.3s;
  margin: ${(props) => (props.mtbig ? '60px auto 40px' : '30px auto 40px')};
  padding: 0 35px 0;
  padding-left: ${(props) => (props.widthCont ? '278px' : '91px')};
  @media (max-width: 1200px) {
    padding-left: 91px;
  }
  @media (max-width: 992px) {
    padding-left: 35px;
  }
  @media (max-width: 768px) {
    padding: 0 20px 0;
  }
`;

export const UserName = styled.div`
  span {
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 350px;
    @media (max-width: 576px) {
      max-width: 100px;
    }
  }
  svg {
    display: none;
    path {
      stroke: ${(props) => props.theme.text};
    }
    @media (max-width: 992px) {
      display: block;
      margin-left: 14px;
    }
  }
  margin-bottom: 14px;
  display: flex;
  align-items: center;
`;

export const TitleHead = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-right: auto;
  margin-bottom: 15px;
  @media (max-width: 992px) {
    display: none;
  }
`;

export const HeadBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 100%;
  ${UpTitle} {
    display: none;
  }
  @media (max-width: 992px) {
    ${UpTitle} {
      display: block;
      margin-left: -20px;
      margin-bottom: 14px;
      white-space: nowrap;
      &:before {
        width: 14px;
      }
    }
    justify-content: space-between;
  }
`;

export const ChartItemDate = styled.div`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #ff416e;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 12px;
  color: #606063;
  white-space: nowrap;
`;

export const PayItemHead = styled.div<{ mb?: boolean }>`
  display: flex;
  text-align: right;
  justify-content: center;
  margin: 0 auto ${(props) => (props.mb ? '12px' : '0')};
  &:last-child() {
    margin-bottom: 12px;
  }
  align-items: center;
  /* @media (max-width: 992px) {
    ${UpTitle} {
      &:before {
        width: 15px;
      }
    }
  } */
  @media (max-width: 768px) {
    margin: 0 auto ${(props) => (props.mb ? '8px' : '0')};
  }
`;

export const Radial = styled.div<{ bg: string }>`
  position: relative;
  width: 145px;
  height: 145px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  border: 7px solid ${(props) => props.bg};
  span {
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: ${(props) => props.theme.text};
  }
  @media (max-width: 576px) {
    width: 63px;
    height: 63px;
    border-width: 3px;
    span {
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

export const FilterBlock = styled(Card)`
  padding: 30px;
  transition: 0.3s;
  border-radius: 10px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const FilterName = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 4px;
  margin-bottom: 15px;
  ${Button} {
    /* margin-left: 20px; */
    height: 40px;
    @media (max-width: 992px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media (max-width: 992px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const SelectContainerLottery = styled(SelectContainer)`
  justify-content: flex-start;
  padding-top: 10px;
`;

export const SelectWrap = styled.div<{ input?: boolean }>`
  margin: 20px 20px 20px 0;
  position: relative;
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 12px 20px 12px 0;
  }
  @media (max-width: 576px) {
    margin: 12px 0px;
  }
`;

export const SelectWrapTwo = styled.div<{ mWidth?: string; mNone?: boolean }>`
  width: ${(props) => (props.mWidth ? props.mWidth : '280px')};
  margin: 20px 20px 20px 0;
  margin-right: ${(props) => (props.mNone ? '0' : '20px')};
  position: relative;
  @media (max-width: 992px) {
    max-width: ${(props) => (props.mWidth ? props.mWidth : '45%')};
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin: 12px 20px 12px 0;
  }
  @media (max-width: 576px) {
    margin: 12px 0px;
  }
`;

export const SliderWrap = styled.div`
  min-width: 265px;
  margin: 20px 20px 20px 0;
  @media (max-width: 834px) {
    width: 46%;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 12px 0px;
  }
  @media (max-width: 576px) {
    margin: 12px 0px 20px;
    min-width: 240px;
  }
`;

export const InputsCalendarWrap = styled.div`
  max-width: 133px;
  width: 100%;
  margin: 20px 10px;
  @media (max-width: 992px) {
    max-width: 75%;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 12px 10px;
  }
  @media (max-width: 576px) {
    margin: 12px 0px;
  }
`;

export const Label = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
  margin-bottom: 1px;
  position: absolute;
  left: 7px;
  padding: 0 10px;
  top: -12px;
  z-index: 9;
  background: ${(props) => props.theme.card.background};
  @media (max-width: 768px) {
    left: 10px;
    padding: 0 4px;
  }
`;

export const SelectContainerInner = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1100px) {
    flex-wrap: wrap;
  }
`;

export const SelectContainerInnerUsers = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const SelectContainerInnerPaid = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const SliderContainerInner = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1100px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const ShowHide = styled.div`
  margin-left: auto;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    cursor: initial;
  }
`;

export const InputsWrap = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const PayItem = styled.div`
  position: relative;
  display: flex;
  width: 33.3333%;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  ${UpTitle} {
    margin-bottom: 0;
    margin-right: 10px;
  }
  &:last-child {
    display: none;
  }
  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 20px;
    &:nth-child(3) {
      width: 100%;
    }
  }
`;

export const PayList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 992px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
  color: #0e0d3d;
`;

export const LotteryTable = styled.div`
  width: 100%;
  padding: 30px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const InputLottery = styled.div<{ mrn?: boolean }>`
  width: ${(props) => (props.mrn ? '165px' : '185px')};
  margin-right: ${(props) => (props.mrn ? '0' : '20px')};
  margin-bottom: 15px;
  @media (max-width: 834px) {
    width: 46%;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 20px;
  }
`;

export const SortingWindow = styled.div<{ open: boolean }>`
  position: absolute;
  width: 280px;
  background: ${(props) => props.theme.sortingWindow.backgroundColor};
  border: 1px solid rgba(86, 101, 127, 0.3);
  border-radius: 0px 0px 4px 4px;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 15px;
  padding: 30px 20px;
  z-index: 10;
  @media (max-width: 576px) {
    width: 230px;
  }
`;

export const BurgerButton = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const BurgerImg = styled.img`
  cursor: pointer;
`;

export const WindowTitle = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  text-align: start;
  color: ${(props) => props.theme.sortingWindow.fontColor};
`;

export const WindowBody = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SortingItem = styled.li<{ active: boolean }>`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.sortingWindow.fontColor};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? '600' : 'normal')};
  text-align: start;
  white-space: pre-wrap;
`;

export const ModalComponent = styled.div<{ visible: boolean }>`
  width: 90%;
  max-width: 384px;
  background: ${({ theme }) => theme.acceptAll.bg};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 0 auto;
  padding: 30px;
  position: fixed;
  z-index: 999;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  display: ${({ visible }) => (visible ? 'block' : 'none')};

  @media only screen and (max-device-width: 922px) {
    position: absolute;
    margin-top: 80px;
  }
`;

export const ModalTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ModalRule = styled.h3`
  color: ${({ theme }) => theme.acceptAll.rule};
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
`;
