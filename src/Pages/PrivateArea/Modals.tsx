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
