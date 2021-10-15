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

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsSuccessConverting: (status: boolean) => void;
  setIsFailConverting: (status: boolean) => void;
  setConvertedArray: (array: number[]) => void;
}

export const ConvertingModal: FC<Props> = ({
  open,
  setOpen,
  setIsSuccessConverting,
  setIsFailConverting,
  setConvertedArray,
}: Props) => {
  const { t } = useTranslation();
  const [defaultFormState, setDefaultFormState] = useState({
    fromSum: '',
    toSum: [0, 0, 0],
    fromCurrency: '',
    toCurrency: '',
  });
  const [fromSum, setFromSum] = useState('');
  const [toSum, setToSum] = useState<string[]>(['0', '0', '0']);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  const resetStateValues = () => {
    setFromSum('');
    setToSum(['0', '0', '0']);
    setFromCurrency('');
    setToCurrency('');
  };

  useEffect(() => {
    (async () => {
      if (hubConnection && fromCurrency && toCurrency && +fromSum > 0) {
        try {
          const response = await hubConnection.invoke(
            'CalculateBalanceExchange',
            (+fromSum * 100000).toString(),
            59
          );
          setToSum(response);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [fromCurrency, toCurrency, fromSum]);

  const convert = async () => {
    (async () => {
      if (hubConnection && fromCurrency && toCurrency && +fromSum > 0 && +toSum[1]) {
        try {
          const response = await hubConnection.invoke(
            'BalanceExchange',
            (+fromSum * 100000).toString(),
            59
          );
          if (response[1] & response[2]) {
            setConvertedArray(response);
            setIsSuccessConverting(true);
            setOpen(false);
            setTimeout(() => resetStateValues(), 1000);
          }
        } catch (error) {
          setIsFailConverting(true);
          console.error(error);
        }
      }
    })();
  };

  return (
    <CSSTransition in={open} timeout={300} unmountOnExit>
      <Modal
        onClose={() => {
          setOpen(false);
          setTimeout(() => resetStateValues(), 500);
        }}
        width={420}
      >
        <Container>
          <ModalTitle>{t('privateArea.converting')}</ModalTitle>
          <CloseButton
            onClick={() => {
              setOpen(false);
              setTimeout(() => resetStateValues(), 500);
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
                placeholder="Сумма"
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
                disabled
                placeholder="Сумма"
                name="toSum"
                value={
                  +toSum[2] <= 0
                    ? ''
                    : (+toSum[2] / 100).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
                }
                onChange={(e) => undefined}
              />
              <RateRow>
                <Rate>Курс:</Rate>
                <Rate>
                  {+toSum[1] > 0
                    ? (+toSum[1] / +toSum[2] / 1000).toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })
                    : 0}
                </Rate>
              </RateRow>

              <RateRow>
                <Rate>Скидка %:</Rate>
                <Rate>
                  {+toSum[1] > 0
                    ? (+toSum[1] / +toSum[2] / 1000).toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })
                    : 0}
                </Rate>
              </RateRow>

              <Button bigSize primary onClick={convert} disabled={toSum[1] === '0'}>
                {t('privateArea.convert2')}
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
  top: 32%;
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

const CloseButton = styled(Close)`
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
