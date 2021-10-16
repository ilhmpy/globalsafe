import React, { FC, useMemo } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Dropdown } from '../../../components/Dropdown';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  selectedRate: string;
  setSelectedRate: (rate: string) => void;
  rates: string[];
  onAccept: (rateIndex: number) => void;
};

export const Rating: FC<Props> = ({
  onClose,
  open,
  selectedRate,
  setSelectedRate,
  rates,
  onAccept,
}: Props) => {

  const handleAccept = () => {
    onAccept(rates.indexOf(selectedRate));
    onClose();
  };
  
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Выбор рейтинга</S.Title>
            <S.DropdonwConatainer big>
              <Dropdown
                selectedOption={selectedRate}
                setSelectedOption={setSelectedRate}
                options={rates}
              />
            </S.DropdonwConatainer>
            <Button bigSize fullWidth primary onClick={handleAccept}>
              Применить
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
