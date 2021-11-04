import moment from 'moment';
import 'moment/locale/ru';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ReactComponent as Copy } from '../../assets/svg/copy.svg';
import { ReactComponent as LockIcon } from '../../assets/v2/svg/lock.svg';
import { ReactComponent as LogOutIcon } from '../../assets/v2/svg/logOut.svg';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';
import { Notification } from '../../components/Notify/Notification';
import { Select } from '../../components/Select/Select4';
import { Tooltip } from '../../components/Tooltips/Tooltips';
import { H3 } from '../../components/UI/Heading';
import { Input } from '../../components/UI/Input';
import { Loading } from '../../components/UI/Loading';
import { Select as Selectv2 } from '../../components/UI/Select';
import { Chip, SecondaryButton } from '../../components/UI/V4';
import { PAButton } from '../../components/UI/V4/Buttons/PAButton';
import { Input as Inputv2 } from '../../components/UI/V4/Inputs/Input';
import { routers } from '../../constantes/routers';
import { AppContext } from '../../context/HubContext';
import { Card, Container } from '../../globalStyles';
import { Balance, Notify } from '../../types/balance';
import { Commisions, DepositsCollection, RootDeposits } from '../../types/info';
import { ConvertingModal } from './Converting/ConvertingModal';
import { DepositListModal } from './Modals';
import * as Styled from './Styles.elements';
import { SelectButton } from './components/ui/SelectButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { countVolumeToShow } from './utils';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';

export const HeaderBar = () => {
  const { t } = useTranslation();
  const [openConverting, setOpenConverting] = useState<boolean>(false);
  const { screen } = window;

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
  const loan = appContext.loan;
  const logOut = appContext.logOut;
  const inputRef = useRef<any>(null);
  const history = useHistory();
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;
  moment.locale(lang);
  const [blockchainCommision, setBlockchainCommision] = useState<string>('0');
  const [serviceCommision, setServiceCommision] = useState<string>('0');
  const [toTokenModal, setToTokenModal] = useState<boolean>(false);
  const [countToTranslate, setCountToTranslate] = useState<any>('');
  const [currency, setCurrency] = useState<string>('');
  const [ed, setEd] = useState<string>('');
  const [error, setError] = useState<boolean | undefined>();
  const [errorReason, setErrorReason] = useState<string>(
    'На балансе аккаунта недостаточно средств'
  );
  const [outPutCurrency, setOutPutCurrency] = useState<string>('');
  const [outPutEd, setOutPutEd] = useState<string>('');
  const [blockchain, setBlockchain] = useState<any>('0');
  const [service, setService] = useState<any>('0');
  const [currencies, setCurrencies] = useState<any[]>([
    'CWD',
    'GLOBAL',
    'GF',
    'FF',
    'GF5',
    'GF6',
    'FF5',
    'FF6',
    'MULTICS',
  ]);
  const [outPutError, setOutPutError] = useState<boolean | undefined>();
  const [outPutErrorReason, setOutPutErrorReason] = useState<string>(
    'На балансе аккаунта недостаточно средств'
  );
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

  const bl: any[] = [0, 9, 10, 11];

  const balances = balanceList?.filter((item) => !bl.includes(item.balanceKind));

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
  const lockeds: any[] = [];
  const lockedBalances =
    loan &&
    loan.map((item: any) => {
      let volume = 0;
      for (let i = 0; i < loan.length; i++) {
        if (item.balanceKind == loan[i].balanceKind) {
          volume += loan[i].loanValue;
        }
      }
      if (!lockeds.some((i: any) => i.balanceKind == item.balanceKind)) {
        lockeds.push({
          ...item,
          volume: countVolumeToShow(item.volume, item.balanceKind),
          balanceKind: item.balanceKind,
          locked: true,
        });
      }
    });

    const balancesArray = balanceList
    ?.filter((item) => !blackList.includes(item.balanceKind))
    .sort((a, b) => a.balanceKind - b.balanceKind)
    .map((obj) =>
      obj.balanceKind === 43
        ? { ...obj, volume: obj.volume > 1 ? obj.volume / 10000 : obj.volume, locked: false }
        : obj.balanceKind === 59
        ? { ...obj, volume: obj.volume > 0 ? obj.volume / 100 : obj.volume, locked: false }
        : obj
    );
  const edit: any[] = [];
  balancesArray?.forEach((item) => {
    edit.push(item);
  });
  const balanceChips: any[] = [...edit, ...lockeds];
  const balanceFuture =
    depositSelect && [9, 10, 11].includes(depositSelect.priceKind) && depositSelect.priceKind !== 1;
 
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

  /* 
    нет данных
    Нулевой, 0 

    /// Успешный перевод.
    Успех, 1 

    /// Невозможно передать. Недостаточно средств.
    На балансе аккаунта не достаточно средств, 2 

    /// Ошибка передачи.
    Ошибка, 3

    /// Адрес назначения перевода не найден.
    DestinationNotfound, 4

    /// Неправильный источник передачи. Аккаунт не может быть найден.
    SourceNotFound, 5 

    /// Сумма перевода меньше разрешенного минимального объема перевода.
    ValueIsTooSmall, 6

    /// Сумма перевода больше разрешенной максимальной суммы перевода.
    ValueIsTooLarge, 7 

    /// Превышение дневной квоты перевода средств.
    DailyQuotaExceed, 8

    /// Превышение месячной квоты перевода средств.
    MonthlyQuotaExceed, 9

    /// Доступна активная невыполненная ставка.
    WagerAvailable, 10

  */

  function createPortal() {
    const a = document.createElement('a');
    a.rel = 'noreferrer noopener';
    a.target = '_blank';
    return a;
  }

  const changeBalance = () => {
    const value = Number(ed.replace(/\s/g, ''));
    if (hubConnection && currency.length > 0) {
      const a = createPortal();
      hubConnection
        .invoke(
          'GetTopUpUrl',
          Balance[currency as keyof typeof Balance],
          currency === 'CWD' ? value * 100000 : currency === 'GLOBAL' ? value * 10000 : value
        )
        .then((res: string) => {
          a.href = res;
          a.click();
          setTimeout(() => {
            setError(false);
            setAddDrawModal(false);
          }, 5000);
        })
        .catch((err: Error) => {
          console.log(err);
          setError(true);
          setErrorReason('На балансе аккаунта недостаточно средств.');
          setAddDrawModal(false);
        });
    }
  };

  /* 
  {
    /// NA
    Null, 0

    /// Successful transfer.
    Success, 1

    /// Cannot transfer. Insufficient funds.
    InsufficientBalance, 2

    /// Transfer error.
    Error, 3

    /// Transfer destination address cannot be found.
    DestinationNotfound, 4

    /// Wrong transfer source. Account cannot be found.
    SourceNotFound, 5

    /// Transfer amount is lower then allowed minimal transfer volume.
    ValueIsTooSmall, 6

    /// Transfer amount is higher then allowed maximal transfer value.
    ValueIsTooLarge, 7

    /// Transfer funds daily quota exceed.
    DailyQuotaExceed, 8

    /// Transfer funds monthly quota exceed.
    MonthlyQuotaExceed, 9

    /// There is active not executed wager available.
    WagerAvailable, 10
}
    */

  function errorStatus(status: boolean, reason: string) {
    setOutPutError(status);
    setOutPutErrorReason(reason);
  }

  function getStatus(status: number) {
    console.log(status);
    if (status === 0) {
      errorStatus(true, 'Ошибка вывода средств');
    } else if (status === 1) {
      errorStatus(false, 'Успешный вывод средств');
    } else if (status === 2) {
      errorStatus(true, 'Недостаточно средств на балансе');
    } else if (status === 3) {
      errorStatus(true, 'Ошибка вывода средств');
    } else if (status === 4) {
      errorStatus(true, 'Отправитель средств не был найден');
    } else if (status === 5) {
      errorStatus(true, 'Неверный получатель. Аккаунт не был найден');
    } else if (status === 6) {
      errorStatus(true, 'Сумма перевода меньше разрешенного минимального объема перевода');
    } else if (status === 7) {
      errorStatus(true, 'Сумма перевода больше разрешенной максимальной суммы перевода');
    } else if (status === 8) {
      errorStatus(true, 'Превышение дневной квоты перевода средств');
    } else if (status === 9) {
      errorStatus(true, 'Превышение месячной квоты перевода средств');
    } else if (status === 10) {
      errorStatus(true, 'Доступна активная невыполненная ставка.');
    }
  }

  const outPutBalance = () => {
    const value = Number(outPutEd.replace(/\s/g, ''));
    if (hubConnection && outPutCurrency.length > 0) {
      setWithdrawValueLoad(true);
      /* console.log('withdraw', outPutCurrency === 'CWD'
      ? value * 100000
      : outPutCurrency === 'GLOBAL'
      ? value * 10000
      : outPutCurrency === 'MULTICS'
      ? value * 100
      : value, Balance[outPutCurrency as keyof typeof Balance]) */
      hubConnection
        .invoke(
          'Withdraw',
          Balance[outPutCurrency as keyof typeof Balance],
          outPutCurrency === 'CWD'
            ? value * 100000
            : outPutCurrency === 'GLOBAL'
            ? value * 10000
            : outPutCurrency === 'MULTICS'
            ? value * 100
            : value
        )
        .then((res) => {
          console.log('WORK', res);
          getStatus(res);
          setWithDrawModal(false);
          setWithdrawValueLoad(false);
        })
        .catch((err: Error) => {
          // console.log('ERROR', err);
          setWithdrawValueLoad(false);
          setOutPutError(true);
          setWithDrawModal(false);
          setOutPutErrorReason('Ошибка вывода средств.');
        });
    }
  };

  const getChipColor = (i: any) => {
    let color = '#E0F8FF';
    if (i.balanceKind === 1) {
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
  };

  const handleLogOut = () => {
    logOut();
    // TODO: Think better logic
    // history.push('/');
    // window.location.reload();
  };

  SwiperCore.use([Navigation, Pagination, A11y]);

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
        <Modal
          onClose={() => {
            setAddDrawModal(false);
            setEd('');
            setCurrency('');
          }}
          width={420}
          withClose
          ptl
        >
          <H3 center modalTitle>
            Пополнение баланса
          </H3>
          <div style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}>
            <Selectv2 data={balances && balances} withoutVolume setSwitch={setCurrency} />
            <Inputv2
              placeholder="Сумма пополнения"
              value={ed.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
              maxLength={8}
              onKeyDown={(e) => {
                if (e.keyCode === 8 && ed.length === 1) {
                  setEd('');
                }
              }}
              onChange={({ target: { value } }) => {
                setEd(value.replaceAll(/\D/g, ''));
              }}
            />
            <Styled.Message>
              Для пополнения баланса вы будете перенаправлены на cwd.global
            </Styled.Message>
            <PAButton onClick={changeBalance} disabled={Number(ed) < 1 || currency.length < 1}>
              Пополнить баланс
            </PAButton>
          </div>
        </Modal>
      </CSSTransition>

      <CSSTransition
        in={error === undefined ? false : error === false ? true : false}
        timeout={0}
        unmountOnExit
      >
        <Modal
          onClose={() => {
            setError(undefined);
            setCurrency('');
            setEd('');
          }}
          width={420}
          withClose
          p20
        >
          <H3 center modalTitle>
            Пополнение баланса
          </H3>
          <Styled.Desc style={{ marginBottom: '20px', maxWidth: '340px' }}>
            Мы сообщим вам о результате операции пополнения в личном уведомлении.
          </Styled.Desc>
        </Modal>
      </CSSTransition>

      <CSSTransition in={withDrawModal} timeout={0} unmountOnExit>
        <Modal
          onClose={() => {
            setWithDrawModal(false);
            setOutPutEd('');
            setOutPutCurrency('');
            setBlockchain('0');
            setService('0');
          }}
          width={420}
          withClose
          ptl
        >
          <H3 center modalTitle>
            Вывод средств
          </H3>
          <div style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}>
            <Selectv2 data={balances && balances} setSwitch={setOutPutCurrency} />
            <Inputv2
              value={outPutEd.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
              placeholder="Сумма вывода"
              maxLength={8}
              onKeyDown={(e) => {
                if (e.keyCode === 8 && outPutEd.length === 1) {
                  setOutPutEd('');
                  setBlockchain('0');
                  setService('0');
                }
              }}
              onChange={({ target: { value } }) => {
                const validValue = value.replaceAll(/\D/g, '');
                if (validValue[0] != '0') {
                  setOutPutEd(validValue);
                }
                if (validValue.length > 0 && validValue[0] != '0') {
                  getCommisions(validValue);
                }
              }}
            />
            <Styled.Commision marginT={20} marginB={10}>
              Комиссия блокчейна: <span>{blockchain}</span>
            </Styled.Commision>
            <Styled.Commision marginT={10} marginB={20}>
              Комиcсия сервиса: <span>{service}</span>
            </Styled.Commision>
            <PAButton
              onClick={outPutBalance}
              disabled={Number(outPutEd) < 1 || outPutCurrency.length < 1}
            >
              Вывести средства
            </PAButton>
          </div>
        </Modal>
      </CSSTransition>

      <CSSTransition in={outPutError === false ? true : false} timeout={0} unmountOnExit>
        <Modal
          onClose={() => {
            setOutPutError(undefined);
            setOutPutCurrency('');
            setOutPutEd('');
          }}
          width={420}
          withClose
          p20
        >
          <H3 center modalTitle>
            Успешный вывод средств
          </H3>
          <Styled.Desc>С баланса личного кабинета успешно выведены средства в размере:</Styled.Desc>
          <Styled.Desc bold mMore>
            {(
              Number(outPutEd.replace(/[^0-9]/gi, '')) +
              Number(blockchain) +
              Number(service)
            ).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}{' '}
            {outPutCurrency}
          </Styled.Desc>
          <Styled.Desc mLess>
            К зачислению: {Number(outPutEd).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
          </Styled.Desc>
          <Styled.Desc mLess>Комиссия блокчейн: {blockchain}</Styled.Desc>
          <Styled.Desc mLess>Комиссия сервиса: {service}</Styled.Desc>
        </Modal>
      </CSSTransition>

      <CSSTransition in={outPutError} timeout={0} unmountOnExit>
        <Modal
          onClose={() => {
            setOutPutError(undefined);
            setOutPutCurrency('');
            setOutPutEd('');
            setService('0');
            setBlockchain('0');
          }}
          width={420}
          withClose
          p20
        >
          <H3 center modalTitle>
            Ошибка вывода средств
          </H3>
          <Styled.Desc>С баланса личного кабинета не были выведены средства в размере:</Styled.Desc>
          <Styled.Desc bold style={{ marginBottom: '10px' }}>
            {(
              Number(outPutEd.replace(/[^0-9]/gi, '')) +
              Number(blockchain) +
              Number(service)
            ).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}{' '}
            {outPutCurrency}
          </Styled.Desc>
          <Styled.Desc mLess>
            К зачислению: {Number(outPutEd).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
          </Styled.Desc>
          <Styled.Desc mLess>Комиссия блокчейн: {blockchain}</Styled.Desc>
          <Styled.Desc mLess style={{ marginBottom: '0px' }}>
            Комиссия сервиса: {service}
          </Styled.Desc>
          <Styled.Desc danger mMore>
            {outPutErrorReason}
          </Styled.Desc>
        </Modal>
      </CSSTransition>

      <ConvertingModal open={openConverting} setOpen={setOpenConverting} />

      <Header />
      <DepositsPanelContainer>
        <PanelTitleBlock>
          <H4>Личный кабинет</H4>
          <LogoutButton onClick={handleLogOut}>
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

            {screen.width <= 768 && (
              <BalanceChipsBlock>
                {balanceChips &&
                  balanceChips.map((i: any, idx: number) => {
                    return (
                      <Chip
                        key={`chip-item-${idx}`}
                        leftIcon={i.locked ? <LockIcon /> : null}
                        bgColor={getChipColor(i)}
                      >
                        <span>
                          {Number(i.volume).toLocaleString('ru-RU', {
                            maximumFractionDigits: 4,
                          })}
                        </span>
                        &nbsp;
                        {Balance[i.balanceKind]}
                      </Chip>
                    );
                  })}
              </BalanceChipsBlock>
            )}

            {screen.width > 1024 ? (
              <PanelActionsBlock>
                <SecondaryButton title={'Конвертация'} onClick={() => setOpenConverting(true)} />
                <SecondaryButton title={'Пополнить баланс'} onClick={() => setAddDrawModal(true)} />
                <SecondaryButton
                  title={'Вывести средства'}
                  onClick={() => setWithDrawModal(true)}
                />
              </PanelActionsBlock>
            ) : (
              <SelectButton
                buttons={[
                  { text: 'Пополнить баланс', onClick: () => setAddDrawModal(true) },
                  { text: 'Вывести средств', onClick: () => setWithDrawModal(true) },
                  { text: 'Конвертация', onClick: () => setOpenConverting(true) },
                ]}
              />
            )}
          </PanelHeader>
          {/* One */}
          {screen.width > 768 && (
            <BalanceChipsBlock>
              {balanceChips &&
                balanceChips.map((i: any, idx: number) => {
                  return (
                    <Chip
                      key={`chip-item-${idx}`}
                      leftIcon={i.locked ? <LockIcon /> : null}
                      bgColor={getChipColor(i)}
                    >
                      <span>
                        {Number(i.volume).toLocaleString('ru-RU', {
                          maximumFractionDigits: 4,
                        })}
                      </span>
                      &nbsp;
                      {Balance[i.balanceKind]}
                    </Chip>
                  );
                })}
            </BalanceChipsBlock>
          )}

          {/* Two */}

          {screen.width > 768 ? (
            <TabsBlock>
              <TabNavItem to={routers.deposits} exact>
                <div>Мои депозиты</div>
              </TabNavItem>
              <TabNavItem to={routers.p2pchanges}>
                <div>P2P обмены</div>
              </TabNavItem>
              <TabNavItem to={routers.operations}>
                <div>История операций</div>
              </TabNavItem>
              <TabNavItem to={routers.notifications}>
                <div>Уведомления</div>
              </TabNavItem>
              <TabNavItem to={routers.settings}>
                <div>Настройки</div>
              </TabNavItem>
            </TabsBlock>
          ) : (
            <SwiperUI
              onClick={() => console.log(11)}
              slidesPerView={4}
              spaceBetween={20}
              freeMode={true}
              pagination={false}
              className="mySwiper"
              onSlideChange={(swiperCore) => {
                const { activeIndex, previousIndex, realIndex } = swiperCore;
                console.log({ activeIndex, previousIndex, realIndex });
              }}
              // slideToClickedSlide={true}

              onSwiper={(swiper) => swiper.update()}
              // navigation={{
              //   nextEl: '.next',
              //   prevEl: '.prev',
              // }}
              //   observer={true}
              //   observeParents={true}
              //   loop={true}
              //   watchSlidesVisibility={true}
              //   watchSlidesProgress={true}
              onInit={(swiper) => {
                swiper.navigation.update();
              }}
            >
              <SwiperSlide>
                <TabNavItem to={routers.deposits} exact>
                  <div>Мои депозиты</div>
                </TabNavItem>
              </SwiperSlide>
              <SwiperSlide>
                <TabNavItem to={routers.p2pchanges}>
                  <div>P2P обмены</div>
                </TabNavItem>
              </SwiperSlide>
              <SwiperSlide>
                <TabNavItem to={routers.operations}>
                  <div>История операций</div>
                </TabNavItem>
              </SwiperSlide>
              <SwiperSlide>
                <TabNavItem to={routers.notifications}>
                  <div>Уведомления</div>
                </TabNavItem>
              </SwiperSlide>
              <SwiperSlide>
                <TabNavItem to={routers.settings}>
                  <div>Настройки</div>
                </TabNavItem>
              </SwiperSlide>
            </SwiperUI>
          )}
        </PanelCard>
      </DepositsPanelContainer>
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
                  <Styled.ModalCommisionCount>{blockchainCommision} CWD</Styled.ModalCommisionCount>
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
      <Styled.Note>
        <Notification onDelete={onDelete} data={notifications} />
      </Styled.Note>
    </>
  );
};

const SwiperUI = styled(Swiper)`
  display: flex;
  align-items: center;
  gap: 40px;
  .swiper-slide-active {
    font-weight: 500;
    opacity: 1;
    border-bottom: 2px solid ${(props) => props.theme.blue};
    width: auto;
    padding-bottom: 10px;
  }

  & > div > div {
    width: auto !important;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const CustomPage = styled(Styled.Page)`
  flex: 1;
`;

const DepositsPanelContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 100%;
    padding: 0px 34px;
    margin: 0 auto;
    max-width: 1128px;
  }
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const PanelTitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 40px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    padding: 0px 20px;
  }
`;

const H4 = styled.h4`
  color: ${(props) => props.theme.titles};
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    & > svg {
      display: none;
    }
  }
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
  @media (max-width: 768px) {
    flex-direction: column;
    border-bottom: 1px solid #ebebf2;
    margin-bottom: 10px;
    padding-bottom: 10px;
    gap: 10px;
  }
`;

const PanelInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const PanelActionsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const BalanceInfoText = styled.div`
  color: ${(props) => props.theme.titles};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;

    color: #3f3e4e;
  }
`;

const BalanceValueText = styled.div`
  color: ${(props) => props.theme.titles};
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  @media (max-width: 768px) {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;

    color: #3f3e4e;
  }
`;

const BalanceChipsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebebf2;
  @media (max-width: 768px) {
    border-bottom: none;
    margin-bottom: 0px;
    padding-bottom: 0px;

    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const TabsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const TabNavItem = styled(NavLink)`
  color: ${(props) => props.theme.black};
  opacity: 0.6;
  font-size: 14px;
  line-height: 16px;
  padding-bottom: 10px;

  &.active {
    font-weight: 500;
    opacity: 1;

    border-bottom: 2px solid ${(props) => props.theme.blue};
  }
  & > div {
    white-space: nowrap;
  }
`;
