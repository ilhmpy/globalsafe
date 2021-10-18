import React, { FC } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Checkbox } from '../../../components/Checkbox';
import * as S from './S.el';

type Props = {
  selectedPaymentMethods: number[];
  setSelectedPaymentMethods: (val: number[]) => void;
  methodsList: string[];
  onAccept: () => void;
  onClose: () => void;
  open: boolean;
};

export const PaymentMethods: FC<Props> = ({ 
  selectedPaymentMethods,
  setSelectedPaymentMethods,
  methodsList,
  onAccept,
  onClose,
  open 
}: Props) => {

  const handleCheckboxChange = (index: number) => {
    if(selectedPaymentMethods.includes(index)) {
      setSelectedPaymentMethods([...selectedPaymentMethods].filter(ind => ind !== index));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, index]);
    }
  };

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Выбор методов оплаты</S.Title>
            {
              [...methodsList].reverse().map((methodName, i) => (
                i !== 3
                ?
                  <S.DropdonwConatainer big>
                    <Checkbox 
                      dis
                      checked={selectedPaymentMethods.includes(i)}
                      onChange={() => handleCheckboxChange(i)}
                    >
                      <S.Label dis>{methodName}</S.Label>
                    </Checkbox>
                  </S.DropdonwConatainer>
                :
                  <>
                    <S.DropdonwConatainer big>
                      <Checkbox 
                        dis
                        checked={selectedPaymentMethods.includes(i)}
                        onChange={() => handleCheckboxChange(i)}
                      >
                        <S.Label dis>
                          {methodName}
                        </S.Label>
                      </Checkbox>
                    </S.DropdonwConatainer>

                    <S.DropdonwConatainer big>
                      <S.Hr />
                    </S.DropdonwConatainer>
                  </>
              ))
            }

            <Button bigSize fullWidth primary onClick={onAccept}>
              Применить
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
