import moment from 'moment';
import 'moment/locale/ru';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ReactComponent as Copy } from '../../assets/svg/copy.svg';
import { Button } from '../../components/Button/V2/Button';
// import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';
import { Notification } from '../../components/Notify/Notification';
import { Select } from '../../components/Select/Select4';
import { Tooltip } from '../../components/Tooltips/Tooltips';
import { Input } from '../../components/UI/Input';
import { Loading } from '../../components/UI/Loading';
import { Tabs } from '../../components/UI/Tabs';
import { UpTitle } from '../../components/UI/UpTitle';
import { Chip, SecondaryButton } from '../../components/UI/V4';
import { AppContext } from '../../context/HubContext';
import { Card, Container } from '../../globalStyles';
import { Balance, Notify } from '../../types/balance';
import { Commisions, DepositsCollection, RootDeposits } from '../../types/info';
import { Deposits } from './Deposits/Deposits';
import { ConvertingModalSuccess } from './ConveringSuccessModal';
import { ConvertingModal } from './ConvertingModal';
import { ConvertingModalFail } from './ConvertingModalFail';

import { Info } from './Info';
import { InfoBalance } from './InfoBalance';
import { InfoDeposits } from './InfoDeposits';
import { DepositListModal, TokenModal } from './Modals';
import { OnePage } from './OnePage'; 
import * as Styled from './Styles.elements';
import { H3 } from "../../components/UI/Heading";
import { Select as Selectv2 } from "../../components/UI/Select";
import { Input as Inputv2 } from "../../components/UI/V4/Inputs/Input";
import { PAButton } from "../../components/UI/V4/Buttons/PAButton";
import { ReactComponent as LockIcon } from '../../assets/v2/svg/lock.svg'
import { ReactComponent as LogOutIcon } from '../../assets/v2/svg/logOut.svg'
import { routers } from '../../constantes/routers';
import { DepositProgram } from './Deposits/DepositProgram';
import { DepositOpen } from './Deposits/DepositOpen';

export const InfoMain: FC = () => {
  const { t } = useTranslation();
  const [openConverting, setOpenConverting] = useState<boolean>(false);
  const [isSuccessConverting, setIsSuccessConverting] = useState<boolean>(false);
  const [isFailConverting, setIsFailConverting] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notify[]>([]);
  const [addDeposit, setAddDeposit] = useState<boolean>(false);
  const [depositListModal, setDepositListModal] = useState<boolean>(false);
  const [addDepositValue, setAddDepositValue] = useState<string>('');
  const [depositSelect, setDepositSelect] = useState<null | DepositsCollection>(null);
  const [depositsList, setDepositsList] = useState<DepositsCollection[] | null>(null);
  const [withdraw, setWithdraw] = useState<boolean>(false);
  const [loadDeposit, setLoadDeposit] = useState<boolean>(false);
  const [withdrawValueLoad, setWithdrawValueLoad] = useState<boolean>(false);
  const [condition, setContition] = useState<boolean>(false);
  const [depositSuccess, setDepositSuccess] = useState<boolean>(false);
  const [depositError, setDepositError] = useState<boolean>(false);
  const [currencyValue, setCurrencyValue] = useState<string | Balance>('');
  const [withdrawValue, setWithdrawValue] = useState('');
  const [switchType, setSwitchType] = useState<boolean>(false);
  const [account, setAccount] = useState('');
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const balance = appContext.balance;
  const hubConnection = appContext.hubConnection;
  const balanceList = appContext.balanceList;
  const inputRef = useRef<any>(null);
  const history = useHistory();
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;
  moment.locale(lang);
  const [blockchainCommision, setBlockchainCommision] = useState<string>('0');
  const [serviceCommision, setServiceCommision] = useState<string>('0');
  const [toTokenModal, setToTokenModal] = useState<boolean>(false);
  const [countToTranslate, setCountToTranslate] = useState<any>('');
  const [currency, setCurrency] = useState<string>("");
  const [ed, setEd] = useState<string>("");
  const [error, setError] = useState<boolean | undefined>();
  const [errorReason, setErrorReason] = useState<string>("На балансе аккаунта недостаточно средств");
  const [outPutCurrency, setOutPutCurrency] = useState<string>("");
  const [outPutEd, setOutPutEd] = useState<string>("");
  const [blockchain, setBlockchain] = useState<any>("0");
  const [service, setService] = useState<any>("0");
  const [currencies, setCurrencies] = useState<any[]>(['CWD', 'GLOBAL', 'GF', 'FF', 'GF5', 'GF6', 'FF5', 'FF6', 'MULTICS']);
  const [outPutError, setOutPutError] = useState<boolean | undefined>();
  const [outPutErrorReason, setOutPutErrorReason] = useState<string>("На балансе аккаунта недостаточно средств");
  const [withDrawModal, setWithDrawModal] = useState<boolean>(false);
  const [addDrawModal, setAddDrawModal] = useState<boolean>(false);

  // Get Balance Kinds List as an Array
  const balancesList = useMemo(() => {
    const list = ['CWD', 'GLOBAL', 'GF', 'FF', 'GF5', 'GF6', 'FF5', 'FF6', 'MULTICS'];
    const sorted = balanceList?.sort((a, b) => a.balanceKind - b.balanceKind) || [];
    return sorted
      .filter((b) => list.includes(Balance[b.balanceKind]))
      .map((b) => Balance[b.balanceKind]);
  }, [balanceList]);

  const handleDepositModal = () => {
    setAddDeposit(false);
    setDepositSuccess(false);
    setDepositListModal(true);
  };

  const handleBackModal = () => {
    setAddDeposit(true);
    setDepositListModal(false);
  };

  const selectDeposit = (item: DepositsCollection) => {
    handleBackModal();
    setDepositSelect(item);
    setAddDepositValue((item.minAmount / 100000).toString());
  };

  const openNewDeposit = () => {
    if (hubConnection && depositSelect !== null) {
      setLoadDeposit(true);

      hubConnection
        .invoke('CreateUserDeposit', +addDepositValue * 100000, depositSelect.safeId)
        .then((res) => {
          setLoadDeposit(false);
          setWithdraw(false);
          setWithdrawValue('');
          if (res) {
            setDepositSuccess(true);
            // alert(t("alert.success"), t("alert.depositMsg"), "success");
          } else {
            setDepositError(true);
            // alert(t("alert.error"), t("alert.depositErrorMsg"), "danger");
          }
        })
        .catch((err: Error) => {
          console.log(err);
          setLoadDeposit(false);
          setWithdraw(false);
          setWithdrawValue('');
          setDepositError(true);
          // alert(t("alert.error"), t("alert.depositErrorMsg"), "danger");
        })
        .finally(() => {
          setDepositSelect(null);

          setAddDeposit(false);
        });
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke('GetTopUpAccount')
        .then((res) => setAccount(res))
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (withdraw) {
      inputRef.current.focus();
    }
  }, [withdraw]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootDeposits>('GetDeposits', languale, false, 0, 40)
        .then((res) => {
          if (res.collection.length) {
            setDepositsList(res.collection);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, languale]);

  const withdrawBalance = () => {
    if (hubConnection) {
      setWithdrawValueLoad(true);
      hubConnection
        .invoke(
          'Withdraw',
          Balance[outPutCurrency as keyof typeof Balance],
          outPutCurrency === 'CWD'
            ? +outPutEd * 100000
            : outPutCurrency === 'GLOBAL'
            ? +outPutEd * 10000
            : outPutCurrency === 'MULTICS'
            ? +outPutEd * 100
            : +outPutEd
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const balanceAsset =
    depositSelect && depositSelect?.priceKind !== null
      ? balanceList?.some((item) => item.balanceKind === depositSelect?.priceKind)
      : true;

  const balanseType = balanceList?.filter((i) => i.balanceKind === 1);

  const asset =
    balanseType && depositSelect && balanseType.length
      ? balanseType[0].volume >= depositSelect?.minAmount / 100000 ||
        balanseType[0].volume >= depositSelect?.price
      : false;

  const blackList = [0, 1, 9, 10, 11];

  const balanceChips = balanceList
    ?.filter((item) => !blackList.includes(item.balanceKind))
    .sort((a, b) => a.balanceKind - b.balanceKind)
    .map((obj) =>
      obj.balanceKind === 43
        ? { ...obj, volume: obj.volume > 1 ? obj.volume / 10000 : obj.volume }
        : obj.balanceKind === 59
        ? { ...obj, volume: obj.volume > 1 ? obj.volume / 100 : obj.volume }
        : obj
    );

  // if (user === null) {
  //   return null;
  // }

  const balanceFuture =
    depositSelect && [9, 10, 11].includes(depositSelect.priceKind) && depositSelect.priceKind !== 1;

  // if (user === false) {
  //   return <Redirect to="/" />;
  // }
  const copy = (text: string) => {
    createNotify({
      text: t('copy.text'),
      error: false,
      timeleft: 5,
      id: notifications.length,
    });
    navigator.clipboard.writeText(text);
  };

  const toDeposit = () => {
    setAddDeposit(false);
    setDepositSuccess(false);
    history.push('/info/deposits');
  };

  const getCommisions = (value: string) => {
    if (hubConnection) {
      hubConnection
        .invoke<Commisions>('GetWithdrawFee', 1, Number(value))
        .then((res: any) => {
          console.log(res);
          setBlockchain((res.networkFee / 100000).toString());
          setService((res.serviceFee / 100000).toString());
        })
        .catch((err) => console.error(err));
    }
  };

  const onChangeWithdraw = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const pattern = /^[1-9][^0-9\.]*$/;
    const pattern = /^[0-9][0-9.]*$/;
    const value = e.target.value;

    if (value.split('.').length > 2 || value[0] === '.') {
      return;
    }

    if (value === '' || pattern.test(value)) {
      // call function to get commisions
      getCommisions(value);
      setWithdrawValue(value);
    }
  };
  const onDelete = (id: number) => {
    setNotifications(notifications.filter((i) => i.id !== id));
  };

  const createNotify = (item: Notify) => {
    setNotifications([item]);
  };

  const onChangeCurrencyValue = (balanceKind: null | (string | Balance)) => {
    if (!balanceKind) {
      setCurrencyValue('');
      return;
    }

    setCurrencyValue(balanceKind);
  };

  const handleCloseWithdrawModal = () => {
    setWithdraw(false);
    setWithdrawValue('');
    setCurrencyValue('');
  };

  const changeBalance = () => {
    const newWindow = window.open();

    if (hubConnection && currency.length > 0 && ed.length > 0) {
      hubConnection
        .invoke(
          'GetTopUpUrl',
          Balance[currency as keyof typeof Balance],
          currency === 'CWD'
            ? +ed * 100000
            : currency === 'GLOBAL'
            ? +ed * 10000
            : +ed
        )
        .then((res: string) => {
          newWindow && (newWindow.location.href = res);
          setError(false);
          setAddDrawModal(false);
        })
        .catch((err: Error) => {
          console.log(err);
          newWindow && newWindow.close();
          setError(true);
          setErrorReason("Недостаточно средств на балансе.");
          setAddDrawModal(false);
        });
    }
  };

  const outPutBalance = () => {
    console.log(hubConnection && outPutCurrency.length > 0 && outPutEd.length > 0 && Number(outPutEd) > ((Number(blockchain) + Number(service)) + 1))
    if (hubConnection && outPutCurrency.length > 0 && outPutEd.length > 0 && Number(outPutEd) > ((Number(blockchain) + Number(service)) + 1)) {
      setWithdrawValueLoad(true);
      hubConnection
        .invoke(
          'Withdraw',
          Balance[outPutCurrency as keyof typeof Balance],
          outPutCurrency === 'CWD'
            ? Number(+outPutEd) * 100000
            : outPutCurrency === 'GLOBAL'
            ? Number(+outPutEd) * 10000
            : outPutCurrency === 'MULTICS'
            ? Number(+outPutEd) * 100
            : Number(+outPutEd)
        )
        .then((res) => {
          console.log(res);
          setWithdrawValueLoad(false);
          setOutPutError(false);
          setWithDrawModal(false);
        })
        .catch((err: Error) => {
          console.log(err);
          setWithdrawValueLoad(false);
          setOutPutError(true);
          setWithDrawModal(false);
          setOutPutErrorReason("Недостаточно средств на балансе.");
        });
    }
  };

  const getChipColor = (i: any) => {
    let color = '#E0F8FF';
    if(i.balanceKind === 1) {
      color = '#FFF4D9';
    } else if (i.balanceKind === 9) {
      color = '#FF416E';
    } else if (i.balanceKind === 10) {
      color = '#6DB9FF';
    } else if (i.balanceKind === 11) {
      color = '#BCD476';
    } else if (i.balanceKind === 12) {
      color = '#A78CF2';
    } else if (i.balanceKind === 43) {
      color = '#EFECFF';
    } else if (i.balanceKind === 44) {
      color = '#DAFFE2';
    } else if (i.balanceKind === 47) {
      color = '#E0F8FF';
    } else {
      color = '#E0F8FF';
    }
    return color;
  }

  return (
    <>
      {withdrawValueLoad && (
        <Styled.Loader>
          <Loading />
        </Styled.Loader>
      )}
      {loadDeposit && (
        <Styled.Loader>
          <Loading />
        </Styled.Loader>
      )}

      <CSSTransition in={addDrawModal} timeout={0} unmountOnExit>
        <Modal onClose={() => {
          setAddDrawModal(false);
          setEd("");
        }} width={420} withClose>
          <H3 center style={{ marginTop: "24px" }}>Пополнение баланса</H3>
          <div style={{ width: "100%", maxWidth: "340px", margin: "0 auto" }}>
            <Selectv2 data={currencies} setSwitch={setCurrency} />
            <Inputv2 placeholder="Сумма пополнения" value={ed} onChange={(e) => {
              const arr = e.currentTarget.value.split('-');
              const fromSplitted = arr[0].split('.');
              const toSplitted = arr.length === 2 ? arr[1].split('.') : '';
              const validValue = e.currentTarget.value.replace(/[^0-9]/gi, '');
              setEd(validValue);
            }} />
            <PAButton onClick={changeBalance}>Пополнить баланс</PAButton>
          </div>
        </Modal>
      </CSSTransition>

      <CSSTransition in={error === undefined ? false : error === false ? true : false} timeout={0} unmountOnExit>
        <Modal onClose={() => setError(undefined)} width={420} withClose>
          <H3 center style={{ marginTop: "24px" }}>Успешное пополнение</H3>
          <Styled.Desc>Баланс личного кабинета успешно будет пополнен на:</Styled.Desc>
          <Styled.Desc bold mMore style={{ marginTop: "0px" }}>{ed} {currency}</Styled.Desc>
        </Modal>
      </CSSTransition>

      <CSSTransition in={error === undefined ? false : error} timeout={0} unmountOnExit>
        <Modal onClose={() => setError(undefined)} width={420} withClose>
          <H3 center style={{ marginTop: "24px" }}>Ошибка пополнения</H3>
          <Styled.Desc>Баланс личного кабинета не был пополнен на:</Styled.Desc>
          <Styled.Desc bold>{ed} {currency}</Styled.Desc>
          <Styled.Desc danger mMore style={{ marginTop: "0px" }}>{errorReason}</Styled.Desc>
        </Modal>
      </CSSTransition>



      <CSSTransition in={withDrawModal} timeout={0} unmountOnExit>
        <Modal onClose={() => {
           setWithDrawModal(false);
           setOutPutEd("");
        }} width={420} withClose>
          <H3 center style={{ marginTop: "24px" }}>Вывод средств</H3>
          <div style={{ width: "100%", maxWidth: "340px", margin: "0 auto" }}>
            <Selectv2 data={currencies} setSwitch={setOutPutCurrency} />
            <Inputv2 value={outPutEd} placeholder="Сумма вывода" 
            onKeyUp={(e) => {
              if (e.keyCode === 8) {
                setBlockchain("0");
                setService("0");
                setCurrency("");
              };
            }}
            onChange={(e) => {
              const arr = e.currentTarget.value.split('-');
              const fromSplitted = arr[0].split('.');
              const toSplitted = arr.length === 2 ? arr[1].split('.') : '';
              const validValue = e.currentTarget.value.replace(/[^0-9]/gi, '');
              setOutPutEd(validValue);
              getCommisions(validValue);
            }} />
            <Styled.Commision marginT={20} marginB={10}>Комиссия блокчейна: <span>{blockchain} {blockchain.length != "0" ? outPutCurrency : ""}</span></Styled.Commision>
            <Styled.Commision marginT={10} marginB={20}>Комиcсия сервиса: <span>{service} {service.length != "0" ? outPutCurrency : ""}</span></Styled.Commision>
            <PAButton onClick={outPutBalance}>Вывести средства</PAButton>
          </div>
        </Modal>
      </CSSTransition> 

      <CSSTransition in={outPutError === false ? true : false} timeout={0} unmountOnExit>
        <Modal onClose={() => setOutPutError(undefined)} width={420} withClose>
          <H3 center style={{ marginTop: "24px" }}>Успешный вывод средств</H3>
          <Styled.Desc>С баланса личного кабинета успешно выведены средства в размере:</Styled.Desc>
          <Styled.Desc bold mMore>{outPutEd} {outPutCurrency}</Styled.Desc>
          <Styled.Desc mLess>К выводу: {outPutEd ? (Number(outPutEd) - (Number(blockchain) + Number(service))) : 0}</Styled.Desc>
          <Styled.Desc mLess>Комиссия блокчейн: {blockchain}</Styled.Desc>
          <Styled.Desc mLess>Комиссия сервиса: {service}</Styled.Desc>
        </Modal>
      </CSSTransition>

      <CSSTransition in={outPutError} timeout={0} unmountOnExit>
        <Modal onClose={() => setOutPutError(undefined)} width={420} withClose>
          <H3 center style={{ marginTop: "24px" }}>Ошибка вывода средств</H3>
          <Styled.Desc>С баланса личного кабинета не были выведены средства в размере:</Styled.Desc>
          <Styled.Desc bold>{outPutEd} {outPutCurrency}</Styled.Desc>
          <Styled.Desc mLess>К выводу: {outPutEd ? (Number(outPutEd) - (Number(blockchain) + Number(service))) : 0}</Styled.Desc>
          <Styled.Desc mLess>Комиссия блокчейн: {blockchain}</Styled.Desc>
          <Styled.Desc mLess>Комиссия сервиса: {service}</Styled.Desc>
          <Styled.Desc danger mMore>{outPutErrorReason}</Styled.Desc>
        </Modal>
      </CSSTransition>


      <TokenModal
        block={toTokenModal}
        setBlock={setToTokenModal}
        setToTranslate={setCountToTranslate}
        onButton={() => {
          return;
        }}
      />

      <ConvertingModal open={openConverting} setOpen={setOpenConverting} />
      <ConvertingModalSuccess open={isSuccessConverting} setOpen={setIsSuccessConverting} />
      <ConvertingModalFail open={isFailConverting} setOpen={setIsFailConverting} />

      <Header />
      <Styled.Page>
        {/* <Container>
          <UpTitle>{t('privateArea.uptitle')}</UpTitle>
        </Container> */}

        <DepositsPanelContainer>
          <PanelTitleBlock>
            <H4>Личный кабинет</H4>
            <LogoutButton>
              <UsernameText>{user}</UsernameText>
              <LogOutIcon />
            </LogoutButton>
          </PanelTitleBlock>
          <PanelCard>
            <PanelHeader>
              <PanelInfoBlock>
                <BalanceInfoText>Баланс аккаунта:</BalanceInfoText>
                <BalanceValueText>
                  {balance
                      ? (balance / 100000).toLocaleString('ru-RU', {
                          maximumFractionDigits: 5,
                        })
                      : '0'}{' '}
                    CWD
                </BalanceValueText>
              </PanelInfoBlock>
              <PanelActionsBlock>
                  <SecondaryButton 
                    title={'Конвертация'}
                    // eslint-disable-next-line
                    onClick={() => {}}
                  />
                  <SecondaryButton 
                    title={'Пополнить баланс'}
                    // eslint-disable-next-line
                    onClick={() => setAddDrawModal(true)}
                  />
                   <SecondaryButton 
                    title={'Вывести средства'}
                    // eslint-disable-next-line
                    onClick={() => setWithDrawModal(true)}
                  />
              </PanelActionsBlock>
            </PanelHeader>
            <BalanceChipsBlock>
              {balanceChips &&
                  balanceChips.map((i: any, idx: number) => {
                    return (
                      <Chip
                        key={`chip-item-${idx}`}
                        leftIcon={() => <LockIcon />}
                        bgColor={getChipColor(i)}
                      >
                         <span>
                          {i.volume.toLocaleString('ru-RU', {
                            maximumFractionDigits: 4,
                          })}
                        </span>
                        &nbsp;
                        {Balance[i.balanceKind]}
                      </Chip>
                    );
                })}
            </BalanceChipsBlock>

            <TabsBlock>
              <TabNavItem to="/info" exact>
                <div>Мои депозиты</div>
              </TabNavItem>
              <TabNavItem to="/ads">
                <div>Объявления</div>
              </TabNavItem>
              <TabNavItem to="/certificates">
                <div>Сертификаты</div>
              </TabNavItem>
              <TabNavItem to="/operationsHistory">
                <div>История операций</div>
              </TabNavItem>
              <TabNavItem to="/settings">
                <div>Настройки</div>
              </TabNavItem>
            </TabsBlock>

            {/* <Styled.InfoWrap>
              <Styled.UserBlock>
                <Styled.InfoTitle>{user}</Styled.InfoTitle>
                <Styled.BalanceItem>
                  <Styled.BalanceItemName>{t('privateArea.balance')}</Styled.BalanceItemName>
                  <Styled.BalanceItemValue pink>
                    {balance
                      ? (balance / 100000).toLocaleString('ru-RU', {
                          maximumFractionDigits: 5,
                        })
                      : '0'}{' '}
                    CWD
                  </Styled.BalanceItemValue>
                </Styled.BalanceItem>
                <Styled.SmallButtonsWrapDesc>
                  <Styled.SmallButtonsWrap>
                    {balanceChips &&
                      balanceChips.map((i: any, idx: any) => {
                        let color = '#6DB9FF';
                        if (i.balanceKind === 9) {
                          color = '#FF416E';
                        } else if (i.balanceKind === 10) {
                          color = '#6DB9FF';
                        } else if (i.balanceKind === 11) {
                          color = '#BCD476';
                        } else if (i.balanceKind === 12) {
                          color = '#A78CF2';
                        } else {
                          color = '#6DB9FF';
                        }

                        return (
                          <Styled.SmallButton color={color} key={idx}>
                            <span>
                              {i.volume.toLocaleString('ru-RU', {
                                maximumFractionDigits: 4,
                              })}
                            </span>
                            &nbsp;
                            {Balance[i.balanceKind]}
                          </Styled.SmallButton>
                        );
                      })}
                  </Styled.SmallButtonsWrap>
                </Styled.SmallButtonsWrapDesc>
              </Styled.UserBlock>
              <Styled.InfoButtons>
                <Button
                  onClick={() => {
                    setDepositSelect(null);
                    setAddDepositValue('');
                    setAddDeposit(true);
                  }}
                >
                  {t('privateArea.newDeposit')}
                </Button>
                <Button onClick={() => setSwitchType(!switchType)}>
                  {t('privateArea.withdraw')}
                </Button>
                <Button onClick={() => setOpenConverting(true)}>
                  {t('privateArea.converting')}
                </Button>
              </Styled.InfoButtons>
              <Styled.SwitchBlock block={switchType}>
                <Button
                  onClick={() => {
                    setToTokenModal(true);
                    setSwitchType(false);
                  }}
                  style={{ width: 130, height: 35 }}
                >
                  {t('privateArea.toToken')}
                </Button>
                <Button
                  as="button"
                  onClick={() => {
                    setSwitchType(false);
                    setWithdraw(true);
                  }}
                  style={{ width: 130, height: 35 }}
                >
                  {t('privateArea.withdraw')}
                </Button>
              </Styled.SwitchBlock>
            </Styled.InfoWrap>
            <Styled.SmallButtonsWrapMob>
              <Styled.SmallButtonsWrap>
                {balanceChips &&
                  balanceChips.map((i: any, idx: any) => {
                    let color = '#6DB9FF';
                    if (i.balanceKind === 9) {
                      color = '#FF416E';
                    } else if (i.balanceKind === 10) {
                      color = '#6DB9FF';
                    } else if (i.balanceKind === 11) {
                      color = '#BCD476';
                    } else if (i.balanceKind === 12) {
                      color = '#A78CF2';
                    } else {
                      color = '#6DB9FF';
                    }

                    return (
                      <Styled.SmallButton color={color} key={idx}>
                        <span>
                          {i.volume.toLocaleString('ru-RU', {
                            maximumFractionDigits: 4,
                          })}
                        </span>
                        &nbsp;
                        {Balance[i.balanceKind]}
                      </Styled.SmallButton>
                    );
                  })}
              </Styled.SmallButtonsWrap>
            </Styled.SmallButtonsWrapMob>
            <Tabs>
              <Styled.NavTabs to="/info" exact>
                <div>{t('privateArea.tabs.tab1')}</div>{' '}
              </Styled.NavTabs>
              <Styled.NavTabs to={routers.deposits}>
                <div>{t('privateArea.tabs.tab2')}</div>{' '}
              </Styled.NavTabs>
              <Styled.NavTabs to="/info/balance">
                <div>{t('privateArea.tabs.tab3')}</div>{' '}
              </Styled.NavTabs>
            </Tabs> */}
          </PanelCard>
        </DepositsPanelContainer>


        <Switch>
          <Route path="/info" component={Info} exact />
          {/* <Route path="/info/deposits" component={InfoDeposits} exact /> */}
          <Route path={routers.deposits} component={Deposits} exact />
          <Route path={routers.depositsProgram} component={DepositProgram} exact />
          <Route path={routers.depositsOpen} component={DepositOpen} exact />
          <Route path="/info/balance" component={InfoBalance} exact />
          <Route path="/info/deposits/:slug" component={OnePage} />
        </Switch>
        <CSSTransition in={depositSuccess} timeout={0} classNames="modal" unmountOnExit>
          <Modal width={540} onClose={() => setDepositSuccess(false)}>
            <Styled.ModalBlock>
              <Styled.ModalTitle>{t('depositSuccess.title')}</Styled.ModalTitle>
              <Styled.ModalButton onClick={toDeposit} danger>
                {t('depositSuccess.button')}
              </Styled.ModalButton>
            </Styled.ModalBlock>
          </Modal>
        </CSSTransition>
        <CSSTransition in={depositError} timeout={0} classNames="modal" unmountOnExit>
          <Modal width={540} onClose={() => setDepositError(false)}>
            <Styled.ModalBlockWide>
              <Styled.ModalTitle>{t('depositError.title')}</Styled.ModalTitle>
              <p>{t('depositError.desc')}</p>
            </Styled.ModalBlockWide>
          </Modal>
        </CSSTransition>
        <div>
          {withdraw && (
            <Modal onClose={handleCloseWithdrawModal}>
              <Styled.ModalBlock>
                <Styled.ModalTitle>{t('privateArea.withdraw')}</Styled.ModalTitle>
                <Select
                  placeholder={t('privateArea.selectCurrency')}
                  options={['CWD', 'GLOBAL', 'MULTICS']}
                  selectedOption={currencyValue}
                  setSelectedOption={onChangeCurrencyValue}
                />
                <Input
                  onChange={onChangeWithdraw}
                  placeholder={t('privateArea.amountEnter')}
                  type="text"
                  ref={inputRef}
                  value={withdrawValue}
                />
                <Styled.ModalButton
                  as="button"
                  disabled={!withdrawValue || !currencyValue || +withdrawValue <= 0}
                  onClick={withdrawBalance}
                  danger
                >
                  {t('privateArea.withdraw')}
                </Styled.ModalButton>
                <Styled.ModalCommisionBox>
                  <Styled.ModalCommision>
                    {t('privateArea.blockchainCommision')} -{' '}
                    <Styled.ModalCommisionCount>
                      {blockchainCommision} CWD
                    </Styled.ModalCommisionCount>
                  </Styled.ModalCommision>
                  <Styled.ModalCommision>
                    {t('privateArea.serviceCommision')} -{' '}
                    <Styled.ModalCommisionCount>{serviceCommision} CWD</Styled.ModalCommisionCount>
                  </Styled.ModalCommision>
                </Styled.ModalCommisionBox>
              </Styled.ModalBlock>
            </Modal>
          )}
          <CSSTransition in={condition} timeout={0} classNames="modal" unmountOnExit>
            <Modal width={540} onClose={() => setContition(false)}>
              <Styled.Conditions open>
                {depositSelect ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: depositSelect.description,
                    }}
                  />
                ) : (
                  ''
                )}
              </Styled.Conditions>
            </Modal>
          </CSSTransition>
          <CSSTransition
            in={addDeposit && !depositListModal}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <Styled.ModalDepositsWrap>
              <Modal onClose={() => setAddDeposit(false)} width={384} paddingTop={34}>
                <Styled.ModalTitle mt>{t('privateArea.addDeposit')}</Styled.ModalTitle>
                <Styled.ModalDeposits>
                  <div>
                    <Styled.ModalButton choice mb onClick={handleDepositModal} dangerOutline>
                      {depositSelect ? depositSelect.name : t('privateArea.choiseDeposite')}{' '}
                      <Styled.IconRotate rights>
                        <Styled.ModalBack />
                      </Styled.IconRotate>
                    </Styled.ModalButton>
                    <Input
                      onChange={(e) => setAddDepositValue(e.target.value)}
                      placeholder={t('privateArea.amountEnter')}
                      type="number"
                      ref={inputRef}
                      value={addDepositValue}
                    />
                    <Styled.ModalButton
                      as="button"
                      disabled={!asset || !addDepositValue}
                      onClick={openNewDeposit}
                      danger
                    >
                      {t('depositSelect.add')}
                    </Styled.ModalButton>
                    {depositSelect?.description ? (
                      <Tooltip text={depositSelect.description}>
                        <Styled.Program>{t('depositSelect.condition')}</Styled.Program>
                      </Tooltip>
                    ) : (
                      <Styled.Program show>{t('depositSelect.showCondition')}</Styled.Program>
                    )}
                    {depositSelect && !asset && balanceFuture ? (
                      <>
                        <Styled.Warning>
                          {t('depositSelect.forActive')}&nbsp;
                          {depositSelect.price}
                          {depositSelect.priceKind ? Balance[depositSelect.priceKind] : 'CWD'},{' '}
                          {t('depositSelect.transfer')} <bdi>{account}</bdi>
                          <Styled.SmallRoundButton onClick={() => copy(account)}>
                            <Copy />
                          </Styled.SmallRoundButton>
                        </Styled.Warning>
                        <Styled.ModalButton
                          blue
                          href={`https://backup.cwd.global/account/${user}/portfolio`}
                          target="_blank"
                        >
                          {t('depositSelect.transferButton')}
                        </Styled.ModalButton>
                      </>
                    ) : null}
                    {/* {console.log(depositSelect)} */}
                    {depositSelect && depositSelect.priceKind && asset ? (
                      <Styled.Warning choice>
                        {t('depositSelect.willActiv')}&nbsp;{' '}
                        <span>
                          {depositSelect.price}{' '}
                          {depositSelect.priceKind ? Balance[depositSelect.priceKind] : 'CWD'}
                          {depositSelect.price2Kind &&
                            ` и ${depositSelect.price2} ${
                              depositSelect.price2Kind ? Balance[depositSelect.price2Kind] : 'CWD'
                            }`}
                        </span>
                        <br />
                        {t('depositSelect.bill')}
                      </Styled.Warning>
                    ) : depositSelect && depositSelect.priceKind > 11 ? (
                      <Styled.Warning>
                        {t('depositSelect.willActiv')}&nbsp; {depositSelect.price}{' '}
                        {depositSelect.priceKind ? Balance[depositSelect.priceKind] : 'CWD'}
                        {depositSelect.price2Kind &&
                          ` и ${depositSelect.price2} ${
                            depositSelect.price2Kind ? Balance[depositSelect.price2Kind] : 'CWD'
                          }`}
                        <br />
                        {t('depositSelect.bill')}
                      </Styled.Warning>
                    ) : null}
                  </div>
                  {/* {depositSelect ? (
                    <Styled.Conditions>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: depositSelect.description,
                        }}
                      />
                      {!balanceAsset && (
                        <Styled.ToLink
                          target="_blank"
                          href={`https://backup.cwd.global/shopping/payment?to_name=${depositSelect.account}&amount=${depositSelect.minAmount}`}
                        >
                          Приобрести
                        </Styled.ToLink>
                      )}
                    </Styled.Conditions>
                  ) : (
                    ""
                  )} */}
                </Styled.ModalDeposits>
              </Modal>
            </Styled.ModalDepositsWrap>
          </CSSTransition>
          <DepositListModal
            depositListModal={depositListModal}
            setDepositListModal={setDepositListModal}
            handleBackModal={handleBackModal}
            depositsList={depositsList}
            selectDeposit={selectDeposit}
          />
        </div>
      </Styled.Page>
      <Styled.Note>
        <Notification onDelete={onDelete} data={notifications} />
      </Styled.Note>
    </>
  );
};


const DepositsPanelContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const PanelTitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const H4 = styled.h4`
  color: ${props => props.theme.titles};
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;

  @media (max-width: 425px) {
    font-size: 18px;
    line-height: 21px;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const UsernameText = styled.span`
  margin-right: 6px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

const PanelCard = styled(Card)`
  border-radius: 4px;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  padding: 20px;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PanelInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const PanelActionsBlock = styled.div`
  display: flex;
  align-items-center;
  gap: 20px;
`;

const BalanceInfoText = styled.div`
  color: ${props => props.theme.titles};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 10px;
`;

const BalanceValueText = styled.div`
  color: ${props => props.theme.titles};
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
`;

const BalanceChipsBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #EBEBF2;
`;

const TabsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const TabNavItem = styled(NavLink)`
  color: ${props => props.theme.black};
  opacity: 0.6;
  font-size: 14px;
  line-height: 16px;
  padding-bottom: 10px;

  &.active {
    font-weight: 500;
    opacity: 1;

    border-bottom: 2px solid ${props => props.theme.blue};
  }
`;
