import moment from 'moment';
import 'moment/locale/ru';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ReactComponent as Copy } from '../../assets/svg/copy.svg';
import { ReactComponent as LockIcon } from '../../assets/v2/svg/lock.svg';
import { ReactComponent as LogOutIcon } from '../../assets/v2/svg/logOut.svg';
// import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';
import { Notification } from '../../components/Notify/Notification';
import { Select } from '../../components/Select/Select4';
import { Tooltip } from '../../components/Tooltips/Tooltips';
import { Input } from '../../components/UI/Input';
import { Loading } from '../../components/UI/Loading';
import { Chip, SecondaryButton } from '../../components/UI/V4';
import { routers } from '../../constantes/routers';
import { AppContext } from '../../context/HubContext';
import { Card, Container } from '../../globalStyles';
import { Balance, Notify } from '../../types/balance';
import { Commisions, DepositsCollection, RootDeposits } from '../../types/info';
import { ConvertingModalSuccess } from './ConveringSuccessModal';
import { ConvertingModal } from './ConvertingModal';
import { ConvertingModalFail } from './ConvertingModalFail';
import { DepositOpen } from './Deposits/DepositOpen';
import { DepositProgram } from './Deposits/DepositProgram';
import { Deposits } from './Deposits/Deposits';
import { Info } from './Info';
import { InfoBalance } from './InfoBalance';
import { DepositListModal, TokenModal } from './Modals';
import { OnePage } from './OnePage';
import { Settings } from './Settings';
import { NewPayMethod } from './Settings/NewPayMethod';
import { ViewPayMethod } from './Settings/ViewPayMethod';
import * as Styled from './Styles.elements';

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
          Balance[currencyValue as keyof typeof Balance],
          currencyValue === 'CWD'
            ? +withdrawValue * 100000
            : currencyValue === 'GLOBAL'
            ? +withdrawValue * 10000
            : currencyValue === 'MULTICS'
            ? +withdrawValue * 100
            : +withdrawValue
        )
        .then((res) => {
          handleCloseWithdrawModal();
          createNotify({
            text: t('alert.successMsg'),
            error: false,
            timeleft: 5,
            id: notifications.length,
          });
          setWithdrawValueLoad(false);
        })
        .catch((err: Error) => {
          handleCloseWithdrawModal();
          console.log(err);
          createNotify({
            text: t('alert.errorMsg'),
            error: true,
            timeleft: 5,
            id: notifications.length,
          });
          setWithdrawValueLoad(false);
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
    // get commisions from server
    if (hubConnection) {
      hubConnection
        .invoke<Commisions>('GetWithdrawFee', 1, Number(value))
        .then((res: any) => {
          setBlockchainCommision((res.networkFee / 100000).toString());
          setServiceCommision((res.serviceFee / 100000).toString());
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

  // Get balance Chip Color
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

      <TokenModal
        block={toTokenModal}
        setBlock={setToTokenModal}
        setToTranslate={setCountToTranslate}
        onButton={() => {
          return;
        }}
      />

      <ConvertingModal open={openConverting} setOpen={setOpenConverting} setIsSuccessConverting={setIsSuccessConverting} setIsFailConverting={setIsFailConverting} />
      <ConvertingModalSuccess open={isSuccessConverting} setOpen={setIsSuccessConverting} />
      <ConvertingModalFail open={isFailConverting} setOpen={setIsFailConverting} />

      <Header />
      <Styled.Page>
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
                <SecondaryButton title={'Конвертация'} onClick={() => setOpenConverting(true)} />
                <SecondaryButton
                  title={'Пополнить баланс'}
                  // eslint-disable-next-line
                  onClick={() => {}}
                />
                <SecondaryButton
                  title={'Вывести средства'}
                  // eslint-disable-next-line
                  onClick={() => {}}
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
              <TabNavItem to="/p2p-changes">
                <div>P2P обмены</div>
              </TabNavItem>
              <TabNavItem to="/operations-history">
                <div>История операций</div>
              </TabNavItem>
              <TabNavItem to={routers.settings}>
                <div>Настройки</div>
              </TabNavItem>
            </TabsBlock>
          </PanelCard>
        </DepositsPanelContainer>

        <Switch>
          {/* <Route path="/info" component={Info} exact /> */}
          {/* <Route path="/info/deposits" component={InfoDeposits} exact /> */}
          <Route path={routers.deposits} component={Deposits} exact />
          <Route path={routers.depositsProgram} component={DepositProgram} exact />
          <Route path={routers.depositsOpen} component={DepositOpen} exact />
          <Route path="/info/balance" component={InfoBalance} exact />
          <Route path="/info/deposits/:slug" component={OnePage} exact />
          <Route path={routers.settings} component={Settings} exact />
          <Route path={routers.settingsNewPayMethod} component={NewPayMethod} exact />
          <Route path={routers.settingsViewPayMethod} component={ViewPayMethod} exact />
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
  color: ${(props) => props.theme.titles};
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
  align-items: center;
  gap: 20px;
`;

const BalanceInfoText = styled.div`
  color: ${(props) => props.theme.titles};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 10px;
`;

const BalanceValueText = styled.div`
  color: ${(props) => props.theme.titles};
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
  border-bottom: 1px solid #ebebf2;
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
`;
