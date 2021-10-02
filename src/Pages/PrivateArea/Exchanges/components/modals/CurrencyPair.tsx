import React, { FC } from 'react';
import { Modal } from '../../../../../components/ModalAnimated';
import { Dropdown } from '../../../components/Dropdown';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  selectedOption: string | null;
  setSelectedOption: (selectedOption: string) => void;
  options: string[];
};

export const CurrencyPair: FC<Props> = ({
  onClose,
  open,
  selectedOption,
  setSelectedOption,
  options,
}: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Выбор валютной пары</S.Title>
            <Dropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={options}
            />
          </S.Container>
        </Modal>
      )}
    </>
  );
};
