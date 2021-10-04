import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/Button';
import { H2 } from '../../../../components/UI/MainStyled';
import { Page } from '../../../../components/UI/Page';
import { UpTitle } from '../../../../components/UI/UpTitle';
import { AppContext } from '../../../../context/HubContext';
import { Card, Container } from '../../../../globalStyles';
import { Balance } from '../../../../types/balance';
import { ArrList, RootLottery } from '../../../../types/lottery';
import { Timer } from '../Lottery/Timer';

type Props = {
  onOpenModal: () => void;
  clock: number | null;
};

export const DrawHistory: FC<Props> = ({ onOpenModal, clock }: Props) => {
  const [notifyList, setNotifyList] = useState<ArrList[]>([]);
  const [num, setNum] = useState(0);
  const [show, setShow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    let clean = false;
    const cb = (data: any) => {
      console.log('DrawResult history', data);
      !clean && repeat();
    };
    if (hubConnection) {
      hubConnection.on('DrawResult', cb);
      hubConnection
        .invoke<RootLottery>('GetPrizes', 0, 5)
        .then((res) => {
          const arrList = res.collection.map((item) => ({
            name: item.userName,
            kind: item.definition.kind,
            date: item.drawLog.drawDate,
            volume: item.definition.volume,
            balanceKind: item.definition.balanceKind,
          }));
          !clean && setNotifyList(arrList);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      hubConnection?.off('DrawResult', cb);
      clean = true;
    };
  }, [hubConnection]);

  useEffect(() => setIsMobile(window.screen.width < 600), []);

  const repeat = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootLottery>('GetPrizes', 0, 5)
        .then((res) => {
          setShow(true);
          console.log('GetPrizes res', res);
          const arrList = res.collection.map((item) => ({
            name: item.userName,
            kind: item.definition.kind,
            date: item.drawLog.drawDate,
            volume: item.definition.volume,
            balanceKind: item.definition.balanceKind,
          }));
          setNotifyList(arrList);
        })
        .catch((e) => console.log(e));
    }
  };

  const { t } = useTranslation();

  const typeWin = (id: number) => {
    if (id === 0) {
      return t('win.one');
    } else if (id === 1) {
      return t('win.two');
    } else if (id === 2) {
      return t('win.three');
    }
  };

  const add = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootLottery>('GetPrizes', 5, 5)
        .then((res) => {
          const arrList = res.collection.map((item) => ({
            name: item.userName,
            kind: item.definition.kind,
            date: item.drawLog.drawDate,
            volume: item.definition.volume,
            balanceKind: item.definition.balanceKind,
          }));
          setNotifyList((notifyList) => [...notifyList, ...arrList]);
        })
        .catch((e) => console.log(e));
    }
    setShow(false);
  };

  return (
    <Page id="lottery" margin>
      <Container>
        <UpTitle small>{t('draws')}</UpTitle>
      </Container>
      <Container bigMargin>
        <H2>{t('historyLottery')}</H2>
      </Container>

      <Container>
        <TimerHistoryContainer alfa onClick={onOpenModal}>
          <Timer modalTimer />
          <Button danger>{t('goDraw')}</Button>
        </TimerHistoryContainer>
      </Container>

      <TableContainer>
        <TableList dn>
          <TableItemHead>{t('lotteryTable.date')}</TableItemHead>
          <TableItemHead>{t('lotteryTable.typeWin')}</TableItemHead>
          <TableItemHead>{t('lotteryTable.sumWin')}</TableItemHead>
          <TableItemHead> {t('lotteryTable.winners')}</TableItemHead>
        </TableList>
        <TransitionGroup>
          {notifyList.length &&
            notifyList.map((item, idx) => {
              if (!isMobile) {
                return (
                  <CSSTransition key={idx} timeout={500} classNames="item">
                    <TableList card>
                      <TableItem>{moment(item.date).format('DD.MM.YYYY')}</TableItem>
                      <TableItem>{typeWin(item.kind)}</TableItem>
                      <TableItem>
                        {item.kind === 0
                          ? (item.volume / 100000).toLocaleString('ru-RU', {
                              maximumFractionDigits: 5,
                            })
                          : item.kind === 1
                          ? ''
                          : item.volume}
                        &nbsp;
                        {item.volume ? Balance[item.balanceKind] : '-'}
                      </TableItem>
                      <TableItem>
                        <Value data-title={item.name}>{item.name}</Value>
                      </TableItem>
                    </TableList>
                  </CSSTransition>
                );
              } else {
                return (
                  <CSSTransition key={idx} timeout={500} classNames="item">
                    <TableList card>
                      <TableItem>{moment(item.date).format('DD.MM.YYYY')}</TableItem>
                      <TableItem>
                        {item.kind === 0
                          ? (item.volume / 100000).toLocaleString('ru-RU', {
                              maximumFractionDigits: 5,
                            })
                          : item.kind === 1
                          ? t('win.two')
                          : item.volume}
                        &nbsp;
                        {item.volume ? Balance[item.balanceKind] : '-'}
                      </TableItem>
                      {/* <TableItem>
                        {item.volume
                          ? (item.volume / 100000).toLocaleString('ru-RU', {
                              maximumFractionDigits: 5,
                            }) +
                            ' ' +
                            'CWD'
                          : typeWin(Number(item.kind))}
                      </TableItem> */}
                      <TableItem>
                        <Value data-title={item.name}>{item.name}</Value>
                      </TableItem>
                    </TableList>
                  </CSSTransition>
                );
              }
            })}
        </TransitionGroup>
        {show && (
          <Button dangerOutline onClick={add}>
            {t('operation.showMore')}
          </Button>
        )}
      </TableContainer>
    </Page>
  );
};

const TimerHistoryContainer = styled(Card)`
  width: 100%;
  padding: 20px 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 768px) {
    justify-content: center;
    padding: 20px;
  }
`;

const TableContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  ${Button} {
    margin: 30px auto;
    width: 160px;
  }
`;

const TableList = styled.ul<{ card?: boolean; dn?: boolean }>`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 10px 50px;
  margin-bottom: 18px;
  background: ${(props) => (props.card ? props.theme.card.backgroundAlfa : 'transparent')};
  box-shadow: ${(props) => (props.card ? '0px 1px 3px rgba(0, 0, 0, 0.25)' : 'none')};
  border-radius: 20px;
  border: ${(props) => (props.card ? props.theme.card.border : 'none')};
  @media (max-width: 992px) {
    padding: 10px 15px;
  }
  @media (max-width: 768px) {
    padding: 10px 5px;
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px 15px;
    display: ${(props) => (props.dn ? 'none' : 'flex')};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 19px;
    padding-bottom: 5px;
  }
  ${(props) => {
    if (props.card) {
      return `
            background: ${({ theme }: any) => theme.card.backgroundAlfa};
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
            border-radius: 20px;
            border: ${({ theme }: any) => theme.card.border};
          `;
    }
  }}
`;

const TableItem = styled.li`
  letter-spacing: 0.1px;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  width: 100%;
  color: ${(props) => props.theme.text2};
  padding-right: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 576px) {
    padding-bottom: 12px;
  }
  @media (max-width: 576px) {
    text-align: left;
  }
  &:nth-child(1) {
    max-width: 150px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
  &:nth-child(2) {
    max-width: 200px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
  &:nth-child(3) {
    max-width: 200px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
  &:nth-child(4) {
    max-width: 200px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
  @media only screen and (max-device-width: 600px) {
    text-align: left;
  }
`;

const TableItemHead = styled(TableItem)`
  color: ${(props) => props.theme.text2};
  @media (max-width: 576px) {
    display: none;
  }
`;

const Value = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  // display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  color: #ff416e;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    cursor: pointer;
  }

  &:hover:after {
    background: rgba(0, 0, 0, 0.25);
    box-shadow: 0 10зч 20px rgba(0, 0, 0, 0.7);
    color: #fff;
    margin-top: -30px;
    left: 68%;
    content: attr(data-title);
    position: absolute;
    z-index: 1;
    padding-top: 1px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 5px;
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
    text-align: left;
    justify-content: flex-start;
    span {
      display: block;
      width: 100%;
    }
  }
`;
