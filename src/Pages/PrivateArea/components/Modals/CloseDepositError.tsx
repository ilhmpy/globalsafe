import { FC } from 'react';
import { Modal } from '../../../../components/ModalAnimated';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const CloseDepositError: FC<Props> = ({ onClose, open }: Props) => {
  return (
    <>
      {true && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Ошибка закрытия депозита</S.Title>
            <S.TextWrap>
              <S.Text red>Досрочное закрытие депозита завершено с ошибкой.</S.Text>
            </S.TextWrap>

            <S.Text>
              Закрыть депозит досрочно не представляется возможным. Если у вас есть вопросы
              связанные с досрочным закрытием депозита свяжитесь с администрацией.
            </S.Text>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
