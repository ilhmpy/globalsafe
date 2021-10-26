import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../../../components/Button/V2/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal/Modal';
import { Select } from '../../../components/Select/Select5';
import { AppContext } from '../../../context/HubContext';
import { Balance } from '../../../types/balance';
import { ConvertingModalConfirm } from './ConveringModalConfirm ';
import { ConvertingModalSuccess } from './ConveringModalSuccess';
import { ConvertingModalCorrection } from './ConvertingModalCorrection';
import { ConvertingModalFail } from './ConvertingModalFail';
import { getCookie } from './cookiesFns';
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
}

export interface IBalanceExchange {
  userAmount: number;
  calculatedAmount: number;
  targetAmount: number;
  discountPercent: number;
}

export const ConvertingModal: FC<IProps> = ({ open, setOpen }: IProps) => {
  const { t } = useTranslation();
  const [fromSum, setFromSum] = useState('');
  const [toSum, setToSum] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const { hubConnection } = useContext(AppContext);

  const [isSuccessConverting, setIsSuccessConverting] = useState<boolean>(false);
  const [isFailConverting, setIsFailConverting] = useState<boolean>(false);
  const [isConfirmConverting, setIsConfirmConverting] = useState<boolean>(false);
  const [isCorrectionConverting, setIsCorrectionConverting] = useState<boolean>(false);
  const [fromSumCloud, setFromSumCloud] = useState<string>('');
  const [isOkConverting, setIsOkConverting] = useState<boolean>(false);

  const [isMultics, setIsMultics] = useState<boolean>(false);

  const [convertedData, setConvertedData] = useState<IBalanceExchange>({
    userAmount: 0,
    calculatedAmount: 0,
    targetAmount: 0,
    discountPercent: 0,
  });
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
          setConvertedData({ ...response, userAmount: response.userAmount - 1 });
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [fromCurrency, toCurrency, fromSum]);

  const estimatiOfExchange = async () => {
    if (hubConnection && fromCurrency && toCurrency && +toSum > 0) {
      try {
        const response = await hubConnection.invoke(
          'EstimationOfExchange',
          String(Math.floor(+toSum * 100)),
          Balance.CWD
        );
        setConvertedData({
          userAmount: response.calculatedAmount,
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
      if (isMultics) {
        setOpen(false);
        resetStateValues();
        setIsConfirmConverting(true);
        setIsMultics(false);
        setIsOkConverting(false);
      } else if (getCookie('checkbox') && !isOkConverting) {
        estimatiOfExchange();
        setIsOkConverting(true);
      } else if (+fromSum > 0 && !isOkConverting) {
        setOpen(false);
        setIsCorrectionConverting(true);
        setIsOkConverting(false);
      } else {
        setOpen(false);
        resetStateValues();
        setIsConfirmConverting(true);
        setIsOkConverting(false);
      }
    }
  };

  return (
    <>
      <ConvertingModalCorrection
        open={isCorrectionConverting}
        setOpen={setIsCorrectionConverting}
        convertedData={convertedData}
        setConvertedData={setConvertedData}
        setOpenConverting={setOpen}
        fromSumCloud={fromSumCloud}
        setIsOkConverting={setIsOkConverting}
        closeWithReset={() => {
          setTimeout(() => resetStateValues(), 500);
          setConvertedData({
            userAmount: 0,
            calculatedAmount: 0,
            targetAmount: 0,
            discountPercent: 0,
          });
          setIsCorrectionConverting(false);
        }}
      />
      <ConvertingModalConfirm
        open={isConfirmConverting}
        setOpen={setIsConfirmConverting}
        convertedData={convertedData}
        setIsConfirmConverting={setIsConfirmConverting}
        setConvertedData={setConvertedData}
        setIsSuccessConverting={setIsSuccessConverting}
        setIsFailConverting={setIsFailConverting}
        closeWithReset={() => {
          setTimeout(() => resetStateValues(), 500);
          setConvertedData({
            userAmount: 0,
            calculatedAmount: 0,
            targetAmount: 0,
            discountPercent: 0,
          });
          setIsConfirmConverting(false);
        }}
      />
      <ConvertingModalSuccess
        open={isSuccessConverting}
        setOpen={setIsSuccessConverting}
        convertedData={convertedData}
        setConvertedData={setConvertedData}
      />
      <ConvertingModalFail
        open={isFailConverting}
        setOpen={setIsFailConverting}
        setConvertedData={setConvertedData}
      />
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
                  required
                  placeholder="0.00000"
                  name="fromSum"
                  value={
                    fromSum
                      ? fromSum.split('.').length > 1
                        ? `${fromSum.split('.')[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                            fromSum.split('.')[1]
                          }`
                        : `${fromSum.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`
                      : convertedData.userAmount <= 0
                      ? ''
                      : (convertedData.userAmount / 100000).toString().split('.').length > 1
                      ? `${(convertedData.userAmount / 100000)
                          .toString()
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (convertedData.userAmount / 100000).toFixed(5).toString().split('.')[1]
                        }`
                      : `${(+(convertedData.userAmount / 100000).toString())
                          .toFixed(5)
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (convertedData.userAmount / 100000).toFixed(5).split('.')[1]
                        }`
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replaceAll(' ', '');
                    setToSum('');

                    if (value === '') {
                      setFromSumCloud('');
                      setFromSum('');
                      setConvertedData({
                        userAmount: 0,
                        calculatedAmount: 0,
                        targetAmount: 0,
                        discountPercent: 0,
                      });
                    }

                    if (
                      (value[0] !== '0' || value[1] !== '0') &&
                      (/^(\d+([.,]\d{0,5})?|\.?\d{1,5})$/gm.test(value) || !value)
                    ) {
                      if (value.split('.')?.length === 1) {
                        setFromSumCloud(value.replaceAll(',', '.'));
                        setFromSum(value.replaceAll(',', '.'));
                      } else if (value.split('.')[1]?.length < 6) {
                        setFromSumCloud(value.replaceAll(',', '.'));
                        setFromSum(value.replaceAll(',', '.'));
                      }
                    }
                    // if (!value) setFromSum(value);

                    setIsMultics(false);
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
                  required
                  placeholder={toCurrency ? '0.00' : '0.00000'}
                  name="toSum"
                  value={
                    toSum
                      ? toSum.split('.').length > 1
                        ? `${toSum.split('.')[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                            toSum.split('.')[1]
                          }`
                        : `${toSum.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}`
                      : convertedData.targetAmount <= 0
                      ? ''
                      : (convertedData.targetAmount / 100).toString().split('.').length > 1
                      ? `${(convertedData.targetAmount / 100)
                          .toString()
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (convertedData.targetAmount / 100).toFixed(2).toString().split('.')[1]
                        }`
                      : (convertedData.targetAmount / 100).toFixed(2)
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replaceAll(' ', '');
                    setFromSum('');

                    if (
                      (value[0] !== '0' || value[1] !== '0') &&
                      (/^(\d+([.,]\d{0,2})?|\.?\d{1,2})$/gm.test(value) || !value)
                    ) {
                      if (
                        value.split('.')[1]?.length === 2 &&
                        value.split('.')[1][value.split('.')[1]?.length - 1] == '0'
                      ) {
                      } else if (value.split('.')?.length === 1 && value?.length < 11) {
                        setToSum(value.replaceAll(',', '.'));

                        setConvertedData({
                          userAmount: 0,
                          calculatedAmount: 0,
                          targetAmount: 0,
                          discountPercent: 0,
                        });
                      } else if (value.split('.')[1]?.length < 3 && value?.length < 11) {
                        setToSum(value.replaceAll(',', '.'));

                        setFromSum('');
                        setConvertedData({
                          userAmount: 0,
                          calculatedAmount: 0,
                          targetAmount: 0,
                          discountPercent: 0,
                        });
                      }
                    }
                  }}
                />
                <RateRow>
                  <Rate>Курс:</Rate>
                  <Rate>
                    {!convertedData.calculatedAmount
                      ? 0
                      : (convertedData.calculatedAmount / convertedData.targetAmount / 1000)
                          .toString()
                          .split('.').length > 1
                      ? `${(convertedData.calculatedAmount / convertedData.targetAmount / 1000)
                          .toString()
                          .split('.')[0]
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${
                          (convertedData.calculatedAmount / convertedData.targetAmount / 1000)
                            .toFixed(5)
                            .toString()
                            .split('.')[1]
                        }`
                      : (
                          convertedData.calculatedAmount /
                          convertedData.targetAmount /
                          1000
                        ).toFixed(5)}
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
    </>
  );
};
