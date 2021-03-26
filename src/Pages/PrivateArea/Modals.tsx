import React, { FC } from "react";
import * as Styled from "./Styles.elements";
import { CSSTransition } from "react-transition-group";
import { Modal } from "../../components/Modal/Modal";
import { DepositsCollection } from "../../types/info";

type Props = {
  depositListModal: boolean;
  setDepositListModal: (depositListModal: boolean) => void;
  handleBackModal: () => void;
  depositsList: DepositsCollection[] | null;
  selectDeposit: (item: DepositsCollection) => void;
};

export const DepositListModal: FC<Props> = ({
  depositListModal,
  setDepositListModal,
  handleBackModal,
  depositsList,
  selectDeposit,
}) => {
  return (
    <CSSTransition
      in={depositListModal}
      timeout={3}
      classNames="modal"
      unmountOnExit
    >
      <Modal onClose={() => setDepositListModal(false)}>
        <Styled.ModalBack onClick={handleBackModal} />
        <Styled.ModalTitle>Добавить депозит</Styled.ModalTitle>
        <Styled.ModalList>
          <Styled.ModalListItem>
            <Styled.ModalListText head>Название</Styled.ModalListText>
            <Styled.ModalListText head>Мин. платеж</Styled.ModalListText>
            <Styled.ModalListText head>Срок вклада</Styled.ModalListText>
          </Styled.ModalListItem>
          {depositsList
            ? depositsList.map((item) => (
                <Styled.ModalListItem
                  key={item.id}
                  onClick={() => selectDeposit(item)}
                >
                  <Styled.ModalListText>{item.name}</Styled.ModalListText>
                  <Styled.ModalListText>
                    {(item.minAmount / 100000).toLocaleString()}
                  </Styled.ModalListText>
                  <Styled.ModalListText>
                    {item.duration} дн
                  </Styled.ModalListText>
                </Styled.ModalListItem>
              ))
            : ""}
        </Styled.ModalList>
      </Modal>
    </CSSTransition>
  );
};

export const ModalDividends = () => {
  return (
    <CSSTransition in={false} timeout={3} classNames="modal" unmountOnExit>
      <Modal onClose={() => false} width={280}>
        <Styled.ModalDividends>
          <Styled.PayCardBlock>
            <Styled.PayText wbold>Начисление дивидендов</Styled.PayText>
            <Styled.PayText>25 февраля 2021г.</Styled.PayText>
            <Styled.Hr />
          </Styled.PayCardBlock>
          <Styled.PayCardBlock>
            <Styled.PayText small>Название</Styled.PayText>
            <Styled.PayText>Депозит №1</Styled.PayText>
          </Styled.PayCardBlock>
          <Styled.PayCardBlock>
            <Styled.PayText small>Дата открытия</Styled.PayText>
            <Styled.PayText>01/01/2019</Styled.PayText>
          </Styled.PayCardBlock>
          <Styled.PayCardBlock>
            <Styled.PayText small>Сумма депозита</Styled.PayText>
            <Styled.PayText>400 000</Styled.PayText>
          </Styled.PayCardBlock>
          <Styled.PayCardBlock>
            <Styled.PayText small>Дата следующей выплаты</Styled.PayText>
            <Styled.PayText>01/03/2021</Styled.PayText>
          </Styled.PayCardBlock>
          <Styled.PayCardBlock>
            <Styled.PayText small>Сумма выплаты</Styled.PayText>
            <Styled.PayText>40 000</Styled.PayText>
          </Styled.PayCardBlock>
          <Styled.PayCardBlock>
            <Styled.PayText small>Процент выплаты</Styled.PayText>
            <Styled.PayText>10%</Styled.PayText>
          </Styled.PayCardBlock>
        </Styled.ModalDividends>
      </Modal>
    </CSSTransition>
  );
};
