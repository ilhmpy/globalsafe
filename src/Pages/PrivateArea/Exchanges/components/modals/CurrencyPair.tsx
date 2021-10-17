import React, { FC, useMemo } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { Dropdown } from '../../../components/Dropdown';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  selectedBalanceKind: string | null;
  setSelectedBalanceKind: (val: string | null) => void;
  selectedFiatKind: string | null;
  setSelectedFiatKind: (val: string | null) => void;
  onAccept: () => void;
};

export const CurrencyPair: FC<Props> = ({
  onClose,
  open,
  selectedBalanceKind,
  setSelectedBalanceKind,
  selectedFiatKind,
  setSelectedFiatKind,
  onAccept,
}: Props) => {

  // Get Balance Kinds List as an Array
  const balanceKinds = useMemo<string[]>(() => {
    // @ts-ignore: Unreachable code error
    const list: string[] = Object.values(Balance).filter(i => typeof i === 'string');
    return list;
  }, [Balance]);

  // Get Fiat Kinds List as an Array
  const fiatKinds = useMemo<string[]>(() => {
      // @ts-ignore: Unreachable code error
      const list: string[] = Object.values(FiatKind).filter(i => typeof i === 'string');
      return list;
  }, [Balance]);

  return (
    <>
      {open && ( 
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Выбор валютной пары</S.Title>
            <S.DropdonwConatainer>
              <Dropdown
                label="Все валюты предложения"
                selectedOption={selectedBalanceKind}
                setSelectedOption={(val) => setSelectedBalanceKind(val === 'Не выбрано' ? null : val)}
                options={['Не выбрано', ...balanceKinds]}
              />
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <Dropdown
                label="Все валюты спроса"
                selectedOption={selectedFiatKind}
                setSelectedOption={val => setSelectedFiatKind(val === 'Не выбрано' ? null : val)}
                options={['Не выбрано', ...fiatKinds]}
              />
            </S.DropdonwConatainer>
            <Button fullWidth primary onClick={onAccept}>
              Применить
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
