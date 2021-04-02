import React, {
  useState,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Header } from "../../components/Header/Header";
import styled, { css } from "styled-components/macro";
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

export const Info = () => {
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
  const [withdrawValue, setWithdrawValue] = useState("");
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const inputRef = useRef<any>(null);

  const handleDepositModal = () => {
    setAddDeposit(false);
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
          console.log("CreateUserDeposit", res);
          setLoadDeposit(false);
          setWithdraw(false);
          setWithdrawValue("");
          alert("Успешно", "Депозит успешно создан", "success");
        })
        .catch((err: Error) => {
          console.log(err);
          setLoadDeposit(false);
          setWithdraw(false);
          setWithdrawValue("");
          alert("Ошибка", "Депозит не создан", "danger");
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
        .invoke<RootDeposits>("GetDeposits", 1, 0, 10)
        .then((res) => {
          if (res.collection.length) {
            setDepositsList(res.collection);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  const withdrawBalance = () => {
    if (hubConnection) {
      hubConnection
        .invoke("Withdraw", 1, +withdrawValue * 100000)
        .then((res) => {
          // console.log("Withdraw", res);
          if (res === 1) {
            setWithdraw(false);
            setWithdrawValue("");
            alert("Успешно", "Средства успешно переведены", "success");
          } else {
            setWithdraw(false);
            setWithdrawValue("");
            alert("Ошибка", "Ошибка вывода", "danger");
          }
        })
        .catch((err: Error) => {
          setWithdraw(false);
          setWithdrawValue("");
          alert("Ошибка", "Ошибка вывода", "danger");
        });
    }
  };

  return (
    <div>
      {withdraw && (
        <Modal onClose={() => setWithdraw(false)}>
          <Styled.ModalBlock>
            <Styled.ModalTitle>Вывести средства</Styled.ModalTitle>
            <Input
              onChange={(e) => setWithdrawValue(e.target.value)}
              placeholder="Введите сумму"
              type="number"
              step="any"
              ref={inputRef}
              value={withdrawValue}
            />
            <Styled.ModalButton
              as="button"
              disabled={!withdrawValue}
              onClick={withdrawBalance}
              danger
            >
              Вывести средства
            </Styled.ModalButton>
          </Styled.ModalBlock>
        </Modal>
      )}
      <CSSTransition
        in={addDeposit && !depositListModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <Styled.ModalDepositsWrap>
          <Modal width={540} onClose={() => setAddDeposit(false)}>
            <Styled.ModalTitle mt>Добавить депозит</Styled.ModalTitle>
            <Styled.ModalDeposits>
              <div>
                <Styled.ModalButton
                  mb
                  as="button"
                  onClick={handleDepositModal}
                  dangerOutline
                >
                  {depositSelect ? depositSelect.name : "Выберите депозит"}{" "}
                  <Styled.IconRotate rights>
                    <Styled.ModalBack />
                  </Styled.IconRotate>
                </Styled.ModalButton>
                <Input
                  onChange={(e) => setAddDepositValue(e.target.value)}
                  placeholder="Введите сумму"
                  type="number"
                  ref={inputRef}
                  value={addDepositValue}
                />
                <Styled.ModalButton
                  as="button"
                  disabled={!addDepositValue}
                  onClick={openNewDeposit}
                  danger
                >
                  Добавить
                </Styled.ModalButton>
              </div>
              {depositSelect ? (
                <Styled.Conditions>
                  {depositSelect.description}
                </Styled.Conditions>
              ) : (
                ""
              )}
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
  );
};
