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
import { ConvertingModalSuccess } from './ConveringSuccessModal';
import { ConvertingModal } from './ConvertingModal';
import { ConvertingModalFail } from './ConvertingModalFail';
import { DepositOpen } from './Deposits/DepositOpen';
import { DepositProgram } from './Deposits/DepositProgram';
import { Deposits } from './Deposits/Deposits';
// import { InfoBalance } from './InfoBalance';
import { DepositListModal, TokenModal } from './Modals';
import { OnePage } from './OnePage';
import { Settings } from './Settings';
import { NewPayMethod } from './Settings/NewPayMethod';
import { ViewPayMethod } from './Settings/ViewPayMethod';
import * as Styled from './Styles.elements';
import { Footer } from '../../components/Footer/Footer';
import { Advert } from './Exchanges/Advert';
import { HistoryOperations } from './HistoryOperations';
import { OwnExchanges } from './Exchanges/OwnExchanges';
import { SingleExchangeDetails } from './Exchanges/SingleExchangeDetails';
import { OrderToSell } from './Exchanges/OrderToSell';
import { Certificates } from './Certificates/Certificates';
import { HeadBar } from './components/HeadBar/HeadBar';

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
  const logOut = appContext.logOut;
  const inputRef = useRef<any>(null);
  const history = useHistory();
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;
  moment.locale(lang);

  return (
    <>
      <Header />
      <Styled.Page>
        <HeadBar />
        <Switch>
          {/* <Route path="/info" component={Info} exact /> */}
          {/* <Route path="/info/deposits" component={InfoDeposits} exact /> */}
          <Route path={routers.deposits} component={Deposits} exact />
          <Route path={routers.depositsProgram} component={DepositProgram} exact />
          <Route path={routers.depositsOpen} component={DepositOpen} exact />
          {/* <Route path="/info/balance" component={InfoBalance} exact /> */}
          <Route path="/info/deposits/:slug" component={OnePage} exact />
          <Route path={routers.p2pchanges} component={Advert} exact />
          <Route path={routers.p2pchangesOrderToSell} component={OrderToSell} exact />
          <Route path={routers.p2pchangesOwn} component={OwnExchanges} exact />
          <Route
            path={routers.p2pchangesSingleExchangeDetails}
            component={SingleExchangeDetails}
            exact
          />
          <Route path={routers.settings} component={Settings} exact />
          <Route path={routers.settingsNewPayMethod} component={NewPayMethod} exact />
          <Route path={routers.settingsViewPayMethod} component={ViewPayMethod} exact />
          <Route path={routers.operations} component={HistoryOperations} exact />
          <Route path={routers.certificates} component={Certificates} exact />
        </Switch>

        <Footer />
      </Styled.Page>
    </>
  );
};

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
