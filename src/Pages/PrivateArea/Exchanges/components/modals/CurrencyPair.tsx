import { FC, useState, useMemo } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { Dropdown } from '../../../components/Dropdown';
import * as S from './S.el';
import { AppContext } from '../../../../../context/HubContext';

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
  const balanceKinds = useMemo(() => {
    const list = Object.values(Balance).filter((i) => typeof i === 'string');
    return list;
  }, [Balance]);

  // Get Fiat Kinds List as an Array
  const fiatKinds = useMemo(() => {
    const list = Object.values(FiatKind).filter((i) => typeof i === 'string');
    return list;
  }, [Balance]);
  const bl: any[] = [
    'Na',
    'FUTURE4',
    'FUTURE5',
    'FUTURE6',
    'MGCWD',
    'GCWD',
    'DIAMOND',
    'CROWD_BTC',
    'CWDBONUS',
    'CARBONE',
    'BRONZE',
    'MCENT',
    'PRIDE',
    'CROWD',
    'SILVER',
    'ALTER',
    'SILVER_I3700820',
    'SILVER_I61900820',
    'SILVER_I3100INF',
    'SILVER_I12150820',
    'CARBON',
    'PLATINUM',
    'MG621P600',
    'D621P6000',
    'G621P25000',
    'CWDPOLIS',
    'CWDHOME',
    'INDEX',
    'INDEX_SHARE',
    'INDEX_CWD',
    'MG721P7500',
    'FF15',
    'FF14',
    'FF13',
    'FF12',
    'FF11',
    'FF10',
    'FF9',
    'FF8',
    'FF7',
    'FF5',
    'GF6',
    'GF5',
    'UGLTEST',
    'GARANT',
    'MG921P18000',
    'D721P25000',
    'D921P60000',
    'G721P42000',
    'G921P64000',
    'MG821P15000',
    'INDEX_MSHARE',
    'D821P50000',
    'FF6',
  ];

  function handleAcceptButton() {
    onAccept();
  }

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
                setSelectedOption={(val) =>
                  setSelectedBalanceKind(val === 'Не выбрано' ? null : val)
                }
                options={[
                  'Не выбрано',
                  ...(balanceKinds as string[]).filter((item) => !bl.includes(item)),
                ]}
              />
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <Dropdown
                label="Все валюты спроса"
                selectedOption={selectedFiatKind}
                setSelectedOption={(val) => setSelectedFiatKind(val === 'Не выбрано' ? null : val)}
                options={['Не выбрано', ...(fiatKinds as string[])]}
              />
            </S.DropdonwConatainer>
            <Button fullWidth primary onClick={handleAcceptButton}>
              Применить
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
