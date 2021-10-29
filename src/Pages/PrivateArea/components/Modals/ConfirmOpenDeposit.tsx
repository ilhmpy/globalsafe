import moment from 'moment';
import React, { FC, useContext } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import { AppContext } from '../../../../context/HubContext';
import { Balance } from '../../../../types/balance';
import { CollectionListDeposits } from '../../../../types/deposits';
import * as S from './S.el';

type Props = {
  onClose: (isAgree: boolean) => void;
  open: boolean;
  selectedDeposit?: CollectionListDeposits;
  sumValue: string;
};

export const ConfirmOpenDeposit: FC<Props> = ({ onClose, open, sumValue }: Props) => {
  const { selectedDeposit } = useContext(AppContext);
  const { name, asset, isInstant, isActive, paymentRatio, duration, paymentInterval } =
    selectedDeposit;

  return (
    <>
      {open && (
        <Modal onClose={() => onClose(false)} open={open}>
          <S.Container>
            <S.Title>Подтверждение открытия депозита</S.Title>
            <S.TextWrap>
              <S.Text>
                Списание средств произойдет с баланса личного кабинета сразу после подтверждения
                открытия депозита.
              </S.Text>
            </S.TextWrap>
            <S.List>
              <S.ListItem>
                <S.Text>
                  Программа депозита: <strong>{name}</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Тело депозита:
                  <strong>{` ${sumValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ${
                    Balance[selectedDeposit?.asset as number]
                  }`}</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Отложенная выплата: <strong>{isInstant ? 'Да' : 'Нет'}</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Замороженый депозит: <strong>{isActive ? 'Да' : 'Нет'}</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Дата открытия депозита: <strong>{moment().format('DD.MM.YYYY')}</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Дата закрытия депозита:{' '}
                  <strong>{moment().add(90, 'days').format('DD.MM.YYYY')}</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Сумма выплаты:
                  <strong>{` ${(+sumValue * paymentRatio * (duration / paymentInterval))
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ${Balance[asset as number]}`}</strong>
                </S.Text>
              </S.ListItem>
            </S.List>
            <S.TextWrap big>
              <S.List>
                <S.ListItem>
                  <S.Text>
                    К списанию:{' '}
                    <strong>{` ${sumValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ${
                      Balance[asset as number]
                    }`}</strong>
                  </S.Text>
                </S.ListItem>
              </S.List>
            </S.TextWrap>
            <S.Buttons>
              <Button bigSize primary onClick={() => onClose(true)}>
                Открыть депозит
              </Button>
              <Button bigSize outlinePrimary onClick={() => onClose(false)}>
                Отмена
              </Button>
            </S.Buttons>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
