import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/Button';
import { H2 } from '../../../../components/UI/Heading';
import { Page } from '../../../../components/UI/Page';
import { AppContext } from '../../../../context/HubContext';
import { Container } from '../../../../components/UI/Container';
import { Collection, RootOperations } from '../../../../types/operations';

export const Operations = () => {
  const [notifyList, setNotifyList] = useState<Collection[]>([]);
  const [num, setNum] = useState(0);
  const [showLess, setShowLess] = useState<boolean>(false);
  const appContext = useContext(AppContext);
  const [maxItems, setMaxItems] = useState(4);
  const hubConnection = appContext.hubConnection;
  const { screen } = window;

  function req() {
    let clean = false;
    const cb = (data: Collection) => {
      !clean && setNotifyList((notifyList) => [data, ...notifyList.slice(0, -1)]);
    };
    if (hubConnection) {
      hubConnection.on('OperationNotification', cb);
      if (screen.width > 480) {
        hubConnection
          .invoke<RootOperations>('GetOperationsNotifications', [2, 4, 5, 6, 7, 8], 10, 10)
          .then((res) => {
            !clean && setNotifyList(res.collection);
          })
          .catch((e) => console.log(e));
      } else {
        hubConnection
          .invoke<RootOperations>('GetOperationsNotifications', [1, 2, 3, 4, 5], 5, 5)
          .then((res) => {
            !clean && setNotifyList(res.collection);
          })
          .catch((e) => console.log(e));
      }
    }
    return () => {
      clean = true;
      hubConnection?.off('OperationNotification', cb);
    };
  }

  useEffect(() => {
    req();
  }, [hubConnection]);

  const { t } = useTranslation();

  const operation = (id: number) => {
    if (id === 6) {
      return t('operation.open');
    } else if (id === 7) {
      return t('operation.divedents');
    } else if (id === 8) {
      return t('operation.close');
    } else if (id === 2) {
      return t('operation.withdraw');
    } else if (id === 1) {
      return t('operation.add');
    } else if (id === 3) {
      return t('operation.failed');
    } else if (id === 4) {
      return t('operation.balance');
    } else if (id === 5) {
      return t('operation.partners');
    }
  };

  const add = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootOperations>('GetOperationsNotifications', [2, 4, 5, 6, 7, 8], 4, 4)
        .then((res) => {
          setNotifyList((notifyList) => [...notifyList, ...res.collection]);
          setShowLess(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const less = () => {
    const lessNotifyList: any[] = [];
    notifyList.forEach((notify) => {
      if (lessNotifyList.length < 4) {
        lessNotifyList.push(notify);
      }
    });
    setNotifyList(lessNotifyList);
    setShowLess(false);
  };

  useEffect(() => {
    setInterval(() => {
      req();
    }, 300000);
  }, []);

  return (
    <>
      {notifyList.length > 0 ? (
        <>
          <Container page>
            <H2 mb>{t('operation.last')}</H2>
            <Description>{t('operations2.desc')}</Description>
          </Container>
          <Container pNone>
            <TableHead>
              <TableHeadItem>
                {screen.width > 480 ? t('operations2.head1') : t('operations2.time')}
              </TableHeadItem>
              <TableHeadItem>
                {screen.width > 480 ? t('operations2.head2') : t('operations2.name')}
              </TableHeadItem>
              <TableHeadItem>{t('operations2.head3')}</TableHeadItem>
            </TableHead>
            <TableMapBlock>
              {notifyList.map((itm, idx) => (
                <TableMapItem key={idx}>
                  <TableInnerItem>
                    {screen.width > 480 ? (
                      <>
                        {moment(itm.date).format('DD.MM.YYYY')} {t('in')}{' '}
                        {moment(itm.date).format('HH:MM')}
                      </>
                    ) : (
                      <>{moment(itm.date).format('HH:MM')}</>
                    )}
                  </TableInnerItem>
                  <TableInnerItem>
                    <span>
                      {operation(itm.operationKind)}{' '}
                      {screen.width > 480 ? (
                        <> {itm.depositName ? itm.depositName : ''} </>
                      ) : (
                        <>
                          <br /> {itm.depositName ? itm.depositName : ''}
                        </>
                      )}
                    </span>
                  </TableInnerItem>
                  <TableInnerItem>
                    {(itm.amount / 100000).toLocaleString('ru-RU', { maximumFractionDigits: 5 })}
                  </TableInnerItem>
                </TableMapItem>
              ))}
            </TableMapBlock>
          </Container>
        </>
      ) : (
        ''
      )}
    </>
  );
};

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
    padding-bottom: 5px;
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
    max-width: 470px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
  &:nth-child(3) {
    max-width: 240px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
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
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  color: #ff416e;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
    text-align: right;
    justify-content: flex-start;
    span {
      display: block;
      width: 100%;
    }
  }
`;

const Text = styled.div`
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  span {
    color: rgba(255, 65, 110, 1);
  }
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
`;

const Description = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.operations.descClr};
  max-width: 367px;
  margin-bottom: 40px;

  @media only screen and (max-device-width: 480px) {
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 18px;
    max-width: 280px;
    margin-bottom: 10px;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    margin-bottom: 20px;
  }
`;

const TableHead = styled.div<{ item?: boolean }>`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.operations.headBg};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 40px;

  @media only screen and (max-device-width: 480px) {
    padding-left: 20px;
    border-radius: 0;
    height: 38px;
  }
`;

const TableHeadItem = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.operations.headClr};
  width: 100%;

  &:nth-child(1) {
    max-width: 330px;
  }

  &:nth-child(2) {
    max-width: 400px;
  }

  &:nth-child(3) {
    max-width: 100px;
  }

  @media only screen and (min-device-width: 481px) and (max-device-width: 849px) {
    &:nth-child(1) {
      max-width: 250px;
    }

    &:nth-child(2) {
      max-width: 303px;
    }
  }

  @media only screen and (min-device-width: 850px) and (max-device-width: 949px) {
    &:nth-child(1) {
      max-width: 250px;
    }

    &:nth-child(2) {
      max-width: 325px;
    }
  }

  @media only screen and (max-device-width: 480px) {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;

    &:nth-child(1) {
      max-width: 61px;
    }
  }

  @media only screen and (max-device-width: 359px) {
    &:nth-child(3) {
      max-width: 89px;
    }
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 434px) {
    &:nth-child(1) {
      max-width: 65px;
    }
  }

  @media only screen and (min-device-width: 435px) and (max-device-width: 480px) {
    &:nth-child(1) {
      max-width: 71px;
    }

    &:nth-child(3) {
      max-width: 114px;
    }
  }
`;

const TableMapItem = styled.div`
  width: 100%;
  min-height: 60px;
  background: ${({ theme }) => theme.operations.ich1};
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 40px;

  &:nth-child(2n) {
    background: ${({ theme }) => theme.operations.ich2};
  }

  @media only screen and (max-device-width: 480px) {
    padding-left: 20px;
    padding-top: 10px;
    min-height: 38px;
    align-items: start;
  }
`;

const TableInnerItem = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.operations.headClr};
  width: 100%;

  &:nth-child(1) {
    max-width: 330px;
  }

  &:nth-child(2) {
    max-width: 400px;
  }

  &:nth-child(3) {
    max-width: 100px;
  }

  @media only screen and (min-device-width: 481px) and (max-device-width: 849px) {
    &:nth-child(1) {
      max-width: 250px;
    }

    &:nth-child(2) {
      max-width: 303px;
    }
  }

  @media only screen and (min-device-width: 850px) and (max-device-width: 949px) {
    &:nth-child(1) {
      max-width: 250px;
    }

    &:nth-child(2) {
      max-width: 325px;
    }
  }

  @media only screen and (max-device-width: 480px) {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    & > span {
      width: 120px;
      max-width: 120px;
      word-wrap: break-word;
    }

    &:nth-child(1) {
      max-width: 61px;
    }
  }

  @media only screen and (max-device-width: 359px) {
    &:nth-child(3) {
      max-width: 89px;
    }
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 434px) {
    &:nth-child(1) {
      max-width: 65px;
    }
  }

  @media only screen and (min-device-width: 435px) and (max-device-width: 480px) {
    &:nth-child(1) {
      max-width: 71px;
    }

    &:nth-child(3) {
      max-width: 114px;
    }
  }
`;

const TableMapBlock = styled.div`
  width: 100%;
  padding: 1px;
  padding-top: 0px;
  padding-bottom: 0px;
  background: ${({ theme }) => theme.operations.tableBg};
`;
