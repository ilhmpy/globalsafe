import React, { FC } from "react";
import * as Styled from "./Styles.elements";
import { CSSTransition } from "react-transition-group";
import { Modal } from "../../components/Modal/Modal";
import { DepositsCollection } from "../../types/info";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

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

type DividendsProps = {
  onClose: () => void;
  data: any;
  open: boolean;
};

export const ModalDividends: FC<DividendsProps> = ({ onClose, data, open }) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <Modal onClose={onClose} width={280}>
      <Styled.ModalDividends onClick={handleContainerClick}>
        {data.userDeposit ? (
          <>
            <Styled.PayCardBlock>
              <Styled.PayText wbold>Начисление дивидендов</Styled.PayText>
              <Styled.PayText>
                {moment(data.date).format("DD MMMM YYYY")}г.
              </Styled.PayText>
              <Styled.Hr />
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>Название</Styled.PayText>
              <Styled.PayText>{data.userDeposit.deposit.name}</Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>Дата открытия</Styled.PayText>
              <Styled.PayText>
                {moment(data.userDeposit.creationDate).format("DD/MM/YYYY")}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>Сумма депозита</Styled.PayText>
              <Styled.PayText>{data.userDeposit.baseAmountView}</Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>Дата следующей выплаты</Styled.PayText>
              <Styled.PayText>
                {moment(data.userDeposit.paymentDate).format("DD/MM/YYYY")}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>Сумма выплаты</Styled.PayText>
              <Styled.PayText>
                {(data.balance / 100000).toLocaleString("ru-RU", {
                  maximumFractionDigits: 5,
                })}
              </Styled.PayText>
            </Styled.PayCardBlock>
            <Styled.PayCardBlock>
              <Styled.PayText small>Процент выплаты</Styled.PayText>
              <Styled.PayText>
                {(
                  (data.balance / data.userDeposit.baseAmount) *
                  100
                ).toLocaleString("ru-RU", {
                  maximumFractionDigits: 2,
                })}
                %
              </Styled.PayText>
            </Styled.PayCardBlock>
          </>
        ) : (
          <>
            <Styled.PayCardBlock>
              <Styled.PayText>Нет данных</Styled.PayText>
            </Styled.PayCardBlock>
          </>
        )}
      </Styled.ModalDividends>
    </Modal>
  );
};
