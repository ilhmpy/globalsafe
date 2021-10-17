import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as FromTo } from '../../assets/svg/fromTo.svg';
import { Button } from '../../components/Button/V2/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal/Modal';
import { Select } from '../../components/Select/Select5';
import { AppContext } from '../../context/HubContext';
import { Balance } from '../../types/balance';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsSuccessConverting: (status: boolean) => void;
  setIsFailConverting: (status: boolean) => void;
  setIsConfirmConverting: (status: boolean) => void;
  setIsCorrectionConverting: (status: boolean) => void;
  setConvertedData: (array: IBalanceExchange) => void;
  convertedData: IBalanceExchange;
  isConfirmConverting: boolean;
}

export interface IBalanceExchange {
  userAmount: number;
  calculatedAmount: number;
  targetAmount: number;
  discountPercent: number;
}

export const ConvertingModal: FC<Props> = ({
  open,
  setOpen,
  setIsSuccessConverting,
  setIsFailConverting,
  setIsConfirmConverting,
  setConvertedData,
  convertedData,
  setIsCorrectionConverting,
  isConfirmConverting,
}: Props) => {
  const { t } = useTranslation();
  const [fromSum, setFromSum] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const { hubConnection } = useContext(AppContext);

  const resetStateValues = () => {
    setFromSum('');
    // setConvertedData({
    //   userAmount: 0,
    //   calculatedAmount: 0,
    //   targetAmount: 0,
    //   discountPercent: 0,
    // });
    setFromCurrency('');
    setToCurrency('');
  };

  // useEffect(() => {
  //   (async () => {
  //     if (hubConnection && fromCurrency && toCurrency && +fromSum > 0) {
  //       try {
  //         const response = await hubConnection.invoke(
  //           'CalculateBalanceExchange',
  //           (+fromSum * 100000).toString(),
  //           59
  //         );
  //         console.log('response1', response);
  //         setConvertedData(response);
  //         setConvertedData(response);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else if (hubConnection && fromCurrency && toCurrency && convertedData.targetAmount > 0) {
  //       console.log('EstimationOfExchange');
  //       try {
  //         const response = await hubConnection.invoke(
  //           'EstimationOfExchange',
  //           convertedData.targetAmount.toString(),
  //           Balance.CWD
  //         );
  //         console.log('response2', response);
  //         setConvertedData(response);
  //         setConvertedData(response);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   })();
  // }, [fromCurrency, toCurrency, fromSum, convertedData.targetAmount]);

  useEffect(() => {
    (async () => {
      if (hubConnection && fromCurrency && toCurrency && +fromSum > 0) {
        try {
          const response = await hubConnection.invoke(
            'CalculateBalanceExchange',
            (+fromSum * 100000).toString(),
            59
          );
          console.log('response1', response);
          setConvertedData(response);
          setConvertedData(response);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [fromCurrency, toCurrency, fromSum]);

  useEffect(() => {
    (async () => {
      if (hubConnection && fromCurrency && toCurrency && convertedData.targetAmount > 0) {
        console.log('EstimationOfExchange');
        try {
          const response = await hubConnection.invoke(
            'EstimationOfExchange',
            convertedData.targetAmount.toString(),
            Balance.CWD
          );
          console.log('response2', response);
          setConvertedData(response);
          setConvertedData(response);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [fromCurrency, toCurrency, convertedData.targetAmount]);
  const convert = async () => {
    (async () => {
      if (
        hubConnection &&
        fromCurrency &&
        toCurrency &&
        +fromSum > 0 &&
        convertedData.calculatedAmount
      ) {
        try {
          const response = await hubConnection.invoke<IBalanceExchange>(
            'BalanceExchange',
            (+fromSum * 100000).toString(),
            59
          );
          console.log('response', response);
          if (response.calculatedAmount && response.targetAmount) {
            setOpen(false);
            setConvertedData(response);
            setIsSuccessConverting(true);
            setTimeout(() => resetStateValues(), 1000);
          }
        } catch (error) {
          setIsFailConverting(true);
          console.error(error);
        }
      }
    })();
  };

  const further = () => {
    if (
      hubConnection &&
      fromCurrency &&
      toCurrency &&
      +fromSum > 0 &&
      convertedData.calculatedAmount
    ) {
      resetStateValues();
      setOpen(false);
      fromSum ? setIsCorrectionConverting(true) : setIsConfirmConverting(true);
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
          <ModalTitle>{t('privateArea.converting')}</ModalTitle>
          <CloseButton
            onClick={() => {
              setOpen(false);
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
                placeholder={toCurrency ? '0' : '0.0000'}
                name="fromSum"
                value={fromSum.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                onChange={({ target: { value } }) =>
                  !(value.length > 1 && value[0] === '0') && setFromSum(value.replaceAll(/\D/g, ''))
                }
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
                  convertedData.targetAmount <= 0
                    ? ''
                    : (convertedData.targetAmount / 100)
                        .toString()
                        .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
                }
                onChange={({ target: { value } }) =>
                  !(value.length > 1 && value[0] === '0') &&
                  setConvertedData({
                    ...convertedData,
                    targetAmount: +value.replaceAll(/\D/g, '') * 100,
                  })
                }
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
                <Rate>{convertedData.discountPercent}</Rate>
              </RateRow>

              <Button
                bigSize
                primary
                onClick={further}
                disabled={convertedData.calculatedAmount === 0}
              >
                {/* {t('privateArea.convert2')} */}
                {fromSum ? 'Рассчитать' : 'Далее'}
              </Button>
            </InnerBlock>
          </ContentWrapper>
        </Container>
      </Modal>
    </CSSTransition>
  );
};

const FromToArrow = styled(FromTo)`
  position: absolute;
  left: 49%;
  top: 28%;
`;

const Rate = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
`;

const RateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 35px;
`;

const InnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CloseButton = styled(Close)`
  position: absolute;
  right: 19px;
  top: 19px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 20px;

  color: #3f3e4e;
`;

const ModalCurrencyDiv = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  position: relative;
  display: block;

  & > input {
    max-width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.toToken.color};
    color: #000000;
    padding-right: 103px;
    text-align: right;
  }

  & > span {
    position: absolute;

    color: ${({ theme }) => theme.toToken.color};
    color: #000000;
    font-size: 14px;
    top: 13px;
    right: 70px;
  }
`;
