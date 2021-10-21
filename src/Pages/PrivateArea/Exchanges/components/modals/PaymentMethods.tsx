import { FC, useState } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Checkbox } from '../../../components/Checkbox';
import * as S from './S.el';

type Props = {
  selectedPaymentMethods: any[];
  setSelectedPaymentMethods: (val: any[]) => void;
  methodsList: any[];
  onAccept: () => void;
  onClose: () => void;
  open: boolean;
  text?: string;
  objectsArray?: boolean;
  black?: boolean;
};

export const PaymentMethods: FC<Props> = ({ 
  selectedPaymentMethods,
  setSelectedPaymentMethods,
  methodsList,
  onAccept,
  onClose,
  open,
  text = "Выбор методов оплаты",
  black,
  objectsArray
}: Props) => {

  const handleCheckboxChange = (index: number) => {
    if(selectedPaymentMethods.includes(index)) {
      setSelectedPaymentMethods([...selectedPaymentMethods].filter(ind => ind !== index));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, index]);
    };
  };

  function handleAcceptClick() {
    onAccept();
  };

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>{text}</S.Title>
            {objectsArray ? (
              <>
                {[...methodsList].map((i, idx) => (
                    <S.DropdonwConatainer big key={idx}>
                      <Checkbox 
                        dis={!black}
                        checked={selectedPaymentMethods.includes(i.kind)}
                        onChange={() => handleCheckboxChange(i.kind)}
                      >
                        <S.Label dis={!black} active={selectedPaymentMethods.includes(i.kind)}>{i.methodName}</S.Label>
                      </Checkbox>
                  </S.DropdonwConatainer>
                ))}
              </>
            ) : (
              <>
                {
                  [...methodsList].reverse().map((methodName, i) => (
                    i !== 3
                    ?
                      <S.DropdonwConatainer big>
                        <Checkbox 
                          dis={!black}
                          checked={selectedPaymentMethods.includes(i)}
                          onChange={() => handleCheckboxChange(i)}
                        >
                          <S.Label active={selectedPaymentMethods.includes(i)} dis={!black}>{methodName}</S.Label>
                        </Checkbox>
                      </S.DropdonwConatainer>
                    :
                      <>
                        <S.DropdonwConatainer big>
                          <Checkbox 
                            dis={!black}
                            checked={selectedPaymentMethods.includes(i)}
                            onChange={() => handleCheckboxChange(i)}
                          >
                            <S.Label active={selectedPaymentMethods.includes(i)} dis={!black}>
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
              </>
            )}

            <Button bigSize fullWidth primary onClick={handleAcceptClick}>
              Применить
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
