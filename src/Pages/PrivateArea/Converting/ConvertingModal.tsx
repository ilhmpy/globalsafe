import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../../../components/Button/V2/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal/Modal';
import { Select } from '../../../components/Select/Select5';
import { AppContext } from '../../../context/HubContext';
import { Balance } from '../../../types/balance';
import {
  CloseButton,
  Container,
  ContentWrapper,
  FromToArrow,
  InnerBlock,
  ModalTitle,
  Rate,
  RateRow,
} from './styled';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsConfirmConverting: (status: boolean) => void;
  setIsCorrectionConverting: (status: boolean) => void;
  setConvertedData: (array: IBalanceExchange) => void;
  convertedData: IBalanceExchange;
  isConfirmConverting: boolean;
  isOkConverting: boolean;
  setFromSumCloud: (value: string) => void;
  setIsOkConverting: (status: boolean) => void;
}

export interface IBalanceExchange {
  userAmount: number;
  calculatedAmount: number;
  targetAmount: number;
  discountPercent: number;
}

export const ConvertingModal: FC<IProps> = ({
  open,
  setOpen,
  setIsConfirmConverting,
  setConvertedData,
  convertedData,
  setIsCorrectionConverting,
  isConfirmConverting,
  setFromSumCloud,
  isOkConverting,
  setIsOkConverting,
}: IProps) => {
  console.log('convertedData', convertedData);
  const { t } = useTranslation();
  const [fromSum, setFromSum] = useState('');
  const [toSum, setToSum] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const { hubConnection } = useContext(AppContext);

  const resetStateValues = () => {
    setFromSum('');
    setToSum('');
    setFromCurrency('');
    setToCurrency('');
  };

  useEffect(() => {
    (async () => {
      if (hubConnection && fromCurrency && toCurrency && +fromSum > 0) {
        try {
          const response = await hubConnection.invoke(
            'CalculateBalanceExchange',
            (+fromSum * 100000 + 1).toString(),
            59
          );
          setConvertedData(response);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [fromCurrency, toCurrency, fromSum]);

  const estimatiOfExchange = async () => {
    if (hubConnection && fromCurrency && toCurrency && +toSum > 0) {
      try {
        const response = await hubConnection.invoke('EstimationOfExchange', toSum, Balance.CWD);
        setConvertedData({
          userAmount: response.calculatedAmount * 100,
          calculatedAmount: response.calculatedAmount,
          targetAmount: response.userAmount,
          discountPercent: response.discountPercent,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    estimatiOfExchange();
  }, [fromCurrency, toCurrency, toSum]);

  useEffect(() => {
    if (isOkConverting) {
      setFromSum((convertedData.calculatedAmount / 100000).toString());
    }
  }, [isOkConverting]);

  const further = () => {
    if (hubConnection && fromCurrency && toCurrency && convertedData.calculatedAmount) {
      setIsOkConverting(false);
      setOpen(false);
      if (+fromSum > 0 && !isOkConverting) {
        setIsCorrectionConverting(true);
      } else {
        resetStateValues();
        setIsConfirmConverting(true);
      }
    }
  };

  return (
    <CSSTransition
      in={open}
      timeout={300}
      unmountOnExit
      style={{ display: isConfirmConverting ? 'none' : 'block' }}
    >
      <Modal
        onClose={() => {
          setOpen(false);
          setIsOkConverting(false);
          setTimeout(() => resetStateValues(), 500);
          setConvertedData({
            userAmount: 0,
            calculatedAmount: 0,
            targetAmount: 0,
            discountPercent: 0,
          });
        }}
        width={420}
      >
        <Container>
          <ModalTitle mb20>{t('privateArea.converting')}</ModalTitle>
          <CloseButton
            onClick={() => {
              setOpen(false);
              setIsOkConverting(false);
              setTimeout(() => resetStateValues(), 500);
              setConvertedData({
                userAmount: 0,
                calculatedAmount: 0,
                targetAmount: 0,
                discountPercent: 0,
              });
            }}
          />

          <ContentWrapper>
            <InnerBlock>
              <Select
                placeholder="Исходная валюта не выбрана"
                options={['CWD']}
                selectedOption={fromCurrency}
                setSelectedOption={(val: string) => setFromCurrency(val)}
              />
              <Input
                placeholder="0.0000"
                name="fromSum"
                value={
                  fromSum
                    ? Number(fromSum).toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })
                    : convertedData.userAmount <= 0
                    ? ''
                    : (convertedData.userAmount / 100000).toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })
                }
                onChange={({ target: { value } }) => {
                  setToSum('');
                  if (!(value.length > 1 && value[0] === '0')) {
                    setFromSumCloud(value.replaceAll(/\D/g, ''));
                    setFromSum(value.replaceAll(/\D/g, ''));
                    setConvertedData({
                      userAmount: 0,
                      calculatedAmount: 0,
                      targetAmount: 0,
                      discountPercent: 0,
                    });
                  }
                }}
              />
            </InnerBlock>
            <FromToArrow />
            <InnerBlock>
              <Select
                placeholder="Валюта к получению не выбрана"
                options={['MULTICS']}
                selectedOption={toCurrency}
                setSelectedOption={(val: string) => setToCurrency(val)}
              />
              <Input
                placeholder={toCurrency ? '0' : '0.0000'}
                name="toSum"
                value={
                  toSum
                    ? toSum
                    : convertedData.targetAmount <= 0
                    ? ''
                    : (convertedData.targetAmount / 100).toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })
                }
                onChange={({ target: { value } }) => {
                  if (value.length > 1 && value[0] === '0') {
                    setFromSum('');
                    setToSum('');
                    setConvertedData({
                      userAmount: 0,
                      calculatedAmount: 0,
                      targetAmount: 0,
                      discountPercent: 0,
                    });
                  } else if (!value) {
                    setToSum('');
                    setConvertedData({
                      userAmount: 0,
                      calculatedAmount: 0,
                      targetAmount: 0,
                      discountPercent: 0,
                    });
                  } else {
                    setToSum(value.replaceAll(/\D/g, ''));
                  }
                }}
              />
              <RateRow>
                <Rate>Курс:</Rate>
                <Rate>
                  {convertedData.calculatedAmount > 0
                    ? (
                        convertedData.calculatedAmount /
                        convertedData.targetAmount /
                        1000
                      ).toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })
                    : 0}
                </Rate>
              </RateRow>

              <RateRow>
                <Rate>Скидка %:</Rate>
                <Rate>
                  {convertedData.calculatedAmount !== 0 ? convertedData.discountPercent : '0'}
                </Rate>
              </RateRow>
              <Button
                bigSize
                primary
                onClick={further}
                disabled={convertedData.calculatedAmount === 0}
              >
                {fromSum && !isOkConverting ? 'Рассчитать' : 'Далее'}
              </Button>
            </InnerBlock>
          </ContentWrapper>
        </Container>
      </Modal>
    </CSSTransition>
  );
};
