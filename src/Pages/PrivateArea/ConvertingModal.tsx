import React, { FC, useContext, useState } from 'react';
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
}

export const ConvertingModal: FC<Props> = ({
  open,
  setOpen,
  setIsSuccessConverting,
  setIsFailConverting,
}: Props) => {
  const { t } = useTranslation();
  const [defaultFormState, setDefaultFormState] = useState({
    fromSum: '',
    toSum: '',
    fromCurrency: '',
    toCurrency: '',
  });
  const [fromSum, setFromSum] = useState('');
  const [toSum, setToSum] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  const resetStateValues = () => {
    setDefaultFormState({
      fromSum: '',
      toSum: '',
      fromCurrency: '',
      toCurrency: '',
    });
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
          <CloseButton onClick={() => setOpen(false)} />

          <ContentWrapper>
            <InnerBlock>
              <Select
                placeholder="Исходная валюта не выбрана"
                options={['One', 'Two', 'Three']}
                selectedOption={defaultFormState.fromCurrency}
                setSelectedOption={(val: string) =>
                  setDefaultFormState({ ...defaultFormState, fromCurrency: val })
                }
              />
              <Input
                placeholder="Сумма"
                name="fromSum"
                value={defaultFormState.fromSum}
                onChange={(e) =>
                  setDefaultFormState({
                    ...defaultFormState,
                    fromSum: e.target.value.replace(/\D/, ''),
                  })
                }
              />
            </InnerBlock>
            <FromToArrow />
            <InnerBlock>
              <Select
                placeholder="Валюта к получению не выбрана"
                options={['One', 'Two', 'Three']}
                selectedOption={defaultFormState.toCurrency}
                setSelectedOption={(val: string) =>
                  setDefaultFormState({ ...defaultFormState, toCurrency: val })
                }
              />
              <Input
                placeholder="Сумма"
                name="toSum"
                value={defaultFormState.toSum}
                onChange={(e) =>
                  setDefaultFormState({
                    ...defaultFormState,
                    toSum: e.target.value.replace(/\D/, ''),
                  })
                }
              />
              <RateRow>
                <Rate>Курс:</Rate>
                <Rate>0</Rate>
              </RateRow>

              <Button
                bigSize
                primary
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => setIsSuccessConverting(true), 500);
                  setTimeout(() => resetStateValues(), 500);
                }}
              >
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
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
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
