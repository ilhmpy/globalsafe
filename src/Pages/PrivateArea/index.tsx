import React, {
  useState,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { Header } from "../../components/Header/Header";
import * as Styled from "./Styles.elements";
import { CSSTransition } from "react-transition-group";
import { Modal } from "../../components/Modal/Modal";
import { RootDeposits, DepositsCollection } from "../../types/info";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/Button/Button";
import { AppContext } from "../../context/HubContext";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { DepositListModal } from "./Modals";
import { Tabs, Tab } from "../../components/UI/Tabs";
import { Card, Container } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { useTranslation } from "react-i18next";
import { Info } from "./Info";
import { InfoBalance } from "./InfoBalance";
import { InfoDeposits } from "./InfoDeposits";
import { OnePage } from "./OnePage";
import moment from "moment";
import "moment/locale/ru";
import { Balance } from "../../types/balance";
import { TestTolltips, Tooltip } from "../../components/Tooltips/Tooltips";

export const InfoMain = () => {
  const [addDeposit, setAddDeposit] = useState(false);
  const [depositListModal, setDepositListModal] = useState(false);
  const [addDepositValue, setAddDepositValue] = useState("");
  const [depositSelect, setDepositSelect] = useState<null | DepositsCollection>(
    null
  );
  const [depositsList, setDepositsList] = useState<DepositsCollection[] | null>(
    null
  );
  const [withdraw, setWithdraw] = useState(false);
  const [loadDeposit, setLoadDeposit] = useState(false);
  const [condition, setContition] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [depositError, setDepositError] = useState(false);
  const [withdrawValue, setWithdrawValue] = useState("");
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const balance = appContext.balance;
  const hubConnection = appContext.hubConnection;
  const balanceList = appContext.balanceList;
  const { t, i18n } = useTranslation();
  const inputRef = useRef<any>(null);
  const lang = localStorage.getItem("i18nextLng") || "ru";
  const languale = lang === "ru" ? 1 : 0;
  moment.locale(lang);
  const handleDepositModal = () => {
    setAddDeposit(false);
    setDepositSuccess(false);
    setDepositListModal(true);
  };

  const handleBackModal = () => {
    setAddDeposit(true);
    setDepositListModal(false);
  };

  const alert = (
    title: string,
    message: string,
    type: "success" | "default" | "warning" | "info" | "danger"
  ) => {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
      },
    });
  };

  const selectDeposit = (item: DepositsCollection) => {
    handleBackModal();
    setDepositSelect(item);
    setAddDepositValue((item.minAmount / 100000).toString());
  };

  const openNewDeposit = () => {
    setAddDeposit(false);
    if (hubConnection && depositSelect !== null) {
      setLoadDeposit(true);
      hubConnection
        .invoke(
          "CreateUserDeposit",
          +addDepositValue * 100000,
          depositSelect.safeId
        )
        .then((res) => {
          setLoadDeposit(false);
          setWithdraw(false);
          setWithdrawValue("");
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
          setWithdrawValue("");
          setDepositError(true);
          // alert(t("alert.error"), t("alert.depositErrorMsg"), "danger");
        })
        .finally(() => {
          setDepositSelect(null);
          setAddDepositValue("");
        });
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootDeposits>("GetDeposits", languale, false, 0, 40)
        .then((res) => {
          console.log("res dep", res);
          if (res.collection.length) {
            setDepositsList(res.collection);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, languale]);

  const withdrawBalance = () => {
    if (hubConnection) {
      hubConnection
        .invoke("Withdraw", 1, +withdrawValue * 100000)
        .then((res) => {
          setWithdraw(false);
          setWithdrawValue("");
          alert(t("alert.success"), t("alert.successMsg"), "success");
        })
        .catch((err: Error) => {
          setWithdraw(false);
          setWithdrawValue("");
          alert(t("alert.error"), t("alert.errorMsg"), "danger");
        });
    }
  };

  const balanceAsset = balanceList?.some(
    (item) => item.balanceKind === depositSelect?.asset
  );

  const balanseType = balanceList?.filter(
    (i) => i.balanceKind === depositSelect?.asset
  );

  const asset =
    balanseType && depositSelect && balanseType.length
      ? balanseType[0].volume >= depositSelect?.minAmount
      : false;

  if (user === null) {
    return null;
  }

  if (user === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <Styled.Page>
        <Container>
          <UpTitle>{t("privateArea.uptitle")}</UpTitle>
        </Container>
        <ReactNotification />
        <Container>
          <Card>
            <Styled.InfoWrap>
              <Styled.UserBlock>
                <Styled.InfoTitle>{user}</Styled.InfoTitle>
                <Styled.BalanceItem>
                  <Styled.BalanceItemName>
                    {t("privateArea.balance")}
                  </Styled.BalanceItemName>
                  <Styled.BalanceItemValue pink>
                    {balance ? (balance / 100000).toLocaleString() : "0"}
                  </Styled.BalanceItemValue>
                </Styled.BalanceItem>
              </Styled.UserBlock>
              <Styled.InfoButtons>
                <Button dangerOutline onClick={() => setAddDeposit(true)}>
                  {t("privateArea.newDeposit")}
                </Button>
                <Button danger onClick={() => setWithdraw(true)}>
                  {t("privateArea.withdraw")}
                </Button>
              </Styled.InfoButtons>
            </Styled.InfoWrap>
            <Styled.SmallButtonsWrap>
              <Styled.SmallButton danger>1 FUTURE4</Styled.SmallButton>
              <Styled.SmallButton blue>1 FUTURE5</Styled.SmallButton>
              <Styled.SmallButton green>1 FUTURE6</Styled.SmallButton>
            </Styled.SmallButtonsWrap>
            <Tabs>
              <Styled.NavTabs to="/info" exact>
                <div>{t("privateArea.tabs.tab1")}</div>{" "}
              </Styled.NavTabs>
              <Styled.NavTabs to="/info/deposits">
                <div>{t("privateArea.tabs.tab2")}</div>{" "}
              </Styled.NavTabs>
              <Styled.NavTabs to="/info/balance">
                <div>{t("privateArea.tabs.tab3")}</div>{" "}
              </Styled.NavTabs>
            </Tabs>
          </Card>
        </Container>
        <Switch>
          <Route path="/info" component={Info} exact />
          <Route path="/info/deposits" component={InfoDeposits} exact />
          <Route path="/info/balance" component={InfoBalance} exact />
          <Route path="/info/deposits/:slug" component={OnePage} />
        </Switch>
        <CSSTransition
          in={depositSuccess}
          timeout={0}
          classNames="modal"
          unmountOnExit
        >
          <Modal width={540} onClose={() => setDepositSuccess(false)}>
            <Styled.ModalBlock>
              <Styled.ModalTitle>Депозит успешно создан</Styled.ModalTitle>
              <Styled.ModalButton onClick={handleDepositModal} danger>
                Перейти к списку
              </Styled.ModalButton>
            </Styled.ModalBlock>
          </Modal>
        </CSSTransition>
        <CSSTransition
          in={depositError}
          timeout={0}
          classNames="modal"
          unmountOnExit
        >
          <Modal width={540} onClose={() => setDepositError(false)}>
            <Styled.ModalBlockWide>
              <Styled.ModalTitle>Депозит не создан</Styled.ModalTitle>
              <p>
                Средства не будут списаны с лицевого счета. Обратитесь к
                администратору.
              </p>
            </Styled.ModalBlockWide>
          </Modal>
        </CSSTransition>
        <div>
          {withdraw && (
            <Modal onClose={() => setWithdraw(false)}>
              <Styled.ModalBlock>
                <Styled.ModalTitle>
                  {t("privateArea.withdraw")}
                </Styled.ModalTitle>
                <Input
                  onChange={(e) => setWithdrawValue(e.target.value)}
                  placeholder={t("privateArea.amountEnter")}
                  step="any"
                  type="number"
                  ref={inputRef}
                  value={withdrawValue}
                />
                <Styled.ModalButton
                  as="button"
                  disabled={!withdrawValue}
                  onClick={withdrawBalance}
                  danger
                >
                  {t("privateArea.withdraw")}
                </Styled.ModalButton>
              </Styled.ModalBlock>
            </Modal>
          )}
          <CSSTransition
            in={condition}
            timeout={0}
            classNames="modal"
            unmountOnExit
          >
            <Modal width={540} onClose={() => setContition(false)}>
              <Styled.Conditions open>
                {depositSelect ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: depositSelect.description,
                    }}
                  />
                ) : (
                  ""
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
              <Modal width={540} onClose={() => setAddDeposit(false)}>
                <Styled.ModalTitle mt>
                  {t("privateArea.addDeposit")}
                </Styled.ModalTitle>
                <Styled.ModalDeposits>
                  <div>
                    <Styled.ModalButton
                      mb
                      as="button"
                      onClick={handleDepositModal}
                      dangerOutline
                    >
                      {depositSelect
                        ? depositSelect.name
                        : t("privateArea.choiseDeposite")}{" "}
                      <Styled.IconRotate rights>
                        <Styled.ModalBack />
                      </Styled.IconRotate>
                    </Styled.ModalButton>
                    <Input
                      onChange={(e) => setAddDepositValue(e.target.value)}
                      placeholder={t("privateArea.amountEnter")}
                      type="number"
                      ref={inputRef}
                      value={addDepositValue}
                    />
                    <Styled.ModalButton
                      as="button"
                      disabled={!balanceAsset || !addDepositValue}
                      onClick={openNewDeposit}
                      danger
                    >
                      Добавить
                    </Styled.ModalButton>
                    {depositSelect ? (
                      <>
                        <Styled.Program onClick={() => setContition(true)}>
                          Условия программы
                        </Styled.Program>
                      </>
                    ) : (
                      <br />
                    )}
                    {depositSelect && !asset ? (
                      <Styled.Warning>
                        Для активации депозита необходимо{" "}
                        {depositSelect.minAmount / 100000}{" "}
                        {Balance[depositSelect.asset]}
                      </Styled.Warning>
                    ) : null}
                    {depositSelect && asset ? (
                      <Styled.Warning>
                        При активации депозита будет списано{" "}
                        {depositSelect.minAmount / 100000}{" "}
                        {Balance[depositSelect.asset]}
                      </Styled.Warning>
                    ) : null}
                    <Styled.ModalButton blue>Перевести</Styled.ModalButton>
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
                          href={`https://cwd.global/shopping/payment?to_name=${depositSelect.account}&amount=${depositSelect.minAmount}`}
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
    </>
  );
};
